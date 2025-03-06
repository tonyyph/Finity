import React, {
  ReactDOM,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Tooltips from "react-native-walkthrough-tooltip";
import { Text } from "./text";
import { colors } from "@/constants/Colors";
import { exactDesign } from "@/utils";

type Props = {
  tootTipContent?: ReactNode;
  content?: string;
};

const Tooltip: React.FC<TouchableOpacityProps & Props> = (props) => {
  const [showtoolTip, setShowTooltip] = useState<boolean>(false);
  let timeout: any = null;

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const handleToolTip = useCallback(() => {
    setShowTooltip(!showtoolTip);
    if (!showtoolTip) {
      timeout = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }
  }, [showtoolTip]);
  return (
    <Tooltips
      isVisible={showtoolTip}
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
    borderRadius: exactDesign(8),
  },
});
