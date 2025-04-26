import { useUserProfile } from "@/hooks/profile/useUserProfile";
import { exactDesign } from "@/utils";
import { useUser } from "@clerk/clerk-expo";
import { Image, View } from "react-native";
import Typography from "../common/text-typography";
import Touch from "../ui/touch";

type HomeHeaderProps = {
  haveNotification?: boolean;
  onNotification?: (params?: any) => void;
};

export function HomeHeader({
  haveNotification,
  onNotification
}: HomeHeaderProps) {
  const { user } = useUser();
  const { userProfile } = useUserProfile();

  return (
    <View className="flex flex-row items-center justify-between gap-4 bg-backgroundSubtle px-4 pb-3">
      <View className="flex flex-1 flex-row items-center gap-3">
        <View className="flex-1 gap-1">
          <Typography
            weight="semibold"
            type="heading-small"
            className="pt-4 pb-2"
          >
            {`${`Hi`}, ${
              userProfile?.firstName && userProfile?.lastName
                ? userProfile.firstName + " " + userProfile.lastName
                : user?.fullName ??
                  user?.publicMetadata?.invitee_first_name ??
                  user?.primaryEmailAddress?.emailAddress ??
                  ""
            }`}
          </Typography>
        </View>
      </View>
      <Touch onPress={onNotification} className="relative right-2">
        <Image
          source={require("@/assets/images/bellIcon.png")}
          style={{ width: exactDesign(32), height: exactDesign(32) }}
          resizeMode="contain"
        />
        {haveNotification && (
          <View className="rounded-full w-[9px] h-[9px] bg-orange-400 absolute right-1 top-1" />
        )}
      </Touch>
    </View>
  );
}
