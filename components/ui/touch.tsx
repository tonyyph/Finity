import React, { ReactDOM } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Props = {};

function Touch(props: TouchableOpacityProps & Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      {...props}
      activeOpacity={props?.activeOpacity || 0}
    >
      {props.children}
    </TouchableOpacity>
  );
}
export default Touch;

const styles = StyleSheet.create({
  container: {},
});
