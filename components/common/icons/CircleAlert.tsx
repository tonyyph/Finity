import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { memoFC } from "@/utils";
import { useColorPalette } from "@/hooks/use-color-palette";

export const CircleAlert = memoFC(
  ({ size = 24, style, ...props }: SvgProps & IconProps = {}) => {
    const { getColor } = useColorPalette();

    const iconFill = getColor("--primary");
    return (
      <View style={[{ width: size, height: size }, style]}>
        <Svg width={16} height={16} fill="none" {...props}>
          <Path
            fill="#D9323D"
            d="M15.333 8A7.333 7.333 0 1 1 .667 8a7.333 7.333 0 0 1 14.666 0Z"
          />
          <Path
            fill="#fff"
            fillRule="evenodd"
            d="M8 3.333a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Z"
            clipRule="evenodd"
          />
          <Path
            fill="#fff"
            d="M9.333 11.666a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0Z"
          />
        </Svg>
      </View>
    );
  }
);
