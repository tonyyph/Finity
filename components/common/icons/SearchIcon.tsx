import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const SearchIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        fill="#525252"
        fillRule="evenodd"
        d="M11.468 4.9a6.567 6.567 0 1 0 4.594 11.26l.005-.005A6.567 6.567 0 0 0 11.468 4.9Zm6.48 11.86a8.367 8.367 0 1 0-1.283 1.264l2.711 2.623a.9.9 0 1 0 1.252-1.293l-2.68-2.593Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
