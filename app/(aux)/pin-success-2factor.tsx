import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useUserAuthenticateStore } from "@/stores";
import {
  BottomIndicatorAvoidingView,
  TopIndicatorAvoidingView
} from "@/utils/spacing";
import { useAuth } from "@clerk/clerk-expo";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import { Image, View } from "react-native";

function PINTwoFactorAuthenticationSuccess() {
  const { isResetPin } = useLocalSearchParams();
  const { setStoreUserId } = useUserAuthenticateStore();
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      !!userId && setStoreUserId(userId);
    }
  }, [userId]);

  const handleSetupPin = useCallback(() => {
    router.push({
      pathname: "/pin-verify",
      params: { isResetPin, type: "setup" }
    });
  }, [isResetPin]);

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 justify-between">
        <View className="px-4 gap-3 items-center">
          <TopIndicatorAvoidingView number={3} />
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={require("@/assets/images/success-filled.png")}
          />
          <Typography type="heading-small" weight="semibold">
            Verification success
          </Typography>
          <Typography weight="regular" className="text-center">
            {`Two-factor authentication verified. Tap ‘Continue’ to set up your new PIN.`}
          </Typography>
        </View>
        <View className="px-4 gap-6">
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full bg-primary h-[48px]"
            onPress={handleSetupPin}
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
export default PINTwoFactorAuthenticationSuccess;
