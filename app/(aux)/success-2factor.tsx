import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useUserAuthenticateStore } from "@/stores";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { Image, View } from "react-native";

function TwoFactorAuthenticationSuccess() {
  const { isResetPin } = useLocalSearchParams();
  const { isFirst2FA, setIsLoggedIn } = useUserAuthenticateStore();

  const handleSetupPin = useCallback(() => {
    router.push({
      pathname: "/pin-verify",
      params: { isResetPin, type: "setup" }
    });
  }, [isResetPin]);

  const handleContinue = useCallback(() => {
    router.replace("/(app)/(tabs)");
    setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <View className="flex-1 px-4 gap-3 items-center mt-40">
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={require("@/assets/images/success-filled.png")}
          />
          <Typography type="heading-small" weight="semibold">
            Verification success
          </Typography>
          <Typography weight="regular" className="text-center">
            {isResetPin === "1"
              ? `Two-factor authentication verified. Tap ‘Continue’ to set up your new PIN.`
              : `Two-factor authentication verified. `}
          </Typography>
        </View>
        <View className="px-4 gap-6">
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full bg-primary h-[48px]"
            onPress={!isFirst2FA ? handleContinue : handleSetupPin}
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {isResetPin === "1" || !isFirst2FA ? `Continue` : `Set up PIN`}
            </Typography>
          </Button>
        </View>
      </View>
    </View>
  );
}
export default TwoFactorAuthenticationSuccess;
