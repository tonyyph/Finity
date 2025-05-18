import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Pressable, View } from "react-native";
import type { SvgProps } from "react-native-svg";
import Typography from "./text-typography";

type MenuItemProps = {
  label: string;
  subLabel?: string;
  icon?: React.ComponentType<SvgProps>;
  rightSection?: React.ReactNode;
  onPress?: () => void;
  className?: string;
  disabled?: boolean;
};

export const MenuItem = forwardRef(function (
  {
    label,
    subLabel,
    icon: Icon,
    rightSection,
    onPress,
    className,
    disabled
  }: MenuItemProps,
  ref: React.ForwardedRef<React.ElementRef<typeof Pressable>>
) {
  return (
    <Pressable
      onPress={onPress}
      ref={ref}
      disabled={disabled}
      className={cn(
        "flex min-h-[48px] flex-row items-center justify-between rounded-lg px-3 py-[10px] active:bg-subtitle",
        disabled && "opacity-50",
        className
      )}
    >
      <View className="flex flex-row items-center gap-3">
        {Icon && (
          <View className="flex items-center justify-center bg-neutral-100 w-[40px] h-[40px] rounded-full">
            <Icon className="w-[24px] h-[24px] self-center text-[#525252]" />
          </View>
        )}
        <View className="gap-1">
          <Typography type="body-default">{label}</Typography>
          {!!subLabel && (
            <Typography type="body-small" weight="regular" textColor="#737373">
              {subLabel}
            </Typography>
          )}
        </View>
      </View>
      {rightSection}
    </Pressable>
  );
});

MenuItem.displayName = "MenuItem";
