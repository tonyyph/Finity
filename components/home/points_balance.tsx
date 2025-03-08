import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "../ui/text";
import { exactDesign, formatNumber } from "@/utils";
import Touch from "../ui/touch";

import { colors } from "@/constants/Colors";
import Tooltip from "../ui/tooltip";

type Props = {
  title?: string;
  value?: number | string;
  currence?: string;
  onTouch?: (params?: any) => void;
};

function PointsBalanceCom({
  title = "Points balance",
  value = 0,
  currence = "£",
  onTouch
}: Props) {
  return (
    <Touch
      onPress={onTouch}
      className="flex-row ml-4 bg-white mr-4 p-6 border rounded-xl justify-between"
      style={styles.container}
    >
      <View className="gap-4">
        <Text className="relative justify-start text-neutral-700 text-base font-medium font-['PP_Neue_Montreal'] leading-snug tracking-wide">
          {title}
        </Text>
        <Text className="relative justify-center text-neutral-950 text-[28px] font-semibold font-['PP_Neue_Montreal'] leading-[34px] tracking-wide">
          {`${formatNumber({ value, decimalCount: 0 })}`}
        </Text>
      </View>
      <View className="items-start bottom-2">
        <Tooltip content="1 point = £0.1">
          <View
            className="rounded-full w-5 h-5 justify-center items-center"
            style={{ backgroundColor: colors.neutral }}
          >
            <Text className="color-white text-xs font-medium">i</Text>
          </View>
        </Tooltip>
      </View>
    </Touch>
  );
}
export default PointsBalanceCom;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.border2
  }
});
