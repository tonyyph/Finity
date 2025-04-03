import { TouchableOpacity, View } from "react-native";
import { UserAvatar } from "../common/user-avatar";
import { userStore } from "@/stores/userStore";
import { useRouter } from "expo-router";
import Typography from "../common/text-typography";
import { useUser } from "@clerk/clerk-expo";

export function ProfileCard() {
  const router = useRouter();
  const userProfile = userStore.getState().userProfile;
  const { user } = useUser();

  return (
    <View className="p-4 bg-neutral-100 flex-row items-center justify-center overflow-hidden rounded-xl">
      {/* href="/category" */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/(app)/profile-edit")}
        className="flex flex-1 flex-row items-center justify-center gap-3"
      >
        <UserAvatar
          user={user!}
          fallbackClassName="bg-background"
          className="h-16 w-16"
        />
        <View className="flex-1 justify-center gap-[2px]">
          <Typography type="body-large">
            {userProfile?.firstName + " " + userProfile?.lastName}
          </Typography>
          <Typography weight="regular" textColor="#737373">
            {userProfile?.email}
          </Typography>
        </View>
      </TouchableOpacity>
    </View>
  );
}
