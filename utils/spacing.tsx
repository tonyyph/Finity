import { memoFC } from "@/utils";
import { Platform, StatusBar, View } from "react-native";
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

export const TopIndicatorAvoidingView = memoFC(() => {
  const { top } = useSafeAreaInsets();
  const STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? 0;
  return (
    <View
      style={[{ height: Platform.OS === "android" ? STATUS_BAR_HEIGHT : top }]}
    />
  );
});
