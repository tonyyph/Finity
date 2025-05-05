/* eslint-disable react/display-name */
import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  type BottomSheetBackgroundProps,
  BottomSheetModal,
  type BottomSheetModalProps
} from "@gorhom/bottom-sheet";
import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { forwardRef, useCallback } from "react";
import { View } from "react-native";
import { FullWindowOverlay } from "react-native-screens";

export const BottomSheet = forwardRef<
  BottomSheetModalMethods,
  BottomSheetModalProps
>((props, ref) => {
  const backdropComponent = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        enableTouchThrough
      />
    ),
    []
  );

  const containerComponent = useCallback(
    (props: { children?: React.ReactNode }) => (
      <FullWindowOverlay>{props.children}</FullWindowOverlay>
    ),
    []
  );

  const backgroundComponent = useCallback(
    (props: BottomSheetBackgroundProps) => (
      <View
        className="overflow-hidden rounded-[16px] bg-background"
        {...props}
      />
    ),
    []
  );

  // 👇 This will remove the indicator completely
  const handleComponent = () => {
    return <View className="bg-white-200 overflow-hidden h-2 rounded-[16px]" />;
  };

  return (
    <BottomSheetModal
      ref={ref}
      handleComponent={handleComponent}
      backdropComponent={backdropComponent}
      containerComponent={containerComponent}
      backgroundComponent={backgroundComponent}
      keyboardBehavior="extend"
      enablePanDownToClose
      enableDismissOnClose
      {...props}
    />
  );
});
