import { LoadingScreen } from "@/components/common/loading";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { t } from "@lingui/macro";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, View } from "react-native";
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
    title: t`Card request successful`,
    sub: t`Your new card is on its way! It will arrive within 5–7 business days, and your balance will transfer automatically. `,
    icon: require("@/assets/images/success-filled.png"),
    button: t`Return to home`
  }
];

function RequestCardSuccessScreen() {
  const { success } = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();
  const [localType, setLocalType] = useState<propsLocal>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (success != "false") {
      setLocalType(type[1]);
    } else {
      setLocalType(type[0]);
    }
  }, [success]);

  const handleReturnHome = useCallback(() => {
    if (success != "false") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.dismissAll();
      }, 3000);
    } else {
      router.back();
    }
  }, []);

  return (
    <View
      className="flex-1 bg-background p-6"
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
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
    </View>
  );
}
export default RequestCardSuccessScreen;
