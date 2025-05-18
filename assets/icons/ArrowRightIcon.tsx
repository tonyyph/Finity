import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const ArrowRightIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M17.148 12a.9.9 0 0 1-.263.636l-7.5 7.5a.9.9 0 1 1-1.273-1.273L14.976 12 8.112 5.136a.9.9 0 0 1 1.273-1.273l7.5 7.5a.9.9 0 0 1 .263.637Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
