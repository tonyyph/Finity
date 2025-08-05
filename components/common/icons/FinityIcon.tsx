import { FC } from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";
export const FinityIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={20} height={20} fill="none" {...props}>
      <G fill="#000" clipPath="url(#a)">
        <Path d="M3.75 10a6.94 6.94 0 0 0 1.792 4.657V5.342A6.939 6.939 0 0 0 3.75 9.999ZM5.542 10.007a7.036 7.036 0 0 0 3.57 6.12V3.871a7.091 7.091 0 0 0-3.57 6.136Z" />
        <Path d="M9.111 10.007c0 3.91 3.193 7.076 7.139 7.076V2.916c-3.93 0-7.139 3.18-7.139 7.09Z" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M2.5 2.5h15v15h-15z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
