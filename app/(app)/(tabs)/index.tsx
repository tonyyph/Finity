import { AlertIcon } from "@/assets";
import { toast } from "@/components/common/toast";
import CardBalanceCom from "@/components/home/card_balance";
import CardButtonGroup from "@/components/home/card_button";
import CardAndPointTab from "@/components/home/card_point_tab";
import FrozenBanner from "@/components/home/frozen_banner";
import { HomeHeader } from "@/components/home/header";
import PointsBalanceCom from "@/components/home/points_balance";
import RequestCardNotification from "@/components/home/request_card_noti";
import { useCardHolder } from "@/hooks/cardholders/useCardHolder";
import { useUserSettingsStore } from "@/stores";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HomeScreen() {
  const { isFreezeCard, setIsFreezeCard } = useUserSettingsStore();
  const { top } = useSafeAreaInsets();

  const { userData } = useCardHolder();

  const { cardholderId, cardStatus } = userData || {};

  async function handleShowToastError() {
    toast.error(`You cannot load your card while it is frozen`, {
      icon: <AlertIcon />
    });
  }

  const onLoadCard = () => {
    if (isFreezeCard && (cardStatus === 4 || cardStatus === 1)) {
      router.navigate({
        pathname: "/(app)/load_card"
      });
    } else {
      handleShowToastError();
    }
  };

  const onSendPoints = () => {
    if (isFreezeCard && (cardStatus === 4 || cardStatus === 1)) {
      router.navigate({
        pathname: "/(app)/send-card"
      });
    } else {
      handleShowToastError();
    }
  };

  const onPressCard = () => {
    if (!cardholderId) {
      router.navigate({
        pathname: "/request_card"
      });
    } else {
      if (cardStatus === 0) {
        router.navigate({
          pathname: "/active_card"
        });
      }
    }
  };

  return (
    <View className="flex-1 bg-backgroundSubtle" style={{ paddingTop: top }}>
      <HomeHeader
        haveNotification
        onNotification={() => console.log("Click Notification")}
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {(!cardholderId || cardStatus === 0) && (
          <RequestCardNotification
            onPress={onPressCard}
            requested={!cardholderId}
          />
        )}
        {(cardStatus === 3 || !isFreezeCard) && (
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
