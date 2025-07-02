import { useUserProfile } from "@/hooks/profile/useUserProfile";
import { exactDesign } from "@/utils";
import { Image, View } from "react-native";
import { Typography } from "../common/text-typography";
import { Touch } from "../ui/touch";

type HomeHeaderProps = {
  haveNotification?: boolean;
  onNotification?: (params?: any) => void;
};

export function HomeHeader({
  haveNotification,
  onNotification
}: HomeHeaderProps) {
  const { userProfile } = useUserProfile();

  return (
    <View className="flex flex-row items-center justify-between gap-4 bg-backgroundSubtle px-4 pb-3">
      <View className="flex flex-1 flex-row items-center gap-3">
        <View className="flex-1 gap-1">
          <Typography weight="bold" type="heading-small" className="pt-4 pb-2">
            {`${`Hi`} ${userProfile?.firstName ? userProfile?.firstName : ""}!`}
          </Typography>
        </View>
      </View>
      <Touch onPress={onNotification} className="relative right-2">
        <Image
          source={require("@/assets/images/bellIcon.png")}
          style={{ width: exactDesign(28), height: exactDesign(28) }}
          resizeMode="contain"
        />
        {haveNotification && (
          <View className="rounded-full w-[10px] h-[10px] bg-[#FF885D] absolute right-0 top-[2px]" />
        )}
      </Touch>
    </View>
  );
}
