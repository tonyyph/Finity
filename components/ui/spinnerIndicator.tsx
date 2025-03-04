import React, { useMemo } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import Indicator from "./indicator";

interface MaterialIndicatorProps {
  trackWidth?: number;
  color?: string;
  size?: number;
  animationDuration?: number;
  style?: object;
}

const AnimatedSpinnerV2: React.FC<MaterialIndicatorProps> = ({
  trackWidth,
  color = "rgb(0, 0, 0)",
  size = 40,
  animationDuration = 4000,
  style,
}) => {
  const borderWidth = trackWidth ?? size / 10;
  const frames = Math.round((60 * animationDuration) / 1000);
  const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);

  const renderComponent = useMemo(
    () =>
      ({ index, progress }: { index: number; progress: Animated.Value }) => {
        const sa = 7.5;
        const ea = 30;
        const sequences = 3;
        const rotations = 5;

        const inputRange = Array.from(
          { length: frames },
          (_, frameIndex) => frameIndex / (frames - 1)
        );
        const outputRange = inputRange.map((_, frameIndex) => {
          let progressValue = (2 * sequences * frameIndex) / (frames - 1);
          let rotation = index ? 360 - sa : -(180 - sa);
          let sequence = Math.ceil(progressValue);

          progressValue =
            sequence % 2
              ? progressValue - sequence + 1
              : sequence - progressValue;
          let direction = index ? -1 : 1;

          return `${
            direction * (180 - (sa + ea)) * easing(progressValue) + rotation
          }deg`;
        });

        return (
          <Animated.View style={styles.layer} key={index}>
            <Animated.View
              style={{
                width: size,
                height: size,
                transform: [
                  { rotate: `${90 - sa}deg` },
                  {
                    rotate: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", `${360 * rotations}deg`],
                    }),
                  },
                ],
              }}
            >
              <Animated.View
                style={{
                  width: size,
                  height: size / 2,
                  overflow: "hidden",
                  top: index ? size / 2 : 0,
                }}
                collapsable={false}
              >
                <Animated.View
                  style={{
                    width: size,
                    height: size,
                    transform: [
                      {
                        rotate: progress.interpolate({
                          inputRange,
                          outputRange,
                        }),
                      },
                    ],
                  }}
                >
                  <Animated.View
                    style={{
                      width: size,
                      height: size / 2,
                      overflow: "hidden",
                    }}
                    collapsable={false}
                  >
                    <Animated.View
                      style={{
                        width: size,
                        height: size,
                        borderColor: color,
                        borderRadius: size / 2,
                        borderWidth,
                        borderStyle: "solid",
                      }}
                    />
                  </Animated.View>
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        );
      },
    [size, color, borderWidth, frames, easing]
  );

  return (
    <View style={[styles.container, style]}>
      <Indicator
        style={{ width: size, height: size }}
        renderComponent={renderComponent}
        animationDuration={5000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  layer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnimatedSpinnerV2;
