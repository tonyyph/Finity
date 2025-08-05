import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const ArrowBackIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={32} height={32} fill="none" {...props}>
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M27.869 16a1.2 1.2 0 0 1-1.2 1.2H8.135l6.958 7.305a1.2 1.2 0 0 1-1.738 1.655l-8.889-9.333a1.2 1.2 0 0 1 0-1.655l8.89-9.333a1.2 1.2 0 0 1 1.737 1.655L8.135 14.8H26.67a1.2 1.2 0 0 1 1.2 1.2Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
