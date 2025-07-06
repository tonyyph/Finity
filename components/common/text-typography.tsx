import { cn } from "@/lib/utils";
import { exactDesign } from "@/utils";
import React, { ReactNode } from "react";
import {
  GestureResponderEvent,
  Text as RNText,
  StyleSheet,
  TextStyle
} from "react-native";

export type TextType =
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
  "heading-large": {
    fontSize: exactDesign(34),
    lineHeight: exactDesign(40),
    letterSpacing: 1
  },
  "heading-medium": {
    fontSize: exactDesign(28),
    lineHeight: exactDesign(34),
    letterSpacing: 1
  },
  "heading-small": {
    fontSize: exactDesign(24),
    lineHeight: exactDesign(30),
    letterSpacing: 1
  },
  "heading-extraSmall": {
    fontSize: exactDesign(20),
    lineHeight: exactDesign(26),
    letterSpacing: 1
  },
  "body-large": {
    fontSize: exactDesign(18),
    lineHeight: exactDesign(24),
    letterSpacing: 1
  },
  "body-default": {
    fontSize: exactDesign(16),
    lineHeight: exactDesign(22),
    letterSpacing: 1
  },
  "body-small": {
    fontSize: exactDesign(14),
    lineHeight: exactDesign(20),
    letterSpacing: 1
  },
  "body-extraSmall": {
    fontSize: exactDesign(12),
    lineHeight: exactDesign(18),
    letterSpacing: 1
  }
};

const FONT_WEIGHTS: Record<FontWeight, TextStyle["fontWeight"]> = {
  regular: "400",
  medium: "500",
  semibold: "700",
  bold: "700"
};

export const Typography: React.FC<TextProps> = ({
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
