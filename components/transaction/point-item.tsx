import { CardLoadIcon, FinityIcon, ReceivedIcon, SentIcon } from "@/assets";
import { formatDateTransaction } from "@/lib/date";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../common";
import { useTransaction } from "@/hooks";
import { convertPointsToGBP } from "@/lib/utils";

export const PointItem = ({ item }: { item: Transaction }) => {
  const { handleToTransactionDetail } = useTransaction();

  const handleToTransDetail = async () => {
    handleToTransactionDetail &&
      handleToTransactionDetail({
        item,
        transId: item.id,
        referenceNumber: item.cardProviderReference ?? "",
        type: "Point"
      });
  };

  function getIconByType(type: string) {
    const iconMap: Record<string, JSX.Element> = {
      "Points Sent": <ReceivedIcon />,
      "Points Received": <SentIcon />,
      "Card Load": <CardLoadIcon />,
      Adjustment: <FinityIcon />,
      Accrual: <FinityIcon />
    };

    return iconMap[type] ?? <FinityIcon />;
  }

  function getDescriptionByType(
    type: string,
    source: string,
    amount: number
  ): string {
    const descriptionMap: Record<string, string> = {
      "Points Sent": `${source}`,
      "Points Received": `${source}`,
      "Card Load": `${convertPointsToGBP(Math?.abs?.(amount))}`,
      Adjustment: "Reward points",
      Accrual: "Reward points",
      "Referral Bonus": `Reward points`
    };

    return descriptionMap[type] ?? "Reward points";
  }

  return (
    <TouchableOpacity
      onPress={handleToTransDetail}
      className="flex-1 flex-row justify-between items-start py-3 px-4 active:bg-subtitle rounded-lg"
    >
      <View className="flex-1 flex-row items-start gap-4 min-h-[64px]">
        <View className="w-[40px] h-[40px] bg-[#F4F4F4] rounded-full justify-center items-center">
          {getIconByType(item?.type)}
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between">
            <Typography>{item.type}</Typography>
            <Typography
              textColor={item.amount > 0 ? "#00A464" : "#D9323D"}
              className="text-right"
            >
              {`${item?.amount > 0 ? "+" : "-"}${Math.abs(
                item?.amount
              ).toLocaleString()}`}
            </Typography>
          </View>
          <Typography
            textColor="#404040"
            weight="regular"
            style={styles.source}
          >
            {getDescriptionByType(item?.type, item?.source, item?.amount)}
          </Typography>
          <Typography textColor="#737373" weight="regular">
            {formatDateTransaction(item?.date)}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  source: {
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 1
  }
});
