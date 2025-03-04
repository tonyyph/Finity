import { CircleAlert } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { AnimatedSpinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useLogin } from "@/hooks/auth/useLogin";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { router } from "expo-router";
import {
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  UserRoundIcon
} from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  Image,
  Keyboard,
  Linking,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const { i18n } = useLingui();
  const { onLogin, usernameState, passwordState } = useLogin();
  const handleSignedIn = useCallback(() => {
    const setError = (error: string = "Invalid password") => {
      passwordState.setState((prev) => ({ ...prev, error }));
    };

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (passwordState.value === "access") {
        router.push("/(auth)/access-denied");
      }
      if (passwordState.value === "wrong") {
        router.push("/(auth)/st-went-wrong");
      }
      if (passwordState.value === "notfound") {
        router.push("/(auth)/page-not-found");
      }
      if (passwordState.value === "123456") {
        router.push("/(auth)/verify-2factor");
      } else {
        setError("Incorrect email address or password. Try again.");
      }
    }, 1500);
  }, [passwordState.value]);

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
              <View className="">
                <Text className="text-base font-medium text-foreground h-[24px] self-stretch flex items-center">
                  Email
                </Text>
                <View className="rounded-lg relative">
                  <TextInput
                    className="pl-10 pr-4 rounded-lg bg-background border border-border h-[48px]"
                    placeholder={t(i18n)`Enter your username`}
                    placeholderTextColor={"gray"}
                    autoCapitalize="none"
                    value={usernameState.value}
                    onChangeText={usernameState.onChangeText}
                  />
                  <View className="absolute top-[15px] left-3">
                    <UserRoundIcon className="size-5 text-muted-foreground" />
                  </View>
                </View>
                {!!usernameState.error && (
                  <View className=" flex flex-row items-center mt-1">
                    <CircleAlert className="top-1" />
                    <Text className="text-red-500 text-sm font-medium">
                      {usernameState.error?.charAt(0).toUpperCase() +
                        usernameState.error?.slice(1)}{" "}
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
                    className="px-10 rounded-lg bg-background border border-border h-[48px]"
                    placeholder={t(i18n)`Enter your password`}
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
                      <EyeOffIcon className="size-6 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="size-6 text-muted-foreground" />
                    )}
                  </TouchableOpacity>
                </View>
                {!!passwordState.error && (
                  <View className=" flex flex-row items-center mt-1">
                    <CircleAlert className="top-1" />
                    <Text className="text-red-500 text-sm font-medium">
                      {passwordState.error?.charAt(0).toUpperCase() +
                        passwordState.error?.slice(1)}
                    </Text>
                  </View>
                )}
              </View>
              {/* Login Button */}
              <Button
                variant="default"
                disabled={
                  !usernameState.value || !passwordState.value || loading
                }
                size={"lg"}
                className="mt-8 rounded-full bg-primary h-[48px]"
                loading={loading}
                onPress={handleSignedIn}
              >
                {loading && <AnimatedSpinner />}
                <Text className="text-white text-base font-medium">
                  {loading ? t(i18n)`Signing in...` : t(i18n)`Sign in`}
                </Text>
              </Button>
              {/* Forgot password */}
              <View className="px-4 mt-2">
                <Trans>
                  <Text className="mx-auto text-center text-muted-foreground">
                    <Text
                      className="text-primary text-base font-medium"
                      onPress={() =>
                        Linking.openURL("https://www.finity.co.uk/rewards/")
                      }
                    >
                      Forgot password?
                    </Text>
                  </Text>
                </Trans>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
