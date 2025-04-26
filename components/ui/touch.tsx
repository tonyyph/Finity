import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";

const Touch: React.FC<TouchableOpacityProps> = (props) => {
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
export default Touch;

const styles = StyleSheet.create({
  container: {}
});
