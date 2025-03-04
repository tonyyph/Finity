import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "../ui/text";
import { exactDesign, formatNumber } from "@/utils";
import Touch from "../ui/touch";

type Props = {
  title?: string;
  value?: number | string;
  currence?: string;
  onTouch?: (params?: any) => void;
  onTouchInfo?: (params?: any) => void;
};

function PointsBalanceCom({
  title = "Card balance",
  value = 0,
  currence = "£",
  onTouch,
  onTouchInfo,
}: Props) {
  return (
    <Touch
      onPress={onTouch}
      className="flex-row ml-4 mr-4 p-6 border rounded-xl justify-between"
      style={style.container}
    >
      <View className="gap-4">
        <Text className="text-sm font-medium">{title}</Text>
        <Text
          style={{
            fontSize: exactDesign(24),
            fontWeight: "bold",
            fontFamily: "PP Neue Montreal",
          }}
        >
          {`${formatNumber({ value, decimalCount: 0 })}`}
        </Text>
      </View>
      <View className="items-start bottom-2">
        <Touch
          onPress={onTouchInfo}
          className="rounded-full w-5 h-5 justify-center items-center"
          style={{ backgroundColor: "#525252" }}
        >
          <Text className="color-white text-xs font-medium">i</Text>
        </Touch>
      </View>
    </Touch>
  );
}
export default PointsBalanceCom;

const style = StyleSheet.create({
  container: {
    borderColor: "#E5E5E5",
  },
});
