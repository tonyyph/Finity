import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View
} from "react-native";

import { useEffect, useRef, useState } from "react";

type OTPInputProps = {
  length: number;
  value?: Array<string>;
  disabled?: boolean;
  onChange?(value: Array<string>): void;
};

export const OTPInput: React.FunctionComponent<OTPInputProps> = ({
  length,
  disabled,
  value,
  onChange
}) => {
  const [localState, setLocalState] = useState(
    [...new Array(length)].map((item, index) => ({ index, value: "" }))
  );
  const inputRefs = useRef<any>([]);

  const regexes = {
    isValidDigit: (text: any) => /^[0-9]{6}$/.test(text)
  };

  const onChangeValue = (text: string, index: number) => {
    setLocalState((prevState) =>
      prevState.map((item) => {
        if (item.index === index) {
          return {
            index,
            value: `${item.value}${text}`
          };
        }

        return {
          index: item.index,
          value: item.value
        };
      })
    );
    const newValue = value.map((item, valueIndex) => {
      if (valueIndex === index) {
        return text;
      }

      return item;
    });

    onChange(newValue);
  };

  const clearLocalState = () => {
    setLocalState(
      [...new Array(length)].map((item, index) => ({ index, value: "" }))
    );
  };

  const handleChange = (text: string, index: number) => {
    if (!regexes.isValidDigit(text)) {
      return;
    }

    onChangeValue(text, index);

    if (text.length !== 0) {
      return inputRefs?.current[index + 1]?.focus();
    }

    return inputRefs?.current[index - 1]?.focus();
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    const { nativeEvent } = event;

    if (nativeEvent.key === "Backspace") {
      return handleChange("", index);
    }

    if (!regexes.isValidDigit(nativeEvent.key)) {
      return;
    }

    if (value[index].length === 1) {
      return handleChange(nativeEvent.key, index);
    }
  };

  useEffect(() => {
    const longValue = localState.find((item) => item.value.length === length);

    if (longValue) {
      onChange(longValue.value.split(""));
    }
  }, [localState]);

  return (
    <View style={styles.container}>
      {[...new Array(length)].map((item, index) => (
        <TextInput
          ref={(ref) => {
            if (ref && !inputRefs.current.includes(ref)) {
              inputRefs.current = [...inputRefs.current, ref];
            }
          }}
          key={index}
          maxLength={1}
          value={value[index]}
          contextMenuHidden
          testID="OTPInput"
          editable={!disabled}
          style={styles.input}
          onBlur={clearLocalState}
          keyboardType="decimal-pad"
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    width: 45,
    height: 55,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center"
    // color: template.input.OTPInputText,
    // backgroundColor: template.input.background,
    // borderRadius: template.input.borderRadius,
    // ...template.ui.createShadow()
  }
});
