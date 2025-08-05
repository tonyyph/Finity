import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const SentIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={20} height={20} fill="none" {...props}>
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M10 2.584a.75.75 0 0 1 .75.75v11.583l4.566-4.348a.75.75 0 0 1 1.034 1.086l-5.833 5.555a.75.75 0 0 1-1.034 0l-5.834-5.555a.75.75 0 0 1 1.035-1.086l4.566 4.348V3.334a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
