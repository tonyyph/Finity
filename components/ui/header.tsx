import { ArrowLeftIcon, XIcon } from "lucide-react-native";
import { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";
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
  renderRightView?: ReactNode;
};

function Header({
  title,
  onBack,
  onLeftFunction,
  onRightFunction,
  renderLeftView,
  renderCenterView,
  renderRightView
}: Props) {
  return (
    <SafeAreaView>
      <View className="flex-row justify-between items-center">
        {renderLeftView ??
          (!!onBack || !!onLeftFunction ? (
            <Button
              className="flex-shrink"
              onPress={(value) => {
                onBack?.(value);
                onLeftFunction?.(value);
              }}
              size="icon"
              variant="ghost"
            >
              <ArrowLeftIcon className="h-8 w-8 left-2 text-foreground" />
            </Button>
          ) : (
            <View className="flex-shrink">
              <ArrowLeftIcon className="h-8 w-8 left-2  color-transparent" />
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
              className="flex-shrink "
              size="icon"
              variant="ghost"
              onPress={onRightFunction}
            >
              <XIcon className="h-8 w-8 right-2 text-foreground" />
            </Button>
          ) : (
            <View className="flex-shrink ">
              <XIcon className="h-8 w-8 right-2  color-transparent" />
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
}
export default Header;
