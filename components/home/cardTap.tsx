import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "../ui/text";
import { FlashList } from "@shopify/flash-list";
import { colors } from "@/constants/Colors";

const DATA = null;

function CardTab() {
  useEffect(() => {}, []);
  return (
    <View className="flex-1 bg-white ">
      <FlashList
        data={DATA}
        renderItem={({ item }) => {
          return (
            <Text className="relative justify-center text-neutral-950 text-base font-semibold font-['PP_Neue_Montreal'] leading-snug tracking-wide">
              {"TEST"}
            </Text>
          );
        }}
        estimatedItemSize={50}
        ListEmptyComponent={() => {
          return (
            <View className="pt-4 justify-center items-center">
              <Text
                className="relative text-center justify-start text-neutral-500 text-base font-normal font-['PP_Neue_Montreal'] leading-snug tracking-wide"
                style={{ color: colors.tertiary }}
              >
                No transactions yet.
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
export default CardTab;
