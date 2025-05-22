import ProfileItem from "@/components/profile/profile-item";
import { ProgressBar } from "@/components/ui/progress";
import { useSettingProfile } from "@/hooks/profile/useSettingProfile";
import { formatDateString } from "@/lib/date";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";

export default function EditProfileScreen() {
  const { settingProfile: userProfile, loading } = useSettingProfile();

  const onPressEditMobileNumber = () => {
    router.push("/(app)/edit_phonenumber");
  };
  const onEditHomeAddress = () => {
    router.push("/(app)/edit_homeaddress");
  };

  return (
    <View className="flex-1 bg-background">
      <ProgressBar completeAnimation={!loading} />
      <ScrollView className="bg-background" contentContainerClassName="p-6">
        <ProfileItem
          title={"Full Name"}
          loading={loading}
          value={userProfile?.firstName + " " + userProfile?.lastName}
        />
        <ProfileItem
          title={"Email address"}
          loading={loading}
          value={userProfile?.email}
        />
        <ProfileItem
          title={"Phone number"}
          value={`+44 ${userProfile?.mobileNumber}`}
          loading={loading}
          onPress={onPressEditMobileNumber}
          canEdit={true}
        />
        <ProfileItem
          title={"Date of birth"}
          loading={loading}
          value={formatDateString(userProfile?.dateOfBirth)}
        />
        <ProfileItem
          title={"Home address"}
          loadingMultiple={loading}
          value={userProfile?.addressLine1}
          value0={userProfile?.addressLine2}
          value1={userProfile?.city}
          value2={userProfile?.postcode}
          onPress={onEditHomeAddress}
          canEdit={true}
        />

        <View className="mt-4" />
        <ProfileItem
          title={"Business name"}
          loading={loading}
          value={userProfile?.business?.name ?? "TOMATO LIMITED"}
          showDivider={false}
        />
      </ScrollView>
    </View>
  );
}
