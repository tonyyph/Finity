import Header from "@/components/ui/header";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

function review_load_card_transaction() {
  useEffect(() => {}, []);
  return (
    <View className="flex-1 bg-white">
      <StatusBar backgroundColor={"white"} />
      <SafeAreaView className="flex-1">
        <Header onBack={router.back} title="Review transactions" />
        <View className="flex-1 bg-white">{/* load_card detail */}</View>
      </SafeAreaView>
    </View>
  );
}
export default review_load_card_transaction;
