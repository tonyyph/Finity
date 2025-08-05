import { FC } from "react";
import { View } from "react-native";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";
export const AlertIcon: FC<SvgProps> = (props) => {
  return (
    <View style={[props?.style]}>
      <Svg width={24} height={24} fill="none" {...props}>
        <Circle cx={12} cy={12} r={11} fill="#fff" />
        <Path
          fill="#525252"
          fillRule="evenodd"
          d="M12 4.5A1.5 1.5 0 0 1 13.5 6v6a1.5 1.5 0 0 1-3 0V6A1.5 1.5 0 0 1 12 4.5Z"
          clipRule="evenodd"
        />
        <Path fill="#525252" d="M14 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      </Svg>
    </View>
  );
};
