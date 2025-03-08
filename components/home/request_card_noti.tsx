import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { Text } from "../ui/text";
import Touch from "../ui/touch";

type Props = {
  imageCard?: string;
  title?: string;
  subTitle?: string;
  textButtonLabel?: string;
  onPress?: (params?: any) => void;
  requested?: boolean;
};

function RequestCardNoti({
  imageCard,
  title = "Finity Rewards card",
  subTitle = "Convert points, start spending anywhere you like.",
  requested = false,
  onPress
}: Props) {
  return (
    <Touch
      onPress={onPress}
      className="mr-4 ml-4 rounded-xl p-4 flex-row"
      style={{ backgroundColor: "#B8E4E5" }}
    >
      <Image
        source={require("@/assets/images/card.png")}
        className="w-[64px] h-[100px]"
      />
      <View className="pl-4 flex-auto">
        <View className="">
          <Text className="text-neutral-950 text-lg font-semibold font-['PP Neue Montreal'] leading-[30px] tracking-wide">
            {title}
          </Text>
          <Text className="text-neutral-950 text-base font-regular font-['PP Neue Montreal']">
            {subTitle}
          </Text>
        </View>
        <Text className="text-base mt-2 font-semibold underline">
          {requested ? "Activate card" : "Request card"}
        </Text>
      </View>
    </Touch>
  );
}
export default RequestCardNoti;
