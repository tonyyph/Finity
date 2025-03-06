import React, { ReactDOM } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Props = {};

const Touch: React.FC<TouchableOpacityProps & Props> = (props) => {
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
  container: {},
});
