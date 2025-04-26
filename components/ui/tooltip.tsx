import { colors } from "@/constants/Colors";
import { exactDesign } from "@/utils";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";
import Tooltips from "react-native-walkthrough-tooltip";
import { Text } from "./text";

type Props = {
  tootTipContent?: ReactNode;
  content?: string;
};

const Tooltip: React.FC<TouchableOpacityProps & Props> = (props) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  let timeout: any = null;

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout]);

  const handleToolTip = useCallback(() => {
    setShowTooltip(!showTooltip);
    if (!showTooltip) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeout = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }
  }, [showTooltip]);
  return (
    <Tooltips
      isVisible={showTooltip}
      content={
        props?.tootTipContent ? (
          <>{props.tootTipContent}</>
        ) : (
          <Text className="color-white text-bs">
            {props.content ?? "Check this out!"}
          </Text>
        )
      }
      backgroundColor="transparent"
      contentStyle={styles.tooltip}
      placement="bottom"
      onClose={() => {
        setShowTooltip(false);
      }}
    >
      <TouchableOpacity
        style={styles.container}
        {...props}
        onPress={handleToolTip}
        activeOpacity={1}
      >
        {props.children}
      </TouchableOpacity>
    </Tooltips>
  );
};
export default Tooltip;

const styles = StyleSheet.create({
  container: {},
  tooltip: {
    backgroundColor: colors.neutral,
    borderRadius: exactDesign(8)
  }
});
