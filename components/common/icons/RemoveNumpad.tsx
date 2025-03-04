import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { memoFC } from "@/utils";
import { useColorPalette } from "@/hooks/use-color-palette";

export const RemoveNumpad = memoFC(
  ({ size = 24, style, ...props }: SvgProps & IconProps = {}) => {
    const { getColor } = useColorPalette();

    const iconFill = getColor("--primary");
    return (
      <View style={[{ width: size, height: size }, style]}>
        <Svg width={40} height={40} fill="none" {...props}>
          <Path
            fill="#0A0A0A"
            d="M19.018 16.906a.938.938 0 0 1 1.326-1.325l3.093 3.093 3.094-3.093a.937.937 0 0 1 1.326 1.325L24.763 20l3.094 3.094a.937.937 0 0 1-1.326 1.325l-3.093-3.093-3.094 3.093a.937.937 0 1 1-1.326-1.325L22.112 20l-3.094-3.094Z"
          />
          <Path
            fill="#0A0A0A"
            fillRule="evenodd"
            d="M15.152 10.473 5.625 20l9.527 9.527a3.75 3.75 0 0 0 2.651 1.098h12.822a3.75 3.75 0 0 0 3.75-3.75v-13.75a3.75 3.75 0 0 0-3.75-3.75H17.803a3.75 3.75 0 0 0-2.651 1.098ZM30.625 29H17.803a2.125 2.125 0 0 1-1.502-.622L7.923 20l8.378-8.378A2.125 2.125 0 0 1 17.803 11h12.822c1.174 0 2.125.951 2.125 2.125v13.75A2.125 2.125 0 0 1 30.625 29Z"
            clipRule="evenodd"
          />
        </Svg>
      </View>
    );
  }
);
