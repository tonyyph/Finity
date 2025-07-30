import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useUserAuthenticateStore } from "@/stores";
import {
  BottomIndicatorAvoidingView,
  TopIndicatorAvoidingView
} from "@/utils/spacing";
import { router } from "expo-router";
import { isEmpty } from "lodash-es";
import { useCallback } from "react";
import { Image, View } from "react-native";

function TwoFactorAuthenticationSuccess() {
  const { setIsLoggedIn, verificationPin, isForgotPin } =
    useUserAuthenticateStore();

  const handleSetupPin = useCallback(() => {
    router.push({
      pathname: "/pin-verify",
      params: { isResetPin: isForgotPin ? "1" : "0", type: "setup" }
    });
  }, [isForgotPin]);

  const handleContinue = useCallback(() => {
    router.replace("/(app)/(tabs)");
    setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-between">
        <View className="px-4 gap-3 items-center">
          <TopIndicatorAvoidingView number={2.5} />
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={require("@/assets/images/success-filled.png")}
          />
          <Typography type="heading-small" weight="semibold">
            Verification success
          </Typography>
          <Typography weight="regular" className="text-center">
            {isForgotPin
              ? `Two-factor authentication verified. Tap ‘Continue’ to set up your new PIN.`
              : `Two-factor authentication verified. `}
          </Typography>
        </View>
        <View className="px-4 gap-6">
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full bg-primary h-[48px]"
            onPress={
              !isEmpty(verificationPin) ? handleContinue : handleSetupPin
            }
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {isForgotPin || !isEmpty(verificationPin)
                ? `Continue`
                : `Set up PIN`}
            </Typography>
          </Button>
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  );
}
export default TwoFactorAuthenticationSuccess;
