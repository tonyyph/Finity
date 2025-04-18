import { memoFC } from "@/utils";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

export const RadioSelectedIcon = memoFC(
  ({ size = 20, style, ...props }: SvgProps & IconProps = {}) => {
    return (
      <Svg width={20} height={20} fill="none" {...props} viewBox="0 0 20 20">
        <Path
          fill="#FF885D"
          d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10Z"
        />
        <Circle cx={10} cy={10} r={4} fill="#fff" />
      </Svg>
    );
  }
);
