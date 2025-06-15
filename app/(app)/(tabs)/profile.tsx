import {
  AlertIcon,
  ArrowRightIcon,
  BellIcon,
  CashOutIcon,
  HelpIcon,
  LogoMark,
  LogOutIcon,
  OneUserIcon,
  OurAgreementIcon,
  ProtectIcon,
  TermIcon
} from "@/assets";
import { BottomSheet, MenuItem, toast, Typography } from "@/components/common";
import { ProfileCard } from "@/components/profile/profile-card";
import { SetLocalAuth } from "@/components/profile/set-local-auth";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useUserSettingsStore } from "@/stores/user-settings/store";
import { SCREEN_WIDTH } from "@/utils";
import { TopIndicatorAvoidingView } from "@/utils/spacing";
import { useAuth } from "@clerk/clerk-expo";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import * as Application from "expo-application";
import * as Notifications from "expo-notifications";
import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const sheetRef = useRef<BottomSheetModal>(null);
  const sheetSignOutRef = useRef<BottomSheetModal>(null);
  const toastShownRef = useRef(false);

  const { setEnabledPushNotifications, enabledPushNotifications } =
    useUserSettingsStore();

  async function handleCopyVersion() {
    if (toastShownRef.current) return;

    toastShownRef.current = true;
    toast.success(
      `Copied version to clipboard ${Application.nativeApplicationVersion}`,
      {
        icon: <AlertIcon />,
        duration: 3000,
        width: SCREEN_WIDTH - 28
      }
    );
    setTimeout(() => {
      toastShownRef.current = false;
    }, 3000);
  }

  async function handleLogout() {
    await signOut();
    sheetSignOutRef.current?.close();
  }

  const handleToHelpCentre = () => {
    router.push({
      pathname: "/web_view",
      params: {
        title: "Help centre",
        webLink: "https://support.finity.co.uk/en/"
      }
    });
  };

  return (
    <View className="flex-1 bg-background">
      <TopIndicatorAvoidingView />
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
              icon={OneUserIcon}
              rightSection={<ArrowRightIcon />}
            />
          </Link>
          <View className="h-[1px] bg-[#E5E5E5] mt-2" />
        </View>
        <View className="gap-2">
          <MenuItem
            label={`Statements`}
            icon={TermIcon}
            onPress={() => {
              sheetRef?.current?.present();
            }}
            rightSection={<ArrowRightIcon />}
          />
          <Link href="/pin-current" asChild>
            <MenuItem
              label={`Change PIN`}
              icon={ProtectIcon}
              rightSection={<ArrowRightIcon />}
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
                      if (toastShownRef.current) return;

                      toastShownRef.current = true;
                      toast.error(`Push notifications are not enabled`, {
                        icon: <AlertIcon />,
                        duration: 3000,
                        width: SCREEN_WIDTH - 28
                      });
                      setTimeout(() => {
                        toastShownRef.current = false;
                      }, 3000);
                      setEnabledPushNotifications(false);
                      return;
                    }
                    if (toastShownRef.current) return;

                    toastShownRef.current = true;
                    toast.error(`Push notifications are enabled`, {
                      icon: <AlertIcon />,
                      duration: 3000,
                      width: SCREEN_WIDTH - 28
                    });
                    setTimeout(() => {
                      toastShownRef.current = false;
                    }, 3000);
                  } else {
                    if (toastShownRef.current) return;

                    toastShownRef.current = true;
                    toast.error(`Push notifications are disabled`, {
                      icon: <AlertIcon />,
                      duration: 3000,
                      width: SCREEN_WIDTH - 28
                    });
                    setTimeout(() => {
                      toastShownRef.current = false;
                    }, 3000);
                  }
                  setEnabledPushNotifications(checked);
                }}
              />
            }
          />
          <View className="h-[1px] bg-[#E5E5E5] mt-2" />
        </View>
        <View className="gap-2">
          <Link href="/cash_out_point" asChild>
            <MenuItem
              label={`Cash out points`}
              icon={CashOutIcon}
              rightSection={<ArrowRightIcon />}
            />
          </Link>
          <MenuItem
            label={`Help centre`}
            icon={HelpIcon}
            onPress={handleToHelpCentre}
            rightSection={<ArrowRightIcon />}
          />
          <MenuItem
            label={`Our agreements`}
            icon={OurAgreementIcon}
            rightSection={<ArrowRightIcon />}
            onPress={() => {
              router.push({
                pathname: "/our_agreement"
              });
            }}
          />
          <MenuItem
            label={`Sign out`}
            icon={LogOutIcon}
            onPress={() => {
              sheetSignOutRef.current?.present();
            }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          className="items-center gap-3"
          onLongPress={handleCopyVersion}
        >
          <Image source={LogoMark} className="mx-auto h-16 w-16 rounded-full" />
          <Text className="text-muted-foreground text-sm">
            {`App version - `}
            {Application.nativeApplicationVersion}
            {` - will be remove soon`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomSheet ref={sheetSignOutRef} index={0} enableDynamicSizing>
        <BottomSheetView>
          <View className="p-4">
            <View className="items-center mb-5 px-6 pb-4">
              <LottieView
                style={{ width: 120, height: 120 }}
                source={require("@/assets/json/logout.json")}
                autoPlay
                loop
              />
              <Typography type="heading-small" weight="semibold">
                Ready to Leave?
              </Typography>
              <Typography
                textColor="#404040"
                weight="regular"
                className="text-center mt-4"
              >
                Are you sure you want to log out? You will need to log in again
                to access your account.
              </Typography>
            </View>
            <Button
              variant="default"
              size={"lg"}
              className="rounded-full bg-primary h-[48px] my-4"
              onPress={handleLogout}
            >
              <Typography type="body-default" weight="medium" textColor="white">
                {`Logout`}
              </Typography>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet ref={sheetRef} index={0} snapPoints={["30%"]}>
        <BottomSheetView className="min-h-[50%] mt-1">
          <Header
            title="Statements"
            spacing={false}
            onRightFunction={() => {
              sheetRef.current?.close();
            }}
          />
          <View className="p-4 my-3">
            <MenuItem
              label={`Card statements`}
              onPress={() => {
                sheetRef.current?.close();
                router.push({
                  pathname: "/statements",
                  params: { title: "Card statements", type: "card" }
                });
              }}
              className="py-3"
            />
            <Separator className="my-3" />

            <MenuItem
              label={`Point statements`}
              onPress={() => {
                sheetRef.current?.close();
                router.push({
                  pathname: "/statements",
                  params: { title: "Point statements", type: "points" }
                });
              }}
              className="py-3"
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
