import { ArrowBackIcon } from "@/assets";
import { TopIndicatorAvoidingView } from "@/utils/spacing";
import { XIcon } from "lucide-react-native";
import { ReactNode } from "react";
import { View } from "react-native";
import type { SvgProps } from "react-native-svg";
import Typography from "../common/text-typography";
import { Button } from "./button";

type Props = {
  title?: string;
  spacing?: boolean;
  onLeftFunction?: (params?: any) => void;
  renderLeftView?: ReactNode;
  renderCenterView?: ReactNode;
  onBack?: (params?: any) => void;
  onRightFunction?: (params?: any) => void;
  children?: ReactNode;
  icon?: React.ComponentType<SvgProps>;
  renderRightView?: ReactNode;
};

function Header({
  title,
  onBack,
  spacing = true,
  onLeftFunction,
  onRightFunction,
  icon: Icon,
  renderLeftView,
  renderCenterView,
  renderRightView
}: Props) {
  return (
    <View>
      {spacing && <TopIndicatorAvoidingView />}
      <View className="flex-row justify-between items-center">
        {renderLeftView ??
          (!!onBack || !!onLeftFunction ? (
            <Button
              className="flex-shrink ml-2"
              onPress={(value) => {
                onBack?.(value);
                onLeftFunction?.(value);
              }}
              size="icon"
              variant="ghost"
            >
              <ArrowBackIcon />
            </Button>
          ) : (
            <View className="flex-shrink ml-2">
              <View className="w-8 h-8" />
            </View>
          ))}
        {renderCenterView ?? (
          <Typography weight="semibold" type="body-large">
            {title}
          </Typography>
        )}
        {renderRightView ??
          (!!onRightFunction ? (
            <Button
              className="flex-shrink items-center mr-2"
              size="icon"
              variant="ghost"
              onPress={onRightFunction}
            >
              {Icon ? (
                <Icon className="h-8 w-8 text-foreground" />
              ) : (
                <XIcon className="h-8 w-8 text-foreground" />
              )}
            </Button>
          ) : (
            <View className="flex-shrink mr-2">
              {Icon ? (
                <Icon className="h-8 w-8 color-transparent" />
              ) : (
                <XIcon className="h-8 w-8 color-transparent" />
              )}
            </View>
          ))}
      </View>
    </View>
  );
}
export default Header;
