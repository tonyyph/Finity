import { formatNumber } from "@/utils";
import { Image, View } from "react-native";
import Typography from "../common/text-typography";
import Tooltip from "../ui/tooltip";
import Touch from "../ui/touch";

type Props = {
  title?: string;
  value?: number | string;
  onTouch?: (params?: any) => void;
};

function PointsBalanceCom({
  title = "Points balance",
  value = 0,
  onTouch
}: Props) {
  return (
    <Touch
      onPress={onTouch}
      className="flex-row ml-4 bg-white mr-4 p-4 border-border border rounded-xl justify-between"
    >
      <View className="gap-4">
        <Typography weight="medium" textColor="#404040" type="body-default">
          {title}
        </Typography>

        <Typography weight="semibold" type="heading-medium">
          {`${formatNumber({ value, decimalCount: 0 })}`}
        </Typography>
      </View>
      <View className="items-start">
        <Tooltip content="1 point = £0.10">
          <Image
            source={require("@/assets/images/info-filled.png")}
            className="w-[24px] h-[24px]"
          />
        </Tooltip>
      </View>
    </Touch>
  );
}
export default PointsBalanceCom;
