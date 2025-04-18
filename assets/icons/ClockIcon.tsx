import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const ClockIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        fill="#525252"
        fillRule="evenodd"
        d="M12 3.9a8.1 8.1 0 1 0 0 16.2 8.1 8.1 0 0 0 0-16.2ZM2.1 12c0-5.468 4.432-9.9 9.9-9.9s9.9 4.432 9.9 9.9-4.432 9.9-9.9 9.9-9.9-4.432-9.9-9.9ZM12 7.52a.9.9 0 0 1 .9.9v4.056l2.76.92a.9.9 0 1 1-.57 1.708l-3.374-1.125a.9.9 0 0 1-.616-.854V8.421a.9.9 0 0 1 .9-.9Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
