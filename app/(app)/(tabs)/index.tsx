import CardBalanceCom from "@/components/home/card_balance";
import CardAndPointTab from "@/components/home/card_point_tab";
import { HomeHeader } from "@/components/home/header";
import PointsBalanceCom from "@/components/home/points_balance";
import RequestCardNoti from "@/components/home/request_card_noti";
import { colors } from "@/constants/Colors";
import useHome from "@/stores/useHome";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

function HomeScreen() {
  const [requested, setRequested] = useState<boolean>(false);
  const { data, doRequest } = useHome();

  useEffect(() => {
    doRequest({});
  }, []);

  return (
    <View className="flex-1 bg-backgroundSubtle pt-4 gap-4">
      <HomeHeader haveNoti onNoti={() => console.log("Click Noti")} />
      <ScrollView className="flex-1">
        <RequestCardNoti
          onPress={() => {
            if (!requested) {
              router.navigate({
                pathname: "/request_card"
              });
              setRequested(true);
            } else {
              router.navigate({
                pathname: "/active_card"
              });
            }
          }}
          requested={requested}
        />
        <View className="gap-2 mt-4 mb-1">
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
          onSendPoints={() => {}}
        />
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
