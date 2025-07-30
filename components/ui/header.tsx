import { ArrowBackIcon } from "@/assets";
import { TopIndicatorAvoidingView } from "@/utils/spacing";
import { XIcon } from "lucide-react-native";
import { ReactNode } from "react";
import { TouchableOpacity, View } from "react-native";
import type { SvgProps } from "react-native-svg";
import { Typography } from "../common/text-typography";
import { Button } from "./button";
import { commonStore } from "@/stores";

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

export const Header = ({
  title,
  onBack,
  spacing = true,
  onLeftFunction,
  onRightFunction,
  icon: Icon,
  renderLeftView,
  renderCenterView,
  renderRightView
}: Props) => {
  const isLoading = commonStore.getState().isLoading;
  return (
    <View>
      {spacing && <TopIndicatorAvoidingView />}
      <View className="flex-row justify-between items-center px-3 gap-2 py-1">
        {renderLeftView ??
          (!!onBack || !!onLeftFunction ? (
            <TouchableOpacity
              onPress={(value) => {
                onBack?.(value);
                onLeftFunction?.(value);
              }}
              className="flex-shrink"
              disabled={isLoading}
            >
              <ArrowBackIcon />
            </TouchableOpacity>
          ) : (
            <View className="flex-shrink">
              <View className="w-[32px] h-[32px]" />
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
              className="flex-shrink items-center"
              size="icon"
              variant="ghost"
              onPress={onRightFunction}
            >
              {Icon ? (
                <Icon className="w-[32px] h-[32px] text-foreground" />
              ) : (
                <XIcon className="w-[32px] h-[32px] text-foreground" />
              )}
            </Button>
          ) : (
            <View className="flex-shrink">
              {Icon ? (
                <Icon className="w-[32px] h-[32px] color-transparent" />
              ) : (
                <XIcon className="w-[32px] h-[32px] color-transparent" />
              )}
            </View>
          ))}
      </View>
    </View>
  );
};
