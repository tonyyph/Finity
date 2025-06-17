import { LoadingScreen } from "@/components/common/loading";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import {
  BottomIndicatorAvoidingView,
  TopIndicatorAvoidingView
} from "@/utils/spacing";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, View } from "react-native";

interface propsLocal {
  title: string;
  sub: string;
  icon: any;
  button: string;
}

const type = [
  {
    title: `Something went wrong`,
    sub: `An unexpected error occurred while processing your request. Please try again.`,
    icon: require("@/assets/images/error-filled.png"),
    button: `Try again`
  },
  {
    title: `Card activated successfully!`,
    sub: `Your card has been activated and is ready for use. Enjoy your transactions!`,
    icon: require("@/assets/images/success-filled.png"),
    button: `Return to home`
  }
];

function ActiveCardSuccessScreen() {
  const { success } = useLocalSearchParams();
  const [localType, setLocalType] = useState<propsLocal>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (success !== "false") {
      setLocalType(type[1]);
    } else {
      setLocalType(type[0]);
    }
  }, [success]);

  const handleReturnHome = useCallback(() => {
    if (success !== "false") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.back();
      }, 3000);
    } else {
      router.back();
    }
  }, [success]);

  return (
    <View className="flex-1 bg-background px-6 pt-6">
      <TopIndicatorAvoidingView />
      <LoadingScreen loading={loading} />

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
      <BottomIndicatorAvoidingView />
    </View>
  );
}
export default ActiveCardSuccessScreen;
