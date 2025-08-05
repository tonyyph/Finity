import { cn } from "@/lib";
import * as SwitchPrimitives from "@rn-primitives/switch";
import * as React from "react";
import { Platform } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from "react-native-reanimated";

const SwitchWeb = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer h-6 w-11 shrink-0 cursor-pointer flex-row items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed",
      props.checked ? "bg-primary" : "bg-input",
      props.disabled && "opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-foreground/5 shadow-md ring-0 transition-transform",
        props.checked ? "translate-x-5" : "translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));

SwitchWeb.displayName = "SwitchWeb";

const SwitchNative = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const translateX = useDerivedValue(() => (props.checked ? 17 : 0));
  const animatedRootStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translateX.value,
        [0, 17],
        ["#D7DEDE", "#FF885D"]
      )
    };
  });
  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(translateX.value, { duration: 200 }) }]
  }));
  return (
    <Animated.View
      style={animatedRootStyle}
      className={cn(
        "h-[25px] w-[42px] rounded-full",
        props.disabled && "opacity-50"
      )}
    >
      <SwitchPrimitives.Root
        className={cn(
          "h-[25px] w-[42px] shrink-0 flex-row items-center rounded-full border-2 border-transparent",
          props.checked ? "bg-[#FF885D]" : "bg-[#D7DEDE]",
          className
        )}
        {...props}
        ref={ref}
      >
        <Animated.View style={animatedThumbStyle}>
          <SwitchPrimitives.Thumb
            className={"h-[22px] w-[22px] rounded-full bg-background"}
          />
        </Animated.View>
      </SwitchPrimitives.Root>
    </Animated.View>
  );
});
SwitchNative.displayName = "SwitchNative";

const Switch = Platform.select({
  web: SwitchWeb,
  default: SwitchNative
});

export { Switch };
