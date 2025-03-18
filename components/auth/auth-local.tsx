import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import * as LocalAuthentication from "expo-local-authentication";
import { LockKeyholeIcon, ScanFaceIcon } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserAuthenticateStore } from "@/stores";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import { router } from "expo-router";
import { LoadingScreen } from "../common/loading";
import Typography from "../common/text-typography";
import { cn } from "@/lib/utils";
import { CircleAlert, RemoveNumpad } from "../common/icons";

type AuthLocalProps = {
  onAuthenticated?: () => void;
};

export function AuthLocal({ onAuthenticated }: AuthLocalProps) {
  // const handleAuthenticate = useCallback(async () => {
  //   const result = await LocalAuthentication.authenticateAsync({
  //     // disableDeviceFallback: true,
  //   });
  //   if (result.success) {
  //     onAuthenticated?.();
  //   }
  // }, [onAuthenticated]);

  // // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  // useEffect(() => {
  //   handleAuthenticate();
  // }, []);

  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [wrongPin, setWrongPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState<string>("");
  const { setIsLoginWithPin } = useUserAuthenticateStore();

  const handlePress = (num: string) => {
    if (confirmPin.length < 4) {
      setConfirmPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setConfirmPin((prev) => prev.slice(0, -1));
  };

  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }]
    };
  });

  useEffect(() => {
    if (confirmPin?.length === 4) {
      if (confirmPin === "1234") {
        router.push("/(auth)/pin-success");
      } else {
        if (confirmPin === "0000") {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setIsLoginWithPin(true);
          }, 1500);
        } else {
          setWrongPin(true);
        }
      }
    } else {
      setWrongPin(false);
    }
  }, [confirmPin]);

  return (
    <View
      // className="bg-background gap-4 p-8 flex-1"
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
              {`Welcome back, Tony Phan`}
            </Typography>
          </View>
        </View>

        {/* PIN container */}
        <View className="flex-row h-7 inline-flex justify-center items-center gap-14 mt-8">
          {[...Array(4)].map((_, i) => (
            <View
              key={i}
              className={cn(
                "w-3 h-3 relative bg-neutral-300 rounded-full",
                confirmPin.length > i && "bg-black border border-black"
              )}
            />
          ))}
        </View>
        {wrongPin && (
          <View className="flex flex-row items-center justify-center mt-4">
            <CircleAlert className="top-1 right-1" />
            <Typography type="body-small" weight="medium" textColor="#D9323D">
              {`Incorrect PIN. Try again.`}
            </Typography>
          </View>
        )}
      </View>

      {/* Button */}
      <Animated.View style={translateStyle} className="justify-end flex-1 mx-5">
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
              disabled
              className="h-[72px] opacity-0 w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
            >
              <Typography type="heading-medium" weight="medium">
                0
              </Typography>
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
              <RemoveNumpad className="bottom-2 right-3" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      {/* Forgot PIN */}
      <View className="px-4 mt-2">
        <Typography
          type="body-default"
          weight="medium"
          className="text-center mt-2"
          onPress={() =>
            router.navigate({
              pathname: "/(app)/pin-forgot"
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
