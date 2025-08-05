import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const OneUserIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        fill="#525252"
        fillRule="evenodd"
        d="M12.181 4.9a2.69 2.69 0 1 0 0 5.381 2.69 2.69 0 0 0 0-5.381Zm-4.49 2.69a4.49 4.49 0 1 1 8.981 0 4.49 4.49 0 0 1-8.981 0Zm-2.276 7.598a4.491 4.491 0 0 1 3.176-1.316h7.181a4.491 4.491 0 0 1 4.491 4.491v1.796a.9.9 0 1 1-1.8 0v-1.796a2.691 2.691 0 0 0-2.69-2.69H8.59a2.69 2.69 0 0 0-2.691 2.69v1.796a.9.9 0 1 1-1.8 0v-1.796a4.49 4.49 0 0 1 1.315-3.175Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};
