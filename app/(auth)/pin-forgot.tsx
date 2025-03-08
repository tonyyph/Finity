import { CircleAlert, RemoveNumpad } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { cn } from "@/lib/utils";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { router } from "expo-router";
import {
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  UserRoundIcon
} from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";

export default function ForgotPINScreen() {
  const [loading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const { onForgotPassword, emailState, passwordState } = useForgotPassword();

  const onPressSecurePassword = () => {
    setSecurePassword((prev) => !prev);
  };

  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }]
    };
  });

  const handleContinue = useCallback(() => {
    Keyboard.dismiss();
    const setError = (error: string = "Invalid password") => {
      passwordState.setState((prev) => ({ ...prev, error }));
    };

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (passwordState.value === "123456") {
        router.push({
          pathname: "/(auth)/verify-2factor",
          params: { isResetPin: 1 }
        });
      } else {
        setError("Incorrect email address or password. Try again.");
      }
    }, 1500);
  }, [passwordState.value]);

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="bg-background gap-4 p-8 flex-1">
        <View className="flex-1">
          {/* Welcome */}
          <View className="z-10">
            <View className="gap-2">
              <Text className="text-neutral-950 text-2xl font-semibold font-['PP Neue Montreal'] leading-[30px] tracking-wide">
                Forgot PIN
              </Text>
              <Text className="text-neutral-950 text-base font-normal font-['PP Neue Montreal'] leading-snug tracking-wide">
                Enter your credentials to verify your identity and reset your
                PIN.
              </Text>
            </View>
          </View>

          <View className="flex-1 flex-col gap-3 bg-white pt-6 rounded-t-[24px]">
            {/* Username Field */}
            <View className="">
              <Text className="text-base font-medium text-foreground h-[24px] self-stretch flex items-center">
                Email
              </Text>
              <View className="rounded-lg relative">
                <TextInput
                  className={cn(
                    "pl-10 pr-4 rounded-lg bg-background border-2 border-border h-[48px]",
                    {
                      "border-black": !!focusUsername,
                      "border-errormessage": !!passwordState.error,
                      "border-2": !!passwordState.error
                    }
                  )}
                  onFocus={() => setFocusUsername(true)}
                  onEndEditing={() => setFocusUsername(false)}
                  placeholder={`Enter your username`}
                  placeholderTextColor={"gray"}
                  autoCapitalize="none"
                  value={emailState.value}
                  onChangeText={emailState.onChangeText}
                />
                <View className="absolute top-[15px] left-3">
                  <UserRoundIcon className="size-5 text-muted-foreground" />
                </View>
              </View>
              {!!emailState.error && (
                <View className=" flex flex-row items-center mt-4">
                  <CircleAlert className="top-1" />
                  <Text className="text-errormessage text-sm font-medium">
                    {emailState.error?.charAt(0).toUpperCase() +
                      emailState.error?.slice(1)}{" "}
                  </Text>
                </View>
              )}
            </View>
            {/* Password Field */}
            <View className="mt-4">
              <Text className="text-base font-medium text-foreground h-[24px] self-stretch flex items-center">
                Password
              </Text>
              <View className="rounded-lg relative">
                <TextInput
                  className={cn(
                    "pl-10 pr-4 rounded-lg bg-background border-2 border-border h-[48px]",
                    {
                      "border-black": !!focusPassword,
                      "border-errormessage": !!passwordState.error,
                      "border-2": !!passwordState.error
                    }
                  )}
                  onFocus={() => setFocusPassword(true)}
                  onEndEditing={() => setFocusPassword(false)}
                  placeholder={`Enter your password`}
                  placeholderTextColor={"gray"}
                  secureTextEntry={securePassword}
                  value={passwordState.value}
                  onChangeText={passwordState.onChangeText}
                />
                <View className="absolute top-[15px] left-3">
                  <KeyIcon className="size-5 text-muted-foreground" />
                </View>
                <TouchableOpacity
                  onPress={onPressSecurePassword}
                  className="absolute top-[14px] right-3"
                >
                  {securePassword ? (
                    <EyeOffIcon className="size-6 text-[#525252]" />
                  ) : (
                    <EyeIcon className="size-6 text-[#525252]" />
                  )}
                </TouchableOpacity>
              </View>
              {!!passwordState.error && (
                <View className="flex flex-row items-center mt-4">
                  <CircleAlert className="top-1" />
                  <Text className="text-errormessage text-sm font-medium">
                    {passwordState.error?.charAt(0).toUpperCase() +
                      passwordState.error?.slice(1)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <Animated.View style={translateStyle} className="justify-end flex-1">
          <View className="justify-end">
            {/* Submit Button */}
            <Button
              variant="default"
              size={"lg"}
              disabled={!emailState.value || !passwordState.value || loading}
              className="mt-8 rounded-full bg-primary h-[48px]"
              loading={loading}
              onPress={handleContinue}
            >
              <Text className="text-white text-base font-medium">
                {loading ? `Continuing...` : `Continue`}
              </Text>
            </Button>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: "stretch",
    fontSize: 24,
    letterSpacing: 0,
    lineHeight: 30,
    fontWeight: "600",
    fontFamily: "PP Neue Montreal",
    color: "#0a0a0a",
    textAlign: "left"
  },
  writeASubheading: {
    alignSelf: "stretch",
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 22,
    fontFamily: "PP Neue Montreal",
    color: "#0a0a0a",
    textAlign: "left"
  },
  otpContainer: {
    justifyContent: "space-evenly",
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    width: 344,
    gap: 8
  },
  otpBox: {
    borderRadius: 8,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#a3a3a3",
    borderWidth: 1,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  otpText: {
    fontSize: 24,
    color: "#0a0a0a",
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  divider: {
    width: 9,
    height: 1,
    alignItems: "center"
  },
  pinSlotBorder: {
    borderWidth: 1,
    borderColor: "#a3a3a3",
    borderStyle: "solid"
  }
});
