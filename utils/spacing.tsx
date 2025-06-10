import { useAnimatedKeyboard } from "@/hooks";
import { cn } from "@/lib/utils";
import { memoFC } from "@/utils";
import { Platform, StatusBar, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  number?: number;
};

export const BottomIndicatorAvoidingView = memoFC(({ number = 1 }: Props) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        { height: Platform.OS === "ios" ? bottom * number : 24 * number }
      ]}
    />
  );
});

export const TopIndicatorAvoidingView = memoFC(({ number = 1 }) => {
  const { top } = useSafeAreaInsets();
  const STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? 0;

  return (
    <View
      style={[
        {
          height:
            Platform.OS === "android"
              ? STATUS_BAR_HEIGHT * number
              : top * number
        }
      ]}
    />
  );
});
