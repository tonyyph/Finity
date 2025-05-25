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
  onLeftFunction,
  onRightFunction,
  icon: Icon,
  renderLeftView,
  renderCenterView,
  renderRightView
}: Props) {
  return (
    <View>
      <TopIndicatorAvoidingView />
      <View className="flex-row justify-between items-center">
        {renderLeftView ??
          (!!onBack || !!onLeftFunction ? (
            <Button
              className="flex-shrink left-2"
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
            <View className="flex-shrink left-2">
              <View className="w-8 h-8" />
            </View>
          ))}
        {renderCenterView ?? (
          <Typography weight="bold" type="body-large">
            {title}
          </Typography>
        )}
        {renderRightView ??
          (!!onRightFunction ? (
            <Button
              className="flex-shrink "
              size="icon"
              variant="ghost"
              onPress={onRightFunction}
            >
              {Icon ? (
                <Icon className="h-8 w-8 right-2 text-foreground" />
              ) : (
                <XIcon className="h-8 w-8 right-2 text-foreground" />
              )}
            </Button>
          ) : (
            <View className="flex-shrink ">
              {Icon ? (
                <Icon className="h-8 w-8 right-2 color-transparent" />
              ) : (
                <XIcon className="h-8 w-8 right-2 color-transparent" />
              )}
            </View>
          ))}
      </View>
    </View>
  );
}
export default Header;
