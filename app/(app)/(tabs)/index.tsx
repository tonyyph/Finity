import CardBalanceCom from "@/components/home/card_balance";
import CardAndPointTab from "@/components/home/card_point_tab";
import { HomeHeader } from "@/components/home/header";
import PointsBalanceCom from "@/components/home/points_balance";
import RequestCardNotification from "@/components/home/request_card_noti";
import { useUserSettingsStore } from "@/stores";
import useHome from "@/stores/useHome";
import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";

function HomeScreen() {
  const { data, doRequest } = useHome();
  const { activeCard } = useUserSettingsStore();

  useEffect(() => {
    doRequest({});
  }, []);

  return (
    <View className="flex-1 bg-backgroundSubtle pt-4 gap-4">
      <HomeHeader
        haveNotification
        onNotification={() => console.log("Click Notification")}
      />
      <ScrollView className="flex-1">
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
        <View className="gap-2 mb-1">
          <CardBalanceCom value={0} />
          <PointsBalanceCom value={123890} />
        </View>
        <View className="mt-4" />
        <CardAndPointTab
          onLoadCard={() => {
            router.navigate({
              pathname: "/(app)/load_card"
            });
          }}
          onSendPoints={() => {
            router.navigate({
              pathname: "/(app)/send-card"
            });
          }}
        />
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
