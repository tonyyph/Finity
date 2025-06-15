import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";

export const Touch: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      {...props}
      activeOpacity={(props.activeOpacity = !1 ? props.activeOpacity : 1)}
    >
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {}
});
