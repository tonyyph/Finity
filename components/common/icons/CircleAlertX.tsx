import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { memoFC } from "@/utils";
import { useColorPalette } from "@/hooks/use-color-palette";

export const CircleAlertX = memoFC(
  ({ size = 24, style, ...props }: SvgProps & IconProps = {}) => {
    const { getColor } = useColorPalette();

    const iconFill = getColor("--primary");
    return (
      <Svg width={80} height={80} fill="none" {...props}>
        <Path
          fill="#D9323D"
          d="M69.333 40C69.333 56.2 56.2 69.332 40 69.332S10.666 56.2 10.666 39.999C10.666 23.8 23.8 10.666 40 10.666c16.2 0 29.333 13.133 29.333 29.333Z"
        />
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M26.505 26.504a4 4 0 0 1 5.657 0L40 34.342l7.838-7.838a4 4 0 1 1 5.657 5.657L45.657 40l7.838 7.839a4 4 0 1 1-5.657 5.656L40 45.656l-7.838 7.838a4 4 0 0 1-5.657-5.656l7.838-7.839-7.838-7.838a4 4 0 0 1 0-5.657Z"
          clipRule="evenodd"
        />
      </Svg>
    );
  }
);
