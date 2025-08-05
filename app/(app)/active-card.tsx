/* eslint-disable react-hooks/exhaustive-deps */
import { CircleAlert } from "@/components/common/icons";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { colors } from "@/constants/Colors";
import { useAnimatedKeyboard } from "@/hooks";
import { useCardHolder } from "@/hooks/cardholders/useCardHolder";
import { IS_IOS } from "@/lib";
import { exactDesign } from "@/utils";
import { BottomIndicatorAvoidingView } from "@/utils";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Keyboard, TextInput, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

function ActiveCardScreen() {
  const [loading, setLoading] = useState<boolean>();
  const { handleActivateCard, error, userData } = useCardHolder();
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null)
  ];
  const { keyboardHeight } = useAnimatedKeyboard(0);
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value
  }));

  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [indexCursor, setIndexCursor] = useState<number>(0);

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      if (index === 0) setIndexCursor(0);
      else setIndexCursor(index + 1);
      inputRefs[index].current?.setNativeProps({
        selection: { start: text.length, end: text.length }
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
    Keyboard.dismiss();
    const enteredOtp = cardNumber.join("");
    if (enteredOtp.length === 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        handleActivateCard(enteredOtp);
      }, 2000);
    } else {
      Alert.alert("Error", "Please enter all 4 numbers.");
    }
  }, [cardNumber]);

  useEffect(() => {
    const enteredOtp = cardNumber.join("");
    if (enteredOtp.length === 4) {
      Keyboard.dismiss();
      handleSubmit();
    }
  }, [cardNumber, handleSubmit]);

  return (
    <View className="bg-white flex-1">
      <Header onRightFunction={router.back} />
      <View className="flex-1 gap-8 mt-6 px-6 ">
        <View className="gap-2">
          <Typography type="heading-small" weight="semibold">
            Activate card
          </Typography>
          <Typography weight="regular">
            To activate your card, please enter the last 4-digits from your
            card.
          </Typography>
        </View>
        <View className="flex-1 items-center gap-2">
          <View className="flex-row gap-4 items-start justify-center">
            {cardNumber.map((_, index) => (
              <TextInput
                editable={!loading}
                autoFocus={index === 0}
                className="border w-[56px] h-[56px] rounded-lg items-center justify-center text-center text-[20px] font-semibold"
                style={[
                  { borderColor: colors.border },
                  indexCursor === index && {
                    borderWidth: exactDesign(2),
                    borderColor: colors.black
                  },
                  error && {
                    borderWidth: exactDesign(2),
                    borderColor: colors.errormessage
                  }
                ]}
                key={index}
                ref={inputRefs[index]}
                keyboardType="number-pad"
                maxLength={1}
                value={cardNumber[index]}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => setIndexCursor(index)}
                onSubmitEditing={handleSubmit}
              />
            ))}
          </View>
          {error && (
            <View className="flex flex-row items-center justify-center mt-4">
              <CircleAlert className="top-1 " />
              <Typography type="body-small" weight="medium" textColor="#D9323D">
                Incorrect last 4-digits. Try again.
              </Typography>
            </View>
          )}
          {userData?.publicToken && __DEV__ && (
            <View className="bg-neutral-100 border border-[#E5E5E5] rounded-2xl p-4 m-4">
              <Typography textColor="black">{`Testing Public Token: ${userData?.publicToken}`}</Typography>
            </View>
          )}
        </View>
        <View className="justify-end">
          <Button
            variant="default"
            disabled={loading}
            size={"lg"}
            className="rounded-full bg-primary h-[48px]"
            loading={loading}
            onPress={null}
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {loading ? `Activating...` : `Activate card`}
            </Typography>
          </Button>
        </View>
      </View>
      <BottomIndicatorAvoidingView />
      <Animated.View style={translateStyle} />
    </View>
  );
}
export default ActiveCardScreen;
