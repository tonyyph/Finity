import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const ArrowDownIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={36} height={36} fill="none" {...props}>
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M18 4.65c.745 0 1.35.604 1.35 1.35v20.85l8.219-7.828a1.35 1.35 0 1 1 1.862 1.956l-10.5 10a1.35 1.35 0 0 1-1.862 0l-10.5-10a1.35 1.35 0 1 1 1.862-1.956l8.219 7.828V6c0-.746.604-1.35 1.35-1.35Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
