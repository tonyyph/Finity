import { CardLoadIcon, FinityIcon } from "@/assets";
import { formatDateTransaction } from "@/lib/date";
import { TouchableOpacity, View } from "react-native";
import { Typography } from "../common";

export const CardItem = ({ item }: { item: any }) => {
  return (
    <TouchableOpacity className="flex-1 flex-row justify-between items-start py-3 px-4 active:bg-subtitle rounded-lg">
      <View className="flex-1 flex-row items-start gap-4 min-h-[64px]">
        <View className="w-[40px] h-[40px] bg-[#F4F4F4] rounded-full justify-center items-center">
          {item?.type === "Card Load" ? <CardLoadIcon /> : <FinityIcon />}
        </View>
        <View>
          <Typography>{item.type}</Typography>
          <Typography
            textColor="#404040"
            weight="regular"
            style={{
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1
            }}
          >
            {!!item?.source
              ? item?.source
              : `£ ${Math.abs(item?.amount).toFixed(2)}`}
          </Typography>
          <Typography textColor="#737373" weight="regular">
            {formatDateTransaction(item?.date)}
          </Typography>
        </View>
      </View>
      <Typography
        textColor={item.amount > 0 ? "#00A464" : "#D9323D"}
        className="text-right flex-[0.2]"
      >
        {`${item?.amount > 0 ? "+" : "-"}${Math.abs(
          item?.amount
        ).toLocaleString()}`}
      </Typography>
    </TouchableOpacity>
  );
};
