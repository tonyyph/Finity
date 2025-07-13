import { cn } from "@/lib/utils";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";

const duration = 1000;

function Skeleton({
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Animated.View>, "style">) {
  const sv = useSharedValue(1);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    sv.value = withRepeat(
      withSequence(withTiming(0.6, { duration }), withTiming(1, { duration })),
      -1
    );
  }, [sv]);

  const style = useAnimatedStyle(() => ({
    opacity: sv.value
  }));

  return (
    <Animated.View
      style={style}
      className={cn("rounded-md bg-neutral-100 dark:bg-slate-400", className)}
      {...props}
    />
  );
}

export { Skeleton };
