import { AlertIcon } from "@/assets";
import { toast } from "@/components/common/toast";
import CardBalanceCom from "@/components/home/card_balance";
import CardButtonGroup from "@/components/home/card_button";
import CardAndPointTab from "@/components/home/card_point_tab";
import FrozenBanner from "@/components/home/frozen_banner";
import { HomeHeader } from "@/components/home/header";
import PointsBalanceCom from "@/components/home/points_balance";
import RequestCardNotification from "@/components/home/request_card_noti";
import { useCardHolderQuery } from "@/queries/cardholder";
import { useUserSettingsStore } from "@/stores";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HomeScreen() {
  const { activeCard, isFreezeCard, setIsFreezeCard } = useUserSettingsStore();
  const { top } = useSafeAreaInsets();
  const { data: userData } = useCardHolderQuery();

  async function handleShowToastError() {
    toast.error(`You cannot load your card while it is frozen`, {
      icon: <AlertIcon />
    });
  }

  const onLoadCard = () => {
    if (isFreezeCard && activeCard === 2) {
      router.navigate({
        pathname: "/(app)/load_card"
      });
    } else {
      handleShowToastError();
    }
  };

  const onSendPoints = () => {
    if (isFreezeCard && activeCard === 2) {
      router.navigate({
        pathname: "/(app)/send-card"
      });
    } else {
      handleShowToastError();
    }
  };

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
          <CardBalanceCom value={userData?.cardBalance ?? 0} />
          <PointsBalanceCom value={userData?.pointsBalance ?? 0} />
        </View>
        <View className="h-4" />
        <CardButtonGroup onLoadCard={onLoadCard} onSendPoints={onSendPoints} />
        <View className="h-2" key={"Transaction Bar"} />
        <CardAndPointTab />
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
