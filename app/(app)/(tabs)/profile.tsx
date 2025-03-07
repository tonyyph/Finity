import * as Application from "expo-application";
import * as Haptics from "expo-haptics";

import { FooterGradient } from "@/components/common/footer-gradient";
import { MenuItem } from "@/components/common/menu-item";
import { toast } from "@/components/common/toast";
import { ProfileCard } from "@/components/profile/profile-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useLocale } from "@/locales/provider";
import { useUserAuthenticateStore } from "@/stores";
import { useUserSettingsStore } from "@/stores/user-settings/store";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import * as Notifications from "expo-notifications";
import { Link } from "expo-router";
import {
  BellIcon,
  BookTypeIcon,
  ChevronRightIcon,
  EarthIcon,
  InboxIcon,
  LogOutIcon,
  MessageSquareQuoteIcon,
  ScrollTextIcon,
  ShapesIcon,
  Share2Icon,
  SwatchBookIcon
} from "lucide-react-native";
import {
  Image,
  Linking,
  ScrollView,
  Share,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { i18n } = useLingui();
  const { bottom } = useSafeAreaInsets();
  const { language } = useLocale();
  const { setEnabledPushNotifications, enabledPushNotifications } =
    useUserSettingsStore();
  const { isLoggedIn, setIsLoggedIn } = useUserAuthenticateStore();

  async function handleCopyVersion() {
    toast.success(`Copied version to clipboard`);
  }

  async function handleShare() {
    try {
      await Share.share({
        message: t(
          i18n
        )`Finity is a news aggregation app designed to provide users with diverse perspectives on current events, helping them see beyond their usual sources. By curating stories from various media outlets, Finity ensures balanced, unbiased news coverage. Whether you're interested in global affairs, technology, finance, or culture, the app delivers real-time updates and multiple viewpoints on each topic. Stay informed with Finity, where news meets perspective. Feel free to give it a try and let me know what you think. https://Finity.com`
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="py-4 gap-4"
        contentContainerStyle={{ paddingBottom: bottom + 80 }}
        className="bg-background"
      >
        <ProfileCard />
        <View className="mt-4 gap-2">
          <Text className="mx-6 text-muted-foreground">{`General`}</Text>
          <View>
            <Link href="/category" asChild>
              <MenuItem
                label={`Categories`}
                icon={ShapesIcon}
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link>
            <MenuItem
              label={`Magic inbox`}
              icon={InboxIcon}
              rightSection={
                <Badge variant="outline">
                  <Text className="text-xs">{`Coming soon`}</Text>
                </Badge>
              }
              disabled
            />
          </View>
        </View>
        <View className="gap-2">
          <Text className="mx-6 text-muted-foreground">{`App settings`}</Text>
          <View>
            <Link href="/appearance" asChild>
              <MenuItem
                label={`Appearance`}
                icon={SwatchBookIcon}
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link>
            <Link href="/language" asChild>
              <MenuItem
                label={`Language`}
                icon={EarthIcon}
                rightSection={
                  <View className="flex flex-row items-center gap-2">
                    <Text className="text-muted-foreground uppercase">
                      {`${language}`}
                    </Text>
                    <ChevronRightIcon className="h-5 w-5 text-foreground" />
                  </View>
                }
              />
            </Link>
            <MenuItem
              label={`Push notifications`}
              icon={BellIcon}
              disabled
              rightSection={
                <Switch
                  checked={enabledPushNotifications}
                  disabled
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
          </View>
        </View>
        <View className="gap-2">
          <Text className="mx-6 text-muted-foreground">{`Others`}</Text>
          <View>
            <Link href="/privacy-policy" asChild>
              <MenuItem
                label={`Privacy policy`}
                icon={ScrollTextIcon}
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link>
            <MenuItem
              label={`Terms of use`}
              icon={BookTypeIcon}
              rightSection={
                <ChevronRightIcon className="h-5 w-5 text-foreground" />
              }
              onPress={() =>
                Linking.openURL(
                  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                )
              }
            />
            <Link href="/feedback" asChild>
              <MenuItem
                label={`Send feedback`}
                icon={MessageSquareQuoteIcon}
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link>
            <MenuItem
              label={`Share with friends`}
              icon={Share2Icon}
              rightSection={
                <ChevronRightIcon className="h-5 w-5 text-foreground" />
              }
              onPress={handleShare}
            />
            <Button
              variant="ghost"
              onPress={() => {
                setIsLoggedIn(false);
              }}
              className="!px-6 justify-start gap-6"
            >
              <LogOutIcon className="h-5 w-5 text-red-500" />
              <Text className="font-regular text-red-500 group-active:text-red-500">
                {`Sign out`}
              </Text>
            </Button>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          className="items-center gap-3"
          onPressIn={Haptics.selectionAsync}
          onLongPress={handleCopyVersion}
        >
          <Image
            source={require("@/assets/images/appstore.png")}
            className="mx-auto h-16 w-16 rounded-full"
          />
          <Text className="text-muted-foreground text-sm">
            {`ver.`}
            {Application.nativeApplicationVersion}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <FooterGradient />
    </View>
  );
}
