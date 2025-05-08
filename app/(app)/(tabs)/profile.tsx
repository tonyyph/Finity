import { MenuItem } from "@/components/common/menu-item";
import Typography from "@/components/common/text-typography";
import { toast } from "@/components/common/toast";
import { ProfileCard } from "@/components/profile/profile-card";
import { SetLocalAuth } from "@/components/profile/set-local-auth";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useUserSettingsStore } from "@/stores/user-settings/store";
import { resetAllStorage } from "@/utils";
import { useAuth } from "@clerk/clerk-expo";
import * as Application from "expo-application";
import * as Notifications from "expo-notifications";
import { Link } from "expo-router";
import {
  BadgePoundSterlingIcon,
  BellIcon,
  ChevronRightIcon,
  CircleHelpIcon,
  FileLock2Icon,
  FileTextIcon,
  LogOutIcon,
  Share2Icon,
  ShieldCheckIcon,
  UserIcon
} from "lucide-react-native";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  Share,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { top } = useSafeAreaInsets();
  const { setEnabledPushNotifications, enabledPushNotifications } =
    useUserSettingsStore();

  async function handleCopyVersion() {
    toast.success(
      `Copied version to clipboard ${Application.nativeApplicationVersion}`
    );
  }

  async function handleShare() {
    try {
      await Share.share({
        title: "The simple and rewarding way to pay temp workers",
        url: "https://www.finity.co.uk/",
        message: `The simple and rewarding way to pay temp workers \nEverything you need to run the recruitment back office with speed, ease, and accuracy. Plus, earn rewards for every time sheet and payslip you process.`
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: top }}>
      <Typography type="heading-small" weight="semibold" className="p-4">
        {"Profile"}
      </Typography>
      <ScrollView
        contentContainerClassName="pb-4 px-4 gap-4"
        className="bg-background"
      >
        <ProfileCard />
        <View className="gap-2">
          <Link href="/profile-edit" asChild>
            <MenuItem
              label={`Personal information`}
              icon={UserIcon}
              rightSection={
                <ChevronRightIcon className="h-[24px] w-[24px] text-primary" />
              }
            />
          </Link>
          <View className="h-[1px] bg-[#E5E5E5] mt-2" />
        </View>
        <View className="gap-2">
          <Link href="/appearance" asChild>
            <MenuItem
              label={`Statements`}
              icon={FileTextIcon}
              rightSection={
                <ChevronRightIcon className="h-[24px] w-[24px] text-primary" />
              }
            />
          </Link>
          <Link href="/language" asChild>
            <MenuItem
              label={`Change PIN`}
              icon={ShieldCheckIcon}
              rightSection={
                <ChevronRightIcon className="h-[24px] w-[24px] text-primary" />
              }
            />
          </Link>
          {/* Biometrics enabled ?? */}
          <SetLocalAuth />

          <MenuItem
            label={`Push notification`}
            subLabel="Notification for points received"
            icon={BellIcon}
            rightSection={
              <Switch
                checked={enabledPushNotifications}
                onCheckedChange={async (checked) => {
                  if (checked) {
                    const { status: existingStatus } =
                      await Notifications.getPermissionsAsync();
                    let finalStatus = existingStatus;
                    if (existingStatus !== "granted") {
                      const { status } =
                        await Notifications.requestPermissionsAsync();
                      finalStatus = status;
                    }
                    if (finalStatus !== "granted") {
                      toast.error(`Push notifications are not enabled`);
                      setEnabledPushNotifications(false);
                      return;
                    }
                    toast.success(`Push notifications are enabled`);
                  } else {
                    toast.success(`Push notifications are disabled`);
                  }
                  setEnabledPushNotifications(checked);
                }}
              />
            }
          />
          <View className="h-[1px] bg-[#E5E5E5] mt-2" />
        </View>
        <View className="gap-2">
          <Link href="/feedback" asChild>
            <MenuItem
              label={`Cash out points`}
              icon={BadgePoundSterlingIcon}
              rightSection={
                <ChevronRightIcon className="h-[24px] w-[24px] text-primary" />
              }
            />
          </Link>
          <Link href="/privacy-policy" asChild>
            <MenuItem
              label={`Help centre`}
              icon={CircleHelpIcon}
              rightSection={
                <ChevronRightIcon className="h-[24px] w-[24px] text-primary" />
              }
            />
          </Link>
          <MenuItem
            label={`Our agreements`}
            icon={FileLock2Icon}
            rightSection={
              <ChevronRightIcon className="h-[24px] w-[24px] text-primary" />
            }
            onPress={() =>
              Linking.openURL(
                "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              )
            }
          />
          <MenuItem
            label={`Share with friends`}
            icon={Share2Icon}
            rightSection={
              <ChevronRightIcon className="h-[24px] w-[24px] text-primary" />
            }
            onPress={handleShare}
          />
          <MenuItem
            label={`Sign out`}
            icon={LogOutIcon}
            onPress={() => {
              Alert.alert(`Are you sure you want to sign out?`, "", [
                {
                  text: `Cancel`,
                  style: "cancel"
                },
                {
                  text: `Sign out`,
                  style: "destructive",
                  onPress: async () => {
                    await signOut();
                    resetAllStorage();
                  }
                }
              ]);
            }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          className="items-center gap-3"
          onLongPress={handleCopyVersion}
        >
          <Image
            source={require("@/assets/images/appstore-dev.png")}
            className="mx-auto h-16 w-16 rounded-full"
          />
          <Text className="text-muted-foreground text-sm">
            {`ver.`}
            {Application.nativeApplicationVersion}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
