import { Image, View } from "react-native";
import { Typography } from "../common/text-typography";
import { Touch } from "../ui/touch";

type Props = {
  title?: string;
  subTitle?: string;
  textButtonLabel?: string;
  onPress?: (params?: any) => void;
  requested?: boolean;
};

function RequestCardNotification({
  title = "Finity Rewards card",
  subTitle = "Convert points, start spending anywhere you like.",
  requested = false,
  onPress
}: Props) {
  return (
    <Touch
      onPress={onPress}
      className="mx-4 mb-4 rounded-xl p-3 flex-row bg-teal-200"
    >
      <Image
        source={require("@/assets/images/card.png")}
        className="w-[64px] h-[100px]"
      />
      <View className="pl-4 gap-1 flex-auto">
        <View>
          <Typography weight="semibold" type="body-default">
            {title}
          </Typography>
          <Typography weight="regular" type="body-small">
            {subTitle}
          </Typography>
        </View>
        <Typography type="body-small" className="mt-2 self-start border-b">
          {requested ? "Request card" : "Activate card"}
        </Typography>
      </View>
    </Touch>
  );
}
export default RequestCardNotification;
