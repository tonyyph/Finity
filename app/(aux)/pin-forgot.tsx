import { CircleAlert } from "@/components/common/icons";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default function ForgotPINScreen() {
  const [loading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const { onForgotPassword, emailState, passwordState } = useForgotPassword();

  const onPressSecurePassword = () => {
    setSecurePassword((prev) => !prev);
  };

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

          <View className="flex-1 flex-col gap-3 bg-white pt-6 rounded-t-[24px]">
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
                  value={emailState.value}
                  onChangeText={emailState.onChangeText}
                />
              </View>
              {!!emailState.error && (
                <View className=" flex flex-row items-center mt-2">
                  <CircleAlert className="top-1" />
                  <Typography
                    type="body-small"
                    weight="medium"
                    textColor="#D9323D"
                  >
                    {emailState.error?.charAt(0).toUpperCase() +
                      emailState.error?.slice(1)}{" "}
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
                    !!emailState.error && "mt-2"
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
        <View className="justify-end flex-1">
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
              <Typography type="body-default" weight="medium" textColor="white">
                {loading ? `Continuing...` : `Continue`}
              </Typography>
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
