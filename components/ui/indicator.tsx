import { useEffect, useRef, useState } from "react";
import { Animated, Easing, ViewStyle } from "react-native";

type IndicatorProps = {
  animationEasing?: (value: number) => number;
  animationDuration?: number;
  hideAnimationDuration?: number;
  animating?: boolean;
  interaction?: boolean;
  hidesWhenStopped?: boolean;
  renderComponent?: ({
    index,
    count,
    progress,
  }: {
    index: number;
    count: number;
    progress: Animated.Value;
  }) => JSX.Element | null;
  count?: number;
  style?: ViewStyle;
};

const Indicator: React.FC<IndicatorProps> = ({
  animationEasing = Easing.linear,
  animationDuration = 2000,
  hideAnimationDuration = 200,
  animating = true,
  interaction = true,
  hidesWhenStopped = true,
  renderComponent,
  count = 1,
  style,
}) => {
  const [progress] = useState(new Animated.Value(0));
  const [hideAnimation] = useState(new Animated.Value(animating ? 1 : 0));
  const animationState = useRef(0);
  const savedValue = useRef(0);

  useEffect(() => {
    if (animating) {
      startAnimation();
    }
  }, [animating]);

  useEffect(() => {
    Animated.timing(hideAnimation, {
      toValue: animating ? 1 : 0,
      duration: hideAnimationDuration,
      useNativeDriver: true,
    }).start();
  }, [animating]);

  const startAnimation = () => {
    if (animationState.current !== 0) return;

    progress.setValue(0);
    Animated.loop(
      Animated.timing(progress, {
        duration: animationDuration,
        easing: animationEasing,
        useNativeDriver: true,
        isInteraction: interaction,
        toValue: 1,
      })
    ).start();

    animationState.current = 1;
  };

  const stopAnimation = () => {
    if (animationState.current !== 1) return;
    progress.stopAnimation((value) => {
      saveAnimation(value);
    });
    animationState.current = -1;
  };

  const saveAnimation = (value: number) => {
    savedValue.current = value;
    animationState.current = 0;
    if (animating) {
      resumeAnimation();
    }
  };

  const resumeAnimation = () => {
    if (animationState.current !== 0) return;

    Animated.timing(progress, {
      useNativeDriver: true,
      isInteraction: interaction,
      duration: (1 - savedValue.current) * animationDuration,
      toValue: 1,
    }).start(({ finished }) => {
      if (finished) {
        startAnimation();
      }
    });

    savedValue.current = 0;
    animationState.current = 1;
  };

  return (
    <Animated.View
      style={[style, hidesWhenStopped && { opacity: hideAnimation }]}
    >
      {Array.from({ length: count }, (_, index) =>
        renderComponent ? renderComponent({ index, count, progress }) : null
      )}
    </Animated.View>
  );
};

export default Indicator;
