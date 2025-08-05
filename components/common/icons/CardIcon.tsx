import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const CardIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={32} height={32} fill="none" {...props}>
      <Path
        fill="#A3A3A3"
        fillRule="evenodd"
        d="M2.533 10.597c0-2.306 1.987-4.023 4.243-4.023h18.181c2.255 0 4.242 1.716 4.242 4.022v10.542c0 2.307-1.987 4.022-4.242 4.022H6.776c-2.256 0-4.242-1.717-4.242-4.023v-10.54Zm4.243-1.599c-1.092 0-1.819.8-1.819 1.6v.895h21.818v-.897c0-.798-.726-1.598-1.818-1.598H6.776Zm20 4.919H4.957v7.22c0 .799.726 1.599 1.818 1.599h18.181c1.093 0 1.819-.8 1.819-1.598v-7.221Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
