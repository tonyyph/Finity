import { TouchableOpacity, View } from "react-native";
import { UserAvatar } from "../common/user-avatar";
import { userStore } from "@/stores/userStore";
import { useRouter } from "expo-router";
import Typography from "../common/text-typography";

export function ProfileCard() {
  const router = useRouter();
  const userProfile = userStore.getState().userProfile;

  return (
    <View className="p-4 bg-neutral-100 flex-row items-center justify-center overflow-hidden rounded-xl">
      {/* href="/category" */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/(app)/profile-edit")}
        className="flex flex-1 flex-row items-center justify-center gap-3"
      >
        <UserAvatar
          fullName={userProfile?.firstName + " " + userProfile?.lastName}
          fallbackClassName="bg-[#A3A3A3]"
          className="h-[56px] w-[56px]"
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
