import Typography from "@/components/common/text-typography";
import { Separator } from "@/components/ui/separator";
import { useUserProfile } from "@/hooks/profile/useUserProfile";
import { formatDateString } from "@/lib/date";
import { router } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function EditProfileScreen() {
  const { userProfile } = useUserProfile();

  const onPressEditMobileNumber = () => {
    router.push("/(app)/edit_phonenumber");
  };
  const onEditHomeAddress = () => {
    router.push("/(auth)/access-denied");
  };

  const ProfileItem = ({
    title,
    value,
    value0,
    value1,
    value2,
    showDivider = true,
    canEdit = false,
    onPress
  }: {
    title: string;
    value: string;
    value0?: string;
    value1?: string;
    value2?: string;
    showDivider?: boolean;
    canEdit?: boolean;
    onPress?: () => void;
  }) => {
    return (
      <View key={title + value}>
        <View className="flex flex-1 flex-row items-center justify-between gap-3">
          <View className="gap-0.5">
            <Typography weight="regular" textColor="#404040">
              {title}
            </Typography>
            <Typography>{value}</Typography>
            {!!value0 && <Typography>{value0 ?? ""}</Typography>}
            {!!value1 && <Typography>{value1 ?? ""}</Typography>}
            {!!value2 && <Typography>{value2 ?? ""}</Typography>}
          </View>
          {canEdit && (
            <TouchableOpacity
              activeOpacity={0.5}
              className="rounded-full border border-border px-3 py-1.5"
              onPress={onPress}
            >
              <Typography>{`Edit`}</Typography>
            </TouchableOpacity>
          )}
        </View>
        {showDivider && <Separator className="mt-3 mb-4" />}
      </View>
    );
  };

  return (
    <ScrollView className="bg-background" contentContainerClassName="p-6">
      <ProfileItem
        title={"Full Name"}
        value={userProfile?.firstName + " " + userProfile?.lastName}
      />
      <ProfileItem title={"Email address"} value={userProfile?.email} />
      <ProfileItem
        title={"Phone number"}
        value={`+44 ${userProfile?.mobileNumber}`}
        onPress={onPressEditMobileNumber}
        canEdit={true}
      />
      <ProfileItem
        title={"Date of birth"}
        value={formatDateString(userProfile?.dateOfBirth)}
      />
      <ProfileItem
        title={"Home address"}
        value={userProfile?.address?.addressLine1}
        value0={userProfile?.address?.addressLine2}
        value1={userProfile?.address?.city}
        value2={userProfile?.address?.postCode}
        onPress={onEditHomeAddress}
        canEdit={true}
      />

      <View className="mt-4" />
      <ProfileItem
        title={"Business name"}
        value={userProfile?.business?.name ?? "TOMATO LIMITED"}
        showDivider={false}
      />
    </ScrollView>
  );
}
