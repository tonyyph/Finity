import { useLoading } from "@/stores";
import React from "react";
import { View, Animated, StyleSheet } from "react-native";

export const GlobalProgressBar = () => {
  const { progress } = useLoading();

  return (
    <View style={[styles.container, { height: !!progress ? 4 : 1 }]}>
      <Animated.View
        style={[
          styles.bar,
          {
            width: !!progress ? `${progress}%` : "100%",
            height: !!progress ? 4 : 1,
            backgroundColor: !!progress ? "#FF885D" : "#F5F5F5"
          }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    height: 4,
    backgroundColor: "#F5F5F5",
    width: "100%"
  },
  bar: {
    width: "100%",
    backgroundColor: "#F5F5F5"
  }
});
