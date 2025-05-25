import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useUserAuthenticateStore } from "@/stores";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router, useLocalSearchParams } from "expo-router";
import { find } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { Image, View } from "react-native";

interface PinProps {
  pinType: string;
  title: string;
  subTitle: string;
}

const PinSuccessType: PinProps[] = [
  {
    pinType: "setup",
    title: `PIN successfully set`,
    subTitle: `Your PIN has been set. Tap 'Continue' to go to your Home page and get started.`
  },
  {
    pinType: "change",
    title: `PIN created successfully!`,
    subTitle: `Your account is now even more secure. \nRemember to keep your new PIN private and update it regularly.`
  }
];
function SetupPinSuccess() {
  const { isResetPin, type } = useLocalSearchParams();
  const { setIsLoggedIn, setIsFirst2FA } = useUserAuthenticateStore();
  const [pinType, setPinType] = useState<PinProps>();

  useEffect(() => {
    setPinType(
      find(PinSuccessType, (pi) => String(pi.pinType) === String(type))
    );
  }, [type]);

  const handleContinue = useCallback(() => {
    if (type === "change") {
      router.dismissAll();
    } else {
      router.replace("/(app)/(tabs)");
      setIsLoggedIn(true);
      setIsFirst2FA(false);
    }
  }, [setIsFirst2FA, setIsLoggedIn, type]);

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
            {isResetPin === "1" ? `PIN changed` : pinType?.title}
          </Typography>
          <Typography weight="regular" className="text-center px-4">
            {isResetPin === "1"
              ? `Remember to keep your new PIN private and update it regularly.`
              : pinType?.subTitle}
          </Typography>
        </View>
        <View className="px-4 gap-4">
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
      <BottomIndicatorAvoidingView />
    </View>
  );
}
export default SetupPinSuccess;
