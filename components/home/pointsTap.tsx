import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "../ui/text";
import { FlashList } from "@shopify/flash-list";
type Props = {};

const DATA = [
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  },
  {
    title: "First Item"
  },
  {
    title: "Second Item"
  }
];

function PointsTap({}: Props) {
  return (
    <View className="flex-1 bg-white">
      <FlashList
        // contentContainerStyle={{ flex: 1 }}
        data={DATA}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>;
        }}
        estimatedItemSize={50}
      />
    </View>
  );
}
export default PointsTap;
