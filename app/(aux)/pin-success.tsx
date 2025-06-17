import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useBiometrics } from "@/hooks";
import { useUserAuthenticateStore } from "@/stores";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { Image, View } from "react-native";

function SetupPinSuccess() {
  const { isResetPin } = useLocalSearchParams();
  const { setIsLoggedIn, setIsFirst2FA, setShouldPINLocal } =
    useUserAuthenticateStore();
  const { bioStatus, isBiometricSupported, supportType } = useBiometrics();

  const handleContinue = useCallback(() => {
    setIsLoggedIn(true);
    setIsFirst2FA(false);
    setShouldPINLocal(false);
    router.replace("/(app)/(tabs)");
  }, [setIsFirst2FA, setIsLoggedIn, setShouldPINLocal]);

  const handleSetupBiometrics = useCallback(() => {
    setIsLoggedIn(true);
    setIsFirst2FA(false);
    setShouldPINLocal(false);
    router.replace({
      pathname: "/biometrics",
      params: { typeAuthentication: supportType, firstFA: "1" }
    });
  }, [setIsLoggedIn, setIsFirst2FA, supportType, setShouldPINLocal]);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <View className="flex-1 px-4 gap-4 items-center mt-40">
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={require("@/assets/images/success-filled.png")}
          />
          <Typography type="heading-small" weight="semibold">
            {isResetPin === "1" ? `PIN changed` : `PIN successfully set`}
          </Typography>
          <Typography weight="regular" className="text-center px-4">
            {isResetPin === "1"
              ? `Remember to keep your new PIN private and update it regularly.`
              : `Your PIN has been set. Tap 'Continue' to go to your Home page and get started.`}
          </Typography>
        </View>
        <View className="px-4 gap-4">
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full bg-primary h-[48px]"
            onPress={
              isBiometricSupported && !bioStatus
                ? handleSetupBiometrics
                : handleContinue
            }
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {`Continue`}
            </Typography>
          </Button>
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  );
}
export default SetupPinSuccess;
