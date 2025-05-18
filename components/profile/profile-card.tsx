import { userStore } from "@/stores/userStore";
import { useUser } from "@clerk/clerk-expo";
import { View } from "react-native";
import Typography from "../common/text-typography";
import { UserAvatar } from "../common/user-avatar";

export function ProfileCard() {
  const userProfile = userStore.getState().userProfile;
  const { user } = useUser();

  return (
    <View className="p-4 bg-neutral-100 flex-row items-center justify-center overflow-hidden rounded-xl">
      <View className="flex flex-1 flex-row items-center justify-center gap-3">
        <UserAvatar
          user={user!}
          fullName={userProfile?.firstName + " " + userProfile?.lastName}
        />
        <View className="flex-1 justify-center gap-[2px]">
          <Typography type="body-large">
            {userProfile?.firstName + " " + userProfile?.lastName}
          </Typography>
          <Typography weight="regular" textColor="#737373">
            {userProfile?.email}
          </Typography>
        </View>
      </View>
    </View>
  );
}
