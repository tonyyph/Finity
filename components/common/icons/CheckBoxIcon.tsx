import { memoFC } from "@/utils";
import Svg, { Path, SvgProps } from "react-native-svg";

export const CheckBoxIcon = memoFC(
  ({ size = 24, style, ...props }: SvgProps & IconProps = {}) => {
    return (
      <Svg width={24} height={24} fill="none" {...props} viewBox="0 0 24 24">
        <Path
          fill="#FF885D"
          d="M0 4a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z"
        />
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M18.361 7.44a1.5 1.5 0 0 1 0 2.12l-7.603 7.604a1.5 1.5 0 0 1-2.232-.123L5.63 13.42a1.5 1.5 0 1 1 2.342-1.874l1.85 2.312 6.418-6.419a1.5 1.5 0 0 1 2.122 0Z"
          clipRule="evenodd"
        />
      </Svg>
    );
  }
);
