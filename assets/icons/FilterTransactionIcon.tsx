import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const FilterTransactionIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={32} height={32} fill="none" {...props}>
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M17.9 15c1.9 0 3.49-1.324 3.898-3.1H23.9a.9.9 0 1 0 0-1.8h-2.102a4.001 4.001 0 0 0-7.796 0H7.9a.9.9 0 1 0 0 1.8h6.102A4.002 4.002 0 0 0 17.9 15Zm2.2-4a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0ZM10.002 21.9a4.002 4.002 0 0 0 7.796 0H23.9a.9.9 0 1 0 0-1.8h-6.102a4.002 4.002 0 0 0-7.796 0H7.9a.9.9 0 1 0 0 1.8h2.102ZM11.7 21a2.2 2.2 0 1 0 4.4 0 2.2 2.2 0 0 0-4.4 0Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
