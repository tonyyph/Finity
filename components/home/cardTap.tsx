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
          return <Text>{item?.title}</Text>;
        }}
        estimatedItemSize={50}
        ListEmptyComponent={() => {
          return (
            <View className="pt-4 justify-center items-center">
              <Text
                className="text-sm font-normal"
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
