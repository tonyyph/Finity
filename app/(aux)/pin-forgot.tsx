import { CircleAlert } from "@/components/common/icons";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useAnimatedKeyboard, useForgotPin } from "@/hooks";
import { cn, IS_IOS } from "@/lib/utils";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";
import {
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export default function ForgotPINScreen() {
  const [securePassword, setSecurePassword] = useState(true);
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const { keyboardHeight } = useAnimatedKeyboard(0);
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value
  }));

  const {
    onSubmitForgotPIN,
    usernameState,
    passwordState,
    isLoading: loading
  } = useForgotPin();

  const onPressSecurePassword = () => {
    setSecurePassword((prev) => !prev);
  };

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="bg-background flex-1">
        <View className="flex-1 gap-4 px-6 pt-8">
          <View className="flex-1">
            {/* Welcome */}
            <View className="z-10 mb-2">
              <View className="gap-2">
                <Typography type="heading-small" weight="semibold">
                  Forgot PIN
                </Typography>
                <Typography weight="regular">
                  Enter your credentials to verify your identity and reset your
                </Typography>
              </View>
            </View>

            <View className="flex-1 gap-3 bg-white pt-6">
              {/* Username Field */}
              <View className="gap-1">
                <Typography
                  type="body-default"
                  weight="medium"
                  textColor="#404040"
                >
                  Email
                </Typography>
                <View className="rounded-lg relative">
                  <TextInput
                    className={cn(
                      "px-3 rounded-lg bg-background border-2 border-border h-[48px]",
                      {
                        "border-black": !!focusUsername,
                        "border-errormessage": !!passwordState.error,
                        "border-2": !!passwordState.error
                      }
                    )}
                    onFocus={() => setFocusUsername(true)}
                    onEndEditing={() => setFocusUsername(false)}
                    placeholder={`Enter your email address`}
                    placeholderTextColor={"gray"}
                    autoCapitalize="none"
                    value={usernameState.value}
                    onChangeText={usernameState.onChangeText}
                  />
                </View>
                {!!usernameState.error && (
                  <View className=" flex flex-row items-center mt-2">
                    <CircleAlert className="top-1" />
                    <Typography
                      type="body-small"
                      weight="medium"
                      textColor="#D9323D"
                    >
                      {usernameState.error?.charAt(0).toUpperCase() +
                        usernameState.error?.slice(1)}{" "}
                    </Typography>
                  </View>
                )}
              </View>
              {/* Password Field */}
              <View className="mt-4 gap-1">
                <Typography
                  type="body-default"
                  weight="medium"
                  textColor="#404040"
                >
                  Password
                </Typography>
                <View className="rounded-lg relative">
                  <TextInput
                    className={cn(
                      "px-3 rounded-lg bg-background border-2 border-border h-[48px]",
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

                  <TouchableOpacity
                    onPress={onPressSecurePassword}
                    className="absolute top-[14px] right-4"
                  >
                    {securePassword ? (
                      <EyeOffIcon className="size-6 text-[#525252]" />
                    ) : (
                      <EyeIcon className="size-6 text-[#525252]" />
                    )}
                  </TouchableOpacity>
                </View>
                {!!passwordState.error && (
                  <View
                    className={cn(
                      "flex flex-row items-center mt-4",
                      !!usernameState.error && "mt-2"
                    )}
                  >
                    <CircleAlert className="top-1" />
                    <Typography
                      type="body-small"
                      weight="medium"
                      textColor="#D9323D"
                    >
                      {passwordState.error?.charAt(0).toUpperCase() +
                        passwordState.error?.slice(1)}
                    </Typography>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View className="justify-end">
            {/* Submit Button */}
            <Button
              variant="default"
              size={"lg"}
              disabled={!usernameState.value || !passwordState.value || loading}
              className="mt-8 rounded-full bg-primary h-[48px]"
              loading={loading}
              onPress={onSubmitForgotPIN}
            >
              <Typography
                type="body-default"
                weight="medium"
                textColor={
                  !usernameState.value || !passwordState.value
                    ? "#A3A3A3"
                    : "white"
                }
              >
                {loading ? `Continuing...` : `Continue`}
              </Typography>
            </Button>
          </View>
        </View>
        <BottomIndicatorAvoidingView />
        <Animated.View style={translateStyle} />
      </View>
    </TouchableWithoutFeedback>
  );
}
