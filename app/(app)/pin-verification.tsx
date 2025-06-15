import { changeHomeAddress } from "@/api";
import { FaceIDIcon } from "@/assets";
import { CircleAlert, RemoveNumpad } from "@/components/common/icons";
import { Typography } from "@/components/common/text-typography";
import { Header } from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import { useBiometrics } from "@/hooks/biometrics/useBiometrics";
import { cn } from "@/lib/utils";
import { useUserAuthenticateStore } from "@/stores";
import { userStore } from "@/stores/userStore";
import {
  BottomIndicatorAvoidingView,
  TopIndicatorAvoidingView
} from "@/utils/spacing";
import { BlurView } from "expo-blur";
import * as LocalAuthentication from "expo-local-authentication";
import { router, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

function PinVerificationScreen() {
  const { type, amount, addressLine1, addressLine2, city, postCode } =
    useLocalSearchParams();
  const userProfileJson = userStore?.getState().userProfile;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [loading, setLoading] = useState(false);
  const [wrongPin, setWrongPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState<string>("");

  const { verificationPin, setShowBottomSheetPin } = useUserAuthenticateStore();
  const { bioStatus } = useBiometrics();
  const [authInProgress, setAuthInProgress] = useState(bioStatus);

  const onAuthenticated = useCallback(() => {
    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      router.replace({
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
      router.replace("./success_homeaddress");
      setLoading(false);
    }, 2000);
  }, [addressLine1, addressLine2, city, postCode, userProfileJson]);

  const onVerifyViewPIN = useCallback(() => {
    setShowBottomSheetPin(true);
    timeoutRef.current = setTimeout(() => {
      router.dismiss();
    }, 1000);
  }, [setShowBottomSheetPin]);

  const handleAuthenticate = useCallback(async () => {
    setAuthInProgress(true);
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with biometrics",
      disableDeviceFallback: true, // This only works on Android
      cancelLabel: "Cancel",
      fallbackLabel: "" // iOS only – setting empty label hides the fallback button
    });
    if (result.success) {
      setAuthInProgress(false);
      type === "edit-home-address" && onVerifyEditHomeAddress();
      type === "view-pin" && onVerifyViewPIN();
      type === "load-card" && onAuthenticated?.();
    } else {
      if (!!result?.error && result?.error === "user_cancel") {
        setAuthInProgress(false);
      }
    }
  }, [onAuthenticated, onVerifyViewPIN, onVerifyEditHomeAddress, type]);

  useEffect(() => {
    bioStatus && handleAuthenticate();
  }, [handleAuthenticate, bioStatus]);

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

  if (authInProgress) {
    return (
      <BlurView
        intensity={Platform.OS === "ios" ? 60 : 100}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
    );
  }

  if (loading)
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <LottieView
          style={{ width: 300, height: 300 }}
          source={require("@/assets/json/loader.json")}
          resizeMode="contain"
          speed={1}
          autoPlay
          loop
        />
      </View>
    );

  return (
    <View className="flex-1 bg-white">
      <Header onBack={router.back} title="Verification" />
      <ProgressBar completeAnimation={true} />
      <View className="flex-1">
        <View className="flex-1 flex-col justify-between mx-5">
          <TopIndicatorAvoidingView number={2.5} />
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
                  <FaceIDIcon />
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
        </View>
      </View>
      <BottomIndicatorAvoidingView number={4} />
    </View>
  );
}

export default PinVerificationScreen;
