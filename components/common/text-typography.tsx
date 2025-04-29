import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import {
  GestureResponderEvent,
  Text as RNText,
  StyleSheet,
  TextStyle
} from "react-native";

type TextType =
  | "heading-large"
  | "heading-medium"
  | "heading-small"
  | "heading-extraSmall"
  | "body-large"
  | "body-default"
  | "body-small"
  | "body-extraSmall";
type FontWeight = "regular" | "medium" | "semibold" | "bold";

interface TextProps {
  type?: TextType;
  weight?: FontWeight;
  children: ReactNode;
  textColor?: string;
  className?: string;
  style?: TextStyle;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const TEXT_STYLES: Record<TextType, TextStyle> = {
  "heading-large": { fontSize: 34, lineHeight: 40, letterSpacing: 1 },
  "heading-medium": { fontSize: 28, lineHeight: 34, letterSpacing: 1 },
  "heading-small": { fontSize: 24, lineHeight: 30, letterSpacing: 1 },
  "heading-extraSmall": { fontSize: 20, lineHeight: 26, letterSpacing: 1 },
  "body-large": { fontSize: 18, lineHeight: 24, letterSpacing: 1 },
  "body-default": { fontSize: 16, lineHeight: 22, letterSpacing: 1 },
  "body-small": { fontSize: 14, lineHeight: 20, letterSpacing: 1 },
  "body-extraSmall": { fontSize: 12, lineHeight: 18, letterSpacing: 1 }
};

const FONT_WEIGHTS: Record<FontWeight, TextStyle["fontWeight"]> = {
  regular: "400",
  medium: "500",
  semibold: "700",
  bold: "700"
};

const Typography: React.FC<TextProps> = ({
  type = "body-default",
  weight = "medium",
  children,
  textColor = "#0A0A0A",
  style,
  className,
  onPress
}) => {
  const textStyle = TEXT_STYLES[type] || TEXT_STYLES["body-default"];
  return (
    <RNText
      className={cn("font-['PP_Neue_Montreal']", className)}
      allowFontScaling
      style={[
        styles.text,
        {
          fontFamily: "PP Neue Montreal",
          fontSize: textStyle.fontSize,
          lineHeight: textStyle.lineHeight,
          letterSpacing: textStyle.letterSpacing,
          fontWeight: FONT_WEIGHTS[weight] || "400",
          color: textColor
        },
        style
      ]}
      onPress={onPress}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#0A0A0A"
  }
});

export default Typography;
