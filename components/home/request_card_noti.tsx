import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { Text } from "../ui/text";
import Touch from "../ui/touch";
import Typography from "../common/text-typography";

type Props = {
  imageCard?: string;
  title?: string;
  subTitle?: string;
  textButtonLabel?: string;
  onPress?: (params?: any) => void;
  requested?: boolean;
};

function RequestCardNotification({
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
          <Typography weight="semibold" type="body-default">
            {title}
          </Typography>
          <Typography weight="regular" type="body-small">
            {subTitle}
          </Typography>
        </View>
        <Typography type="body-small" className="mt-2 self-start border-b">
          {requested ? "Activate card" : "Request card"}
        </Typography>
      </View>
    </Touch>
  );
}
export default RequestCardNotification;
