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
  onPress,
}: Props) {
  return (
    <Touch
      onPress={onPress}
      className="mr-4 ml-4 rounded-xl p-4 flex-row"
      style={{ backgroundColor: "#B8E4E5" }}
    >
      <Image
        source={{
          uri:
            imageCard ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO7LvNClb9Hn8hvGPz4w69JCTauj8hM_tN0w&s",
        }}
        className="w-16 h-24"
      />
      <View className="pl-4 flex-auto justify-between">
        <View className="">
          <Text className="text-sm leading-5 font-bold color-black">
            {title}
          </Text>
          <Text className="text-bs leading-5">{subTitle}</Text>
        </View>
        <Text className="text-bs font-semibold underline">
          {requested ? "Activate card" : "Request card"}
        </Text>
      </View>
    </Touch>
  );
}
export default RequestCardNoti;
