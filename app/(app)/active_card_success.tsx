import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Touch from "@/components/ui/touch";
import { t } from "@lingui/macro";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import { Image, SafeAreaView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface propsLocal {
  title: string;
  sub: string;
  icon: any;
  button: string;
}

const type = [
  {
    title: t`Something went wrong`,
    sub: t`An unexpected error occurred while processing your request. Please try again.`,
    icon: require("@/assets/images/error-filled.png"),
    button: t`Try again`
  },
  {
    title: t`Card activated successfully!`,
    sub: t`Your card has been activated and is ready for use. Enjoy your transactions!`,
    icon: require("@/assets/images/success-filled.png"),
    button: t`Return to home`
  }
];

function ActiveCardSuccessScreen() {
  const { success } = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();
  const [localType, setLocalType] = useState<propsLocal>();
  useEffect(() => {
    if (success != "false") {
      setLocalType(type[1]);
    } else {
      setLocalType(type[0]);
    }
  }, [success]);

  const handleReturnHome = useCallback(() => {
    router.back();
  }, []);

  return (
    <View className="flex-1 bg-background px-4" style={{ paddingTop: top }}>
      <View className=" flex-1 bg-background items-center mt-28">
        <Image
          className="w-16 h-16"
          resizeMode="contain"
          source={localType?.icon}
        />
        <Typography type="heading-small" weight="semibold" className="mt-4">
          {localType?.title}
        </Typography>
        <Typography weight="regular" className="text-center mt-4">
          {localType?.sub}
        </Typography>
      </View>

      <Button
        variant="default"
        size={"lg"}
        className="rounded-full bg-primary h-[48px]"
        onPress={handleReturnHome}
      >
        <Typography type="body-default" weight="medium" textColor="white">
          {localType?.button}
        </Typography>
      </Button>
      <View style={{ height: bottom }} />
    </View>
  );
}
export default ActiveCardSuccessScreen;
