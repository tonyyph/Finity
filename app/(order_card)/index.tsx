import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import AnimatedSpinnerV2 from "@/components/ui/spinnerIndicator";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/Colors";
import { exactDesign } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { t } from "@lingui/macro";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Keyboard, SafeAreaView, TextInput, View } from "react-native";

function OrderCardScreen() {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [indexCursor, setIndexCursor] = useState<number>(0);

  useEffect(() => {
    const enteredOtp = cardNumber.join("");
    if (enteredOtp.length === 4) {
      Keyboard.dismiss();
      handleSubmit();
    }
  }, [cardNumber]);

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      setIndexCursor(index + 1);
      inputRefs[index].current?.setNativeProps({
        selection: { start: text.length, end: text.length },
      });
      const newOtp = [...cardNumber];
      newOtp[index] = text;
      setCardNumber(newOtp);
      if (text && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      const newOtp = [...cardNumber];
      newOtp[index] = "";
      setCardNumber(newOtp);
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = useCallback(() => {
    const enteredOtp = cardNumber.join("");
    if (enteredOtp.length === 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (enteredOtp == "1234") {
          router.replace({
            pathname: "/order_card_success",
          });
        } else {
          router.navigate({
            pathname: "/order_card_success",
            params: {
              success: "false",
            },
          });
          setError(true);
        }
      }, 2000);
    } else {
      Alert.alert("Error", "Please enter all 4 numbers.");
    }
  }, [cardNumber]);

  return (
    <View className="flex-1 bg-white">
      <Header onRightFuntion={router.back} />
      <View className="flex-1 p-4 gap-8">
        <View className="gap-2">
          <Text className="text-h2 font-semibold ">Activate card</Text>
          <Text className="text-sm font-normal">{`To activate your card, please enter the last 
4-digits from your card.`}</Text>
        </View>
        <View className="flex-1 items-center gap-2">
          <View className="flex-row gap-2 items-start justify-center">
            {cardNumber.map((_, index) => (
              <TextInput
                autoFocus={index == 0}
                className="border w-14 h-14 rounded-lg items-center justify-center text-center text-h1"
                style={[
                  { borderColor: colors.border },
                  indexCursor === index && {
                    borderWidth: exactDesign(2),
                    borderColor: colors.black,
                  },
                  error && {
                    borderWidth: exactDesign(2),
                    borderColor: colors.errormessage,
                  },
                ]}
                key={index}
                ref={inputRefs[index]}
                keyboardType="numeric"
                maxLength={1}
                value={cardNumber[index]}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onSubmitEditing={handleSubmit}
              />
            ))}
          </View>
          {error && (
            <View className="flex-row justify-center items-center gap-1">
              <MaterialIcons
                name="error"
                size={16}
                color={colors.errormessage}
              />
              <Text
                className=""
                style={{ color: colors.errormessage }}
              >{t`Incorrect last 4-digits. Try again.`}</Text>
            </View>
          )}
        </View>
        <View>
          <Button
            variant="default"
            disabled={loading}
            size={"lg"}
            className="mt-8 rounded-full bg-primary h-[48px]"
            loading={loading}
            onPress={null}
          >
            {loading && <AnimatedSpinnerV2 size={20} color={colors.orange} />}
            <Text className="text-white text-base font-medium">
              {loading ? t`Activating......` : t`Activate card`}
            </Text>
          </Button>
        </View>
      </View>
      <SafeAreaView />
    </View>
  );
}
export default OrderCardScreen;
