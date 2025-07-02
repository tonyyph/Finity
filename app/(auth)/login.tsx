import { CircleAlert } from "@/components/common/icons";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/auth/useLogin";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default function LoginScreen() {
  const [securePassword, setSecurePassword] = useState(true);
  const [focusUsername, setFocusUsername] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const { onLogin, usernameState, passwordState, isLoading } = useLogin();

  const onPressSecurePassword = () => {
    setSecurePassword((prev) => !prev);
  };

  return (
    <View className="flex-1">
      {/* Welcome */}
      <View className=" bg-black">
        <Image
          source={require("@/assets/images/logo-stack.png")}
          className="w-full h-[220px] bg-black top-10"
          resizeMode="contain"
        />
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="bg-black z-10 gap-4 flex-1 justify-center">
          {/* Input Field */}
          <View className="flex-1 rounded-t-[18px] z-20 bg-orange-400">
            <View className="flex-1 flex-col gap-3 bg-white top-2 p-4 pt-6 rounded-t-[24px]">
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
                        "border-errormessage":
                          !!passwordState.error || !!usernameState.error,
                        "border-2": !!passwordState.error
                      }
                    )}
                    onFocus={() => setFocusUsername(true)}
                    onEndEditing={() => setFocusUsername(false)}
                    placeholder={`Enter email address`}
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
                    placeholder={`Enter password`}
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
                      {passwordState.error}
                    </Typography>
                  </View>
                )}
              </View>
              {/* Login Button */}
              <Button
                variant="default"
                size={"lg"}
                className="mt-8 rounded-full bg-primary h-[48px]"
                loading={isLoading}
                onPress={onLogin}
              >
                <Typography
                  type="body-default"
                  weight="medium"
                  textColor="white"
                >
                  {isLoading ? `Signing in...` : `Sign in`}
                </Typography>
              </Button>
              {/* Forgot password */}
              <View className="px-4 mt-2">
                <Typography
                  type="body-default"
                  weight="medium"
                  className="text-center mt-2"
                  onPress={() =>
                    router.push({
                      pathname: "/un-auth-web-view",
                      params: {
                        title: "Forgot password",
                        webLink:
                          "https://as-rwd-uks-rewards-web-dev.azurewebsites.net/account/forgot-password"
                      }
                    })
                  }
                >
                  Forgot password?
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
