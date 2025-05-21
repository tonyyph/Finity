import { FaceIDIcon } from "@/assets";
import { useBiometrics } from "@/hooks/biometrics/useBiometrics";
import { cn } from "@/lib/utils";
import { useUserAuthenticateStore } from "@/stores";
import { userStore } from "@/stores/userStore";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CircleAlert, RemoveNumpad } from "../common/icons";
import { LoadingScreen } from "../common/loading";
import Typography from "../common/text-typography";

type AuthLocalProps = {
  onAuthenticated?: () => void;
};

export function AuthLocal({ onAuthenticated }: AuthLocalProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [wrongPin, setWrongPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState<string>("");
  const { verificationPin } = useUserAuthenticateStore();
  const { bioStatus } = useBiometrics();
  const userProfile = userStore.getState().userProfile;

  const handleAuthenticate = useCallback(async () => {
    const result = await LocalAuthentication.authenticateAsync({});
    if (result.success) {
      setLoading(true);
      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        onAuthenticated?.();
      }, 3000);
    }
  }, [onAuthenticated]);

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
        setLoading(true);
        timeoutRef.current = setTimeout(() => {
          setLoading(false);
          onAuthenticated?.();
        }, 2000);
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
  }, [confirmPin, onAuthenticated, verificationPin]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <View
      className="absolute top-0 right-0 bottom-0 left-0 z-50 flex-1 p-8 gap-4 bg-background"
      style={{ paddingTop: top * 2 }}
    >
      <LoadingScreen loading={loading} />
      <View className="flex-1">
        {/* Welcome */}
        <View className="z-10">
          <View className="gap-14 items-center">
            <Image
              source={require("@/assets/images/logo.png")}
              className="w-[152px] h-[40px]"
              resizeMode="contain"
            />
            <Typography weight="regular">
              {`Welcome back, ${
                userProfile?.firstName + " " + userProfile?.lastName
              }`}
            </Typography>
          </View>
        </View>

        {/* PIN container */}
        <View className="flex-row h-7 inline-flex justify-center items-center gap-14 mt-8">
          {[...Array(4)].map((_, i) => (
            <View
              key={i}
              className={cn(
                "w-[12px] h-[12px] relative bg-neutral-300 rounded-full",
                confirmPin.length > i && "bg-black border border-black"
              )}
            />
          ))}
        </View>
        {wrongPin && (
          <View className="flex flex-row items-center justify-center mt-4">
            <CircleAlert className="top-1 " />
            <Typography type="body-small" weight="medium" textColor="#D9323D">
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
      <View style={{ height: bottom }} />
    </View>
  );
}
