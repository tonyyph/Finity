import { LoadingScreen } from "@/components/common/loading";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { formatDateNow, formatDateTransactionDetails } from "@/lib/date";
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
  const {
    success,
    amount,
    type: transType,
    transactionId,
    email,
    cardBalance,
    pointsBalance,
    totalCardBalance,
    totalPointsBalance,
    dateTransacted,
    destinationUserFullName
  } = useLocalSearchParams();

  const isEmptyString = (str: string) => !str.trim();

  const type = [
    {
      title: `Something went wrong`,
      sub: `An unexpected error occurred while processing your request. Please try again.`,
      icon: require("@/assets/images/error-filled.png"),
      button:
        transType === "load-card" ? `Load card again` : `Send points again`,
      secondaryButton: `Return to home`
    },
    {
      title:
        transType === "load-card"
          ? `+£${formatNumber({
              value: Number(amount?.toString().replace(/,/g, "")) * 0.1
            })}`
          : `${amount} points`,
      sub:
        transType === "load-card"
          ? `successfully loaded to your card.`
          : `successfully sent to ${
              !isEmptyString(destinationUserFullName.toString())
                ? destinationUserFullName.toString()
                : email
            }.`,
      icon: require("@/assets/images/success-filled.png"),
      button:
        transType === "load-card" ? `Load card again` : `Send points again`,
      secondaryButton: `Return to home`
    }
  ];

  const [localType, setLocalType] = useState<propsLocal>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLocalType(success !== "false" ? type[1] : type[0]);
  }, []);

  const handleLoadCardAgain = useCallback(() => {
    router.dismissTo({
      pathname: "/load_card",
      params: {
        isReset: "true"
      }
    });
  }, []);

  const handleSendPointAgain = useCallback(() => {
    router.dismissTo({
      pathname: "/send_card",
      params: {
        isReset: "true"
      }
    });
  }, []);

  const handleReturnHome = useCallback(async () => {
    setLoading(true);

    try {
      await router.dismissAll();
    } finally {
      setLoading(false);
    }
  }, []);

  const TransRowItem = ({ title, value }: { title: string; value: string }) => {
    return (
      <View key={`${title}-${value}`} className="flex-row justify-between">
        <Typography weight="regular" style={{ flex: 0.6 }}>
          {title}
        </Typography>
        <Typography style={{ flex: 0.4, textAlign: "right" }}>
          {value}
        </Typography>
      </View>
    );
  };

  const TransactionCardDetail = () => {
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
          <TransRowItem
            title="Reference number"
            value={transactionId.toString()}
          />
          <TransRowItem title="You loaded" value={`${amount} points`} />
          <TransRowItem title="Conversion rate" value="1 point = £0.1" />

          <View className="h-[1px] bg-border my-2" />

          <Typography type="body-default" weight="semibold">
            Account balances
          </Typography>
          <TransRowItem title="Points" value={`${totalPointsBalance} points`} />
          <TransRowItem title="Card" value={`£${totalCardBalance}`} />
        </View>
      </View>
    );
  };

  const TransactionPointDetail = () => {
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
        <Typography weight="regular" className="text-center mt-4">
          {formatDateTransactionDetails(dateTransacted?.toString())}
        </Typography>

        <View className="mt-6 w-full border border-border rounded-2xl px-4 py-6 gap-2 bg-white">
          <TransRowItem
            title="Reference number"
            value={transactionId?.toString()}
          />
          <TransRowItem title="You sent" value={`${amount} points`} />

          <View className="h-[1px] bg-border my-2" />

          <Typography type="body-default" weight="semibold">
            Recipient details
          </Typography>
          <TransRowItem
            title="Account holder"
            value={destinationUserFullName.toString()}
          />
          <TransRowItem title="Email address" value={email.toString()} />

          <View className="h-[1px] bg-border my-2" />

          <Typography type="body-default" weight="semibold">
            Account balances
          </Typography>
          <TransRowItem title="Points" value={`${pointsBalance} points`} />
          <TransRowItem
            title="Card"
            value={`£${formatNumber({
              value: Number(cardBalance?.toString().replace(/,/g, "")) * 0.1
            })}`}
          />
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
          onPress={
            transType === "load-card"
              ? handleLoadCardAgain
              : handleSendPointAgain
          }
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

  if (success === "false") {
    return (
      <View className="flex-1 bg-white p-4">
        <LoadingScreen loading={loading} />
        <TopIndicatorAvoidingView number={1.5} />
        <View className="flex-1 justify-start items-center">
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={localType?.icon}
          />
          <Typography type="heading-small" weight="semibold" className="mt-4">
            {localType?.title}
          </Typography>
          <Typography weight="regular" className="text-center mt-2 mx-2">
            {localType?.sub}
          </Typography>
        </View>
        <ButtonSection />
        <BottomIndicatorAvoidingView />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-subtle p-4">
      <LoadingScreen loading={loading} />
      <TopIndicatorAvoidingView number={1.5} />
      {transType === "load-card" ? (
        <TransactionCardDetail />
      ) : (
        <TransactionPointDetail />
      )}
      <ButtonSection />
      <BottomIndicatorAvoidingView />
    </View>
  );
}
export default TransactionResultScreen;
