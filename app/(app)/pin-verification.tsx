import { changeHomeAddress } from "@/api";
import { CircleAlert, RemoveNumpad } from "@/components/common/icons";
import { LoadingScreen } from "@/components/common/loading";
import Typography from "@/components/common/text-typography";
import Header from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import { useBiometrics } from "@/hooks/biometrics/useBiometrics";
import { cn } from "@/lib/utils";
import { useUserAuthenticateStore } from "@/stores";
import { userStore } from "@/stores/userStore";
import * as LocalAuthentication from "expo-local-authentication";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Biometrics from "./biometrics";

function PinVerificationScreen() {
  const { type, amount, addressLine1, addressLine2, city, postCode } =
    useLocalSearchParams();
  const userProfileJson = userStore?.getState().userProfile;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [wrongPin, setWrongPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState<string>("");

  const { verificationPin, setShowBottomSheetPin } = useUserAuthenticateStore();
  const { bioStatus } = useBiometrics();

  const onAuthenticated = useCallback(() => {
    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: "/review_transaction",
        params: {
          type: type,
          amount: amount
        }
      });
    }, 3000);
  }, [amount, type]);

  const onVerifyEditHomeAddress = useCallback(() => {
    setLoading(true);
    timeoutRef.current = setTimeout(async () => {
      setLoading(false);
      await changeHomeAddress({
        addressLine1: addressLine1 as string,
        addressLine2: addressLine2 as string,
        city: city as string,
        postcode: postCode as string,
        country: userProfileJson?.address?.country,
        dateOfBirth: userProfileJson?.dateOfBirth,
        firstName: userProfileJson?.firstName,
        lastName: userProfileJson?.lastName,
        business: {
          name: userProfileJson?.business?.name
        },
        mobileNumber: userProfileJson?.mobileNumber,
        email: userProfileJson?.email
      });
      router.push("./success_homeaddress");
    }, 1000);
  }, [addressLine1, addressLine2, city, postCode, userProfileJson]);

  const onVerifyViewPIN = useCallback(() => {
    setShowBottomSheetPin(true);
    timeoutRef.current = setTimeout(() => {
      router.dismiss();
    }, 1000);
  }, [setShowBottomSheetPin]);

  const handleAuthenticate = useCallback(async () => {
    const result = await LocalAuthentication.authenticateAsync({});
    if (result.success) {
      type === "edit-home-address" && onVerifyEditHomeAddress();
      type === "view-pin" && onVerifyViewPIN();
      type === "load-card" && onAuthenticated?.();
    }
  }, [onAuthenticated, onVerifyViewPIN, onVerifyEditHomeAddress, type]);

  const handlePress = (num: string) => {
    if (confirmPin.length < 4) {
      setConfirmPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setConfirmPin((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (confirmPin?.length === 4) {
      if (confirmPin === verificationPin) {
        type === "edit-home-address" && onVerifyEditHomeAddress();
        type === "view-pin" && onVerifyViewPIN();
        type === "load-card" && onAuthenticated?.();
      } else {
        setWrongPin(true);
      }
    } else {
      setWrongPin(false);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    confirmPin,
    verificationPin,
    onAuthenticated,
    type,
    onVerifyViewPIN,
    onVerifyEditHomeAddress
  ]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <Header onBack={router.back} title="Verification" />
        <LoadingScreen loading={loading} />

        <ProgressBar completeAnimation={true} />

        <View
          className="flex-1 flex-col justify-between bg-white mx-5"
          style={{ paddingTop: top * 2, paddingBottom: bottom }}
        >
          <View className="flex-1">
            {/* PIN container */}
            <View className="flex-row h-7 inline-flex justify-center items-center gap-14 mt-8">
              {[...Array(4)].map((_, i) => (
                <View
                  key={i}
                  className={cn(
                    "w-[12px] h-[12px] relative bg-neutral-300 rounded-full",
                    confirmPin?.length > i && "bg-black border border-black"
                  )}
                />
              ))}
            </View>
            {wrongPin && (
              <View className="flex flex-row items-center justify-center mt-4">
                <CircleAlert className="top-1 " />
                <Typography
                  type="body-small"
                  weight="medium"
                  textColor="#D9323D"
                >
                  {`Incorrect PIN. Try again.`}
                </Typography>
              </View>
            )}
          </View>

          {/* Button */}
          <View className="justify-end flex-1 mx-5">
            <View className="py-4 gap-3">
              <View className="flex-row justify-between">
                {["1", "2", "3"].map((num) => (
                  <TouchableOpacity
                    key={num}
                    onPress={() => handlePress(num)}
                    className="h-[72px] w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
                  >
                    <Typography type="heading-medium" weight="medium">
                      {num}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex-row justify-between">
                {["4", "5", "6"].map((num) => (
                  <TouchableOpacity
                    key={num}
                    onPress={() => handlePress(num)}
                    className="h-[72px] w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
                  >
                    <Typography type="heading-medium" weight="medium">
                      {num}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex-row justify-between">
                {["7", "8", "9"].map((num) => (
                  <TouchableOpacity
                    key={num}
                    onPress={() => handlePress(num)}
                    className="h-[72px] w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
                  >
                    <Typography type="heading-medium" weight="medium">
                      {num}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={handleAuthenticate}
                  disabled={!bioStatus}
                  className={cn(
                    "h-[72px] w-[72px] bg-backgroundSubtle rounded-[120px] justify-center items-center",
                    !bioStatus && "opacity-0"
                  )}
                >
                  <Biometrics />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePress("0")}
                  className="h-[72px] w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
                >
                  <Typography type="heading-medium" weight="medium">
                    0
                  </Typography>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDelete}
                  className="h-[72px] w-[72px] bg-backgroundSubtle rounded-[120px] justify-center items-center"
                >
                  <RemoveNumpad />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Forgot PIN */}
          <View className="px-4 mt-2">
            <Typography
              type="body-default"
              weight="medium"
              className="text-center mt-2"
              onPress={() =>
                router.navigate({
                  pathname: "/pin-forgot"
                })
              }
            >
              {`Forgot PIN?`}
            </Typography>
          </View>
          <View style={{ height: bottom }} />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default PinVerificationScreen;
