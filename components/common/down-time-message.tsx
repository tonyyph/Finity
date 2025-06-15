import React, { useEffect, useState, forwardRef } from "react";
import { View } from "react-native";
import { Typography } from "./text-typography";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export const DowntimeMessage = forwardRef(
  (props, ref: React.ForwardedRef<BottomSheetModalMethods>) => {
    const [secondsLeft, setSecondsLeft] = useState(20); // initial downtime in seconds

    useEffect(() => {
      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            clearInterval(interval); // clear interval when time is up
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // update every second
      return () => clearInterval(interval); // cleanup interval on component unmount
    }, []);

    useEffect(() => {
      if (secondsLeft === 0) {
        (ref as React.RefObject<BottomSheetModalMethods>)?.current?.dismiss();
      }
    }, [secondsLeft, ref]);

    return (
      <View className="justify-center items-center bg-white">
        <Typography weight="regular" className="text-center">
          {secondsLeft} second(s)
        </Typography>
      </View>
    );
  }
);

DowntimeMessage.displayName = "DowntimeMessage";
