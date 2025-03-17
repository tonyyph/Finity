import { formatNumber } from "@/utils";
import { View } from "react-native";
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
      <View className="items-start bottom-2">
        <Tooltip content="1 point = £0.10">
          <View className="rounded-full w-5 h-5 justify-center bg-neutral items-center">
            <Typography
              weight="medium"
              textColor="white"
              type="body-extraSmall"
              className="text-center"
            >
              i
            </Typography>
          </View>
        </Tooltip>
      </View>
    </Touch>
  );
}
export default PointsBalanceCom;
