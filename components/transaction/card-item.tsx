import {
  CardLoadIcon,
  FinityIcon,
  ReceivedIcon,
  RefundIcon,
  SentIcon
} from "@/assets";
import { formatDateTransaction } from "@/lib/date";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../common";
import { useTransaction } from "@/hooks";
import { convertGBPToPoints } from "@/lib/utils";

export const CardItem = ({ item }: { item: Transaction }) => {
  const { handleToTransactionDetail } = useTransaction();

  const handleToTransDetail = async () => {
    handleToTransactionDetail &&
      handleToTransactionDetail({
        item,
        transId: item.id,
        referenceNumber: item.cardProviderReference ?? "",
        type: "Card"
      });
  };

  function getIconByType(type: string) {
    const iconMap: Record<string, JSX.Element> = {
      "Points Sent": <SentIcon />,
      Presentment: <ReceivedIcon />,
      "Card Load": <CardLoadIcon />,
      Refund: <RefundIcon />,
      Load: <CardLoadIcon />
    };

    return iconMap[type] ?? <FinityIcon />;
  }

  function getDescriptionByType(
    type: string,
    source: string,
    amount: number
  ): string {
    const descriptionMap: Record<string, string> = {
      Sent: `${source}`,
      Presentment: !!`${source}` ? `${source}` : `Payment`,
      Refund: `Refund`,
      "Card Load": `${convertGBPToPoints(Math?.abs?.(amount))}`,
      Adjustment: "Reward points",
      Accrual: "Reward points",
      Load: `${convertGBPToPoints(Math?.abs?.(amount))}`
    };

    return descriptionMap[type] ?? "Payment";
  }

  function getTitleByType(type: string): string {
    const descriptionMap: Record<string, string> = {
      Load: `Card Load`
    };

    return descriptionMap[type] ?? type;
  }

  return (
    <TouchableOpacity
      onPress={handleToTransDetail}
      className="flex-1 flex-row justify-between items-start py-3 active:bg-subtitle rounded-lg"
    >
      <View className="flex-1 flex-row items-start gap-4 min-h-[64px]">
        <View className="w-[40px] h-[40px] bg-[#F4F4F4] rounded-full justify-center items-center">
          {getIconByType(item?.type)}
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between">
            <Typography>{getTitleByType(item?.type)}</Typography>
            <Typography
              textColor={item.amount > 0 ? "#00A464" : "#D9323D"}
              className="text-right"
            >
              {`${item?.amount > 0 ? "+" : "-"}£${Math.abs(
                item?.amount
              ).toFixed(2)}`}
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
