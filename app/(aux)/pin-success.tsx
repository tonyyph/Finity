import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useUserAuthenticateStore } from "@/stores";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { Image, View } from "react-native";

function SetupPinSuccess() {
  const { isResetPin } = useLocalSearchParams();
  const { setIsLoggedIn, setIsLoginWithPin, setIsFirst2FA } =
    useUserAuthenticateStore();

  const handleContinue = useCallback(() => {
    router.replace("/(app)/(tabs)");
    setIsLoginWithPin(true);
    setIsLoggedIn(true);
    setIsFirst2FA(false);
  }, []);

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
            {isResetPin === "1" ? `PIN changed` : `PIN successfully set`}
          </Typography>
          <Typography weight="regular" className="text-center px-6">
            {isResetPin === "1"
              ? `Remember to keep your new PIN private and update it regularly.`
              : `Your PIN has been set. Tap 'Continue' to go to your Home page and get started.`}
          </Typography>
        </View>
        <View className="px-6 gap-6">
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full bg-primary h-[48px]"
            onPress={handleContinue}
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {`Continue`}
            </Typography>
          </Button>
        </View>
      </View>
    </View>
  );
}
export default SetupPinSuccess;
