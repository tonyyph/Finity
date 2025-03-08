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
  onTouch
}: Props) {
  return (
    <Touch
      onPress={onTouch}
      className="flex-row bg-white ml-4 mr-4 p-6 border rounded-xl justify-between"
      style={style.container}
    >
      <View className="gap-4">
        <Text className="relative justify-start text-neutral-700 text-base font-medium font-['PP_Neue_Montreal'] leading-snug tracking-wide">
          {title}
        </Text>
        <Text className="relative justify-center text-neutral-950 text-[28px] font-semibold font-['PP_Neue_Montreal'] leading-[34px] tracking-wide">
          <Text className="relative justify-center text-neutral-950 text-[28px] font-semibold font-['PP_Neue_Montreal'] leading-[34px] tracking-wide">{`${currence}`}</Text>
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
    borderColor: "#E5E5E5"
  }
});
