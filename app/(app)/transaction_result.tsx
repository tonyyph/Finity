import { LoadingScreen } from "@/components/common/loading";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { formatDateNow } from "@/lib/date";
import { formatNumber } from "@/utils";
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
  secondaryButton: string;
}

function TransactionResultScreen() {
  const { success, amount } = useLocalSearchParams();

  const type = [
    {
      title: `Something went wrong`,
      sub: `An unexpected error occurred while processing your request. Please try again.`,
      icon: require("@/assets/images/error-filled.png"),
      button: `Load card again`,
      secondaryButton: `Return to home`
    },
    {
      title: `+£${formatNumber({
        value: Number(amount?.toString().replace(/,/g, "")) * 0.1
      })}`,
      sub: `successfully loaded to your card.`,
      icon: require("@/assets/images/success-filled.png"),
      button: `Load card again`,
      secondaryButton: `Return to home`
    }
  ];

  const [localType, setLocalType] = useState<propsLocal>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLocalType(success !== "false" ? type[1] : type[0]);
  }, []);

  const handleLoadCardAgain = useCallback(() => {
    if (success !== "false") {
      router.dismissTo({
        pathname: "/load_card",
        params: {
          isReset: "true"
        }
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        router.back();
      }, 1000);
    }
  }, [success]);

  const handleReturnHome = useCallback(() => {
    router.dismissAll();
  }, []);

  const TransRowItem = ({ title, value }: { title: string; value: string }) => {
    return (
      <View key={`${title}-${value}`} className="flex-row justify-between">
        <Typography weight="regular">{title}</Typography>
        <Typography>{value}</Typography>
      </View>
    );
  };

  const TransactionDetail = () => {
    return (
      <View className=" flex-1 bg-subtle justify-start items-center">
        <Image
          className="w-16 h-16"
          resizeMode="contain"
          source={localType?.icon}
        />
        <Typography type="heading-small" weight="semibold" className="mt-4">
          {localType?.title}
        </Typography>
        <Typography weight="regular" className="text-center mt-2">
          {localType?.sub}
        </Typography>
        <Typography weight="regular" className="text-center mt-6">
          {formatDateNow()}
        </Typography>

        <View className="mt-8 w-full border border-border rounded-2xl px-4 py-6 gap-2 bg-white">
          <TransRowItem title="Reference number" value="987654321" />
          <TransRowItem title="You loaded" value="1,500 points" />
          <TransRowItem title="Conversion rate" value="1 point = £0.1" />

          <View className="h-[1px] bg-border my-2" />

          <Typography type="body-default" weight="semibold">
            Account balances
          </Typography>
          <TransRowItem title="Points" value="122,390" />
          <TransRowItem title="Card" value="£150.00" />
        </View>
      </View>
    );
  };

  const ButtonSection = () => {
    return (
      <View className="gap-4">
        <Button
          variant="default"
          size={"lg"}
          className="rounded-full bg-primary h-[48px]"
          onPress={handleLoadCardAgain}
        >
          <Typography type="body-default" weight="medium" textColor="white">
            {localType?.button}
          </Typography>
        </Button>
        <Button
          variant="outline"
          size={"lg"}
          className="rounded-full h-[48px]"
          onPress={handleReturnHome}
        >
          <Typography type="body-default" weight="medium" textColor="black">
            {localType?.secondaryButton}
          </Typography>
        </Button>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-subtle p-4">
      <LoadingScreen loading={loading} />
      <TopIndicatorAvoidingView number={1.5} />

      <TransactionDetail />
      <ButtonSection />
      <BottomIndicatorAvoidingView />
    </View>
  );
}
export default TransactionResultScreen;
