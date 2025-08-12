/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowDownIcon } from "@/assets";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import { useTransaction } from "@/hooks";
import { formatNumber } from "@/utils";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

function ReviewTransactionScreen() {
  const {
    type,
    amount,
    cardHolderName,
    cardHolderId,
    pointsBalance,
    cardBalance
  } = useLocalSearchParams();

  const isLoadCard = type === "load-card";

  const { loadCard, loading, sendPoints } = useTransaction();

  const handleConfirmLoadCard = async () => {
    await loadCard({
      totalPointsBalance: (Number(pointsBalance) - Number(amount)).toString(),
      pointsAmount: amount.toString(),
      type: type.toString()
    });
  };

  const handleConfirmSendPoints = async () => {
    await sendPoints({
      pointsAmount: amount.toString(),
      destinationUserId: Number(cardHolderId),
      type: type.toString()
    });
  };

  const LoadCardInfo = () => {
    return (
      <View className="flex-1 pt-4">
        <View className="px-6 gap-2">
          <View className="bg-neutral-100 px-5 py-4 items-start justify-center gap-1 rounded-xl">
            <Typography type="body-large" weight="semibold">
              {`Load`}
            </Typography>
            <Typography>{`${amount} points`}</Typography>
          </View>
          <View
            className="bg-white rounded-full self-center absolute p-[6px] top-[50%] z-10"
            style={styles.arrowStyle}
          >
            <ArrowDownIcon />
          </View>
          <View className="bg-neutral-100 px-5 py-4 items-start justify-center gap-1 rounded-xl">
            <Typography type="body-large" weight="semibold">
              {`You’ll receive`}
            </Typography>
            <Typography>
              {`£${formatNumber({
                value: Number(amount?.toString().replace(/,/g, "")) * 0.1
              })}`}
            </Typography>
          </View>
        </View>
        {/* point balance */}
        <View className="flex-row gap-1 items-center px-6 pt-2">
          <Typography type="body-small" weight="medium" textColor="#525252">
            {`Card balance after load: £${formatNumber({
              value:
                Number(amount?.toString().replace(/,/g, "")) * 0.1 +
                Number(cardBalance?.toString().replace(/,/g, ""))
            })}`}
          </Typography>
        </View>
      </View>
    );
  };

  const SendPointInfo = () => {
    return (
      <View className="flex-1 pt-4">
        <View className="px-6 gap-2">
          <View className="bg-neutral-100 px-5 py-4 items-start justify-center gap-1 rounded-xl">
            <Typography type="body-large" weight="semibold">
              {`Send`}
            </Typography>
            <Typography>{`${amount} points`}</Typography>
          </View>
          <View
            className="bg-white rounded-full self-center p-[6px] z-10"
            style={styles.arrowStyle}
          >
            <ArrowDownIcon />
          </View>
          <View className="bg-neutral-100 px-5 py-4 items-start justify-center gap-1 rounded-xl">
            <Typography type="body-large" weight="semibold">
              {`Recipient`}
            </Typography>
            <Typography>{`${cardHolderName}`}</Typography>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <Header onBack={router.back} title="Review transactions" />
        <ProgressBar completeAnimation={true} />

        {isLoadCard ? <LoadCardInfo /> : <SendPointInfo />}
        {/* Bottom */}
        <View className="px-4">
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full bg-primary h-12"
            loading={loading}
            disabled={loading}
            onPress={
              isLoadCard ? handleConfirmLoadCard : handleConfirmSendPoints
            }
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {loading
                ? isLoadCard
                  ? `Loading card...`
                  : `Sending points...`
                : isLoadCard
                ? `Confirm and load`
                : `Confirm and send`}
            </Typography>
          </Button>
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  );
}
export default ReviewTransactionScreen;

const styles = StyleSheet.create({
  arrowStyle: {
    position: "absolute",
    top: "46%",
    transform: [{ translateY: -20 }],
    backgroundColor: "#ffffff"
  }
});
