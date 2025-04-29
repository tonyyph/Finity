import { LoadingScreen } from "@/components/common/loading";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/utils";
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
  secondaryButton: string;
}

function TransactionResultScreen() {
  const { success, amount } = useLocalSearchParams();

  const type = [
    {
      title: t`Something went wrong`,
      sub: t`An unexpected error occurred while processing your request. Please try again.`,
      icon: require("@/assets/images/error-filled.png"),
      button: t`Load card again`,
      secondaryButton: t`Return to home`
    },
    {
      title: `+£${formatNumber({
        value: Number(amount?.toString().replace(/,/g, "")) * 0.1
      })}`,
      sub: t`successfully loaded to your card.`,
      icon: require("@/assets/images/success-filled.png"),
      button: t`Load card again`,
      secondaryButton: t`Return to home`
    }
  ];

  const { bottom } = useSafeAreaInsets();
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
        router.dismissAll();
      }, 3000);
    } else {
      router.back();
    }
  }, [success]);

  return (
    <View
      className="flex-1 bg-background p-4"
      style={{ paddingBottom: bottom * 1.5 }}
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
export default TransactionResultScreen;
