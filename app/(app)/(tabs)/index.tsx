import { AlertIcon } from "@/assets";
import { toast } from "@/components/common/toast";
import { CardBalanceCom } from "@/components/home/card_balance";
import { CardButtonGroup } from "@/components/home/card_button";
import { CardAndPointTab } from "@/components/home/card_point_tab";
import { FrozenBanner } from "@/components/home/frozen_banner";
import { HomeHeader } from "@/components/home/header";
import { PointsBalanceCom } from "@/components/home/points_balance";
import { RequestCardNotification } from "@/components/home/request_card_noti";
import { useCardHolder } from "@/hooks/cardholders/useCardHolder";
import { useNotification } from "@/hooks/notifications/useNotification";
import { SCREEN_WIDTH } from "@/utils";
import { TopIndicatorAvoidingView } from "@/utils/spacing";
import * as Haptics from "expo-haptics";
import { router, useFocusEffect } from "expo-router";
import { isEmpty } from "lodash-es";
import { useCallback, useRef, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

function HomeScreen() {
  const { userData, handleFreezeCard, fetchCardHolderCurrent } =
    useCardHolder();
  const { notifications } = useNotification();
  const { cardholderId, cardStatus, hasIssuedCard } = userData || {};
  const toastShownRef = useRef(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchCardHolderCurrent();
    }, [])
  );

  async function handleShowToastError() {
    if (toastShownRef.current) return;

    toastShownRef.current = true;
    toast.error(
      hasIssuedCard
        ? `You must activate your new card before you can load it`
        : `You cannot load your card while it is frozen`,
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

  const onLoadCard = () => {
    Haptics.selectionAsync();
    if (cardStatus === 4 || cardStatus === 1) {
      router.navigate({ pathname: "/(app)/load-card" });
    } else {
      handleShowToastError();
    }
  };

  const onSendPoints = () => {
    if (cardStatus === 4 || cardStatus === 1) {
      router.navigate({ pathname: "/(app)/send-point" });
    } else {
      handleShowToastError();
    }
  };

  const onPressCard = () => {
    if (!cardholderId) {
      router.navigate({ pathname: "/request_card" });
    } else if (cardStatus === 0) {
      router.navigate({ pathname: "/active-card" });
    }
  };

  const handleToNotificationCenter = () => {
    router.navigate({ pathname: "/notification-center" });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCardHolderCurrent();
    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-backgroundSubtle">
      <TopIndicatorAvoidingView />

      <ScrollView
        className="bg-backgroundSubtle"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={"#FF885D"}
            onRefresh={onRefresh}
          />
        }
      >
        <HomeHeader
          haveNotification={notifications?.length > 0}
          onNotification={handleToNotificationCenter}
        />
        <View style={{ paddingBottom: 20 }}>
          {(!cardholderId || cardStatus === 0) && !isEmpty(userData) && (
            <RequestCardNotification
              onPress={onPressCard}
              requested={!cardholderId}
            />
          )}
          {cardStatus === 3 && !isEmpty(userData) && (
            <FrozenBanner onPress={handleFreezeCard} />
          )}
          <View className="gap-2 mb-1">
            <CardBalanceCom value={userData?.cardBalance ?? 0} />
            <PointsBalanceCom value={userData?.pointsBalance ?? 0} />
          </View>
          <View className="h-4" />
          <CardButtonGroup
            hasIssuedCard={hasIssuedCard}
            onLoadCard={onLoadCard}
            onSendPoints={onSendPoints}
          />
          <View className="h-2" key={"Transaction Bar"} />
          <View className="flex-1 opacity-100">
            <CardAndPointTab />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
