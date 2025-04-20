import { AlertIcon } from "@/assets";
import Typography from "@/components/common/text-typography";
import { toast } from "@/components/common/toast";
import CardBalanceCom from "@/components/home/card_balance";
import CardAndPointTab from "@/components/home/card_point_tab";
import FrozenBanner from "@/components/home/frozen_banner";
import { HomeHeader } from "@/components/home/header";
import PointsBalanceCom from "@/components/home/points_balance";
import RequestCardNotification from "@/components/home/request_card_noti";
import { useUserProfile } from "@/hooks/profile/useUserProfile";
import { useUserQuery } from "@/queries/user";
import { useUserSettingsStore } from "@/stores";
import useHome from "@/stores/useHome";
import { router } from "expo-router";
import { CircleAlertIcon, StarIcon, XIcon } from "lucide-react-native";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HomeScreen() {
  const { activeCard, isFreezeCard, setIsFreezeCard } = useUserSettingsStore();
  const { top, bottom } = useSafeAreaInsets();

  async function handleShowToastError() {
    toast.error(`You cannot load your card while it is frozen`, {
      icon: <AlertIcon />
    });
  }

  return (
    <View className="flex-1 bg-backgroundSubtle" style={{ paddingTop: top }}>
      <HomeHeader
        haveNotification
        onNotification={() => console.log("Click Notification")}
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {activeCard !== 2 && (
          <RequestCardNotification
            onPress={() => {
              if (activeCard === 0) {
                router.navigate({
                  pathname: "/request_card"
                });
              } else {
                router.navigate({
                  pathname: "/active_card"
                });
              }
            }}
            requested={activeCard === 0}
          />
        )}
        {activeCard === 2 && !isFreezeCard && (
          <FrozenBanner onPress={() => setIsFreezeCard(true)} />
        )}
        <View className="gap-2 mb-1">
          <CardBalanceCom value={0} />
          <PointsBalanceCom value={0} />
        </View>
        <View className="mt-4" />
        <CardAndPointTab
          onLoadCard={() => {
            if (isFreezeCard && activeCard === 2) {
              router.navigate({
                pathname: "/(app)/load_card"
              });
            } else {
              handleShowToastError();
            }
          }}
          onSendPoints={() => {
            if (isFreezeCard && activeCard === 2) {
              router.navigate({
                pathname: "/(app)/send-card"
              });
            } else {
              handleShowToastError();
            }
          }}
        />
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
