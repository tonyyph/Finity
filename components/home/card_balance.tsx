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
};

function CardBalanceCom({
  title = "Card balance",
  value = 0,
  currence = "£",
  onTouch,
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
          <Text
            style={{
              fontSize: exactDesign(24),
              fontWeight: "500",
              fontFamily: "PP Neue Montreal",
            }}
          >{`${currence}`}</Text>
          {`${formatNumber({ value })}`}
        </Text>
      </View>
      <View className="items-start bottom-2">
        <Image
          className="w-10 h-7"
          source={require(`@/assets/images/mastercard-icon.png`)}
        />
      </View>
    </Touch>
  );
}
export default CardBalanceCom;

const style = StyleSheet.create({
  container: {
    borderColor: "#E5E5E5",
  },
});
