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
    title: `Card request successful`,
    sub: `Your new card is on its way! It will arrive within 5–7 business days, and your balance will transfer automatically. `,
    icon: require("@/assets/images/success-filled.png"),
    button: `Return to home`
  }
];

function RequestCardSuccessScreen() {
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
        router.dismissAll();
        setLoading(false);
      }, 3000);
    } else {
      router.back();
    }
  }, [success]);

  if (loading) {
    return <LoadingScreen loading={true} />;
  }
  return (
    <View className="flex-1 bg-background">
      <TopIndicatorAvoidingView number={2.5} />
      <View className=" flex-1 bg-background items-center mx-6">
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
        className="rounded-full bg-primary h-[48px] mx-6"
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
export default RequestCardSuccessScreen;
