import CardBalanceCom from "@/components/home/card_balance";
import CardAndPointTab from "@/components/home/card_point_tab";
import { HomeHeader } from "@/components/home/header";
import PointsBalanceCom from "@/components/home/points_balance";
import RequestCardNotification from "@/components/home/request_card_noti";
import { useUserSettingsStore } from "@/stores";
import useHome from "@/stores/useHome";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HomeScreen() {
  const { data, doRequest } = useHome();
  const { activeCard } = useUserSettingsStore();
  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    doRequest({});
  }, []);

  return (
    <View className="flex-1 bg-backgroundSubtle" style={{ paddingTop: top }}>
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
          <PointsBalanceCom value={0} />
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
