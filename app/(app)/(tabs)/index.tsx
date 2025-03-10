import CardBalanceCom from "@/components/home/card_balance";
import CardAndPointTab from "@/components/home/card_point_tab";
import { HomeHeader } from "@/components/home/header";
import PointsBalanceCom from "@/components/home/points_balance";
import RequestCardNoti from "@/components/home/request_card_noti";
import { colors } from "@/constants/Colors";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

function home() {
  useEffect(() => {}, []);
  return (
    <View
      className="flex-1 bg-white pt-4 gap-4"
      style={{ backgroundColor: colors.backgroundSubtle }}
    >
      <HomeHeader haveNoti onNoti={() => console.log("Click Noti")} />
      <ScrollView className="flex-1">
        <RequestCardNoti
          onPress={() => {
            router.navigate({
              pathname: "/(request_card)",
            });
          }}
        />
        <View className="gap-2 mt-4">
          <CardBalanceCom value={0} />
          <PointsBalanceCom value={123890} />
        </View>
        <View className="mt-4" />
        <CardAndPointTab />
      </ScrollView>
    </View>
  );
}
export default home;
