import { Image, View } from "react-native";
import { Typography } from "../common/text-typography";
import { Touch } from "../ui/touch";
import { FrozenCard } from "@/assets";

type Props = {
  title?: string;
  subTitle?: string;
  onPress?: (params?: any) => void;
};

function FrozenBanner({
  title = "Card is frozen",
  subTitle = "You cannot load your card while it is frozen.",
  onPress
}: Props) {
  return (
    <Touch
      onPress={onPress}
      className="mx-4 mb-4 rounded-xl p-3 flex-row bg-teal-200"
    >
      <Image source={FrozenCard} className="w-[64px] h-[100px]" />
      <View className="pl-4 gap-1 flex-auto">
        <View className="mr-4">
          <Typography weight="semibold" type="body-default">
            {title}
          </Typography>
          <Typography weight="regular" type="body-small">
            {subTitle}
          </Typography>
        </View>
        <Typography type="body-small" className="mt-2 self-start border-b">
          {"Unfreeze card"}
        </Typography>
      </View>
    </Touch>
  );
}
export default FrozenBanner;
