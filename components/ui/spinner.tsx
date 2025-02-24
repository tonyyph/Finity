import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export const AnimatedSpinner = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: 16,
        height: 16,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: "#e75e2d",
        opacity: 1,
        borderTopColor: "transparent",
        transform: [
          {
            rotate: rotateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "360deg"]
            })
          }
        ]
      }}
    />
  );
};
