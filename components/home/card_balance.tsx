import { formatNumber } from "@/utils";
import { Image, View } from "react-native";
import Typography from "../common/text-typography";
import Touch from "../ui/touch";

type Props = {
  title?: string;
  value?: number | string;
  currency?: string;
  onTouch?: (params?: any) => void;
};

function CardBalanceCom({
  title = "Card balance",
  value = 0,
  currency = "£",
  onTouch
}: Props) {
  return (
    <Touch
      onPress={onTouch}
      className="flex-row bg-white ml-4 mr-4 p-4 border rounded-xl border-border justify-between"
    >
      <View className="gap-4">
        <Typography weight="medium" textColor="#404040" type="body-default">
          {title}
        </Typography>
        <Typography weight="medium" type="heading-medium">
          {`${currency}`}
          <Typography weight="semibold" type="heading-medium">
            {`${formatNumber({ value })}`}
          </Typography>
        </Typography>
      </View>
      <View className="items-start">
        <Image
          className="w-10 h-7"
          source={require(`@/assets/images/mastercard-icon.png`)}
        />
      </View>
    </Touch>
  );
}
export default CardBalanceCom;
