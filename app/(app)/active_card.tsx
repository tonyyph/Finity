import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { colors } from "@/constants/Colors";
import { useUserSettingsStore } from "@/stores";
import { exactDesign } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Keyboard, TextInput, View } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function ActiveCardScreen() {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null)
  ];
  const { bottom } = useSafeAreaInsets();
  const { setActiveCard } = useUserSettingsStore();
  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            -keyboard.height.value + (!!keyboard.height.value ? bottom / 3 : 0)
        }
      ]
    };
  });

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
        if (enteredOtp == "1234") {
          setCardNumber(["", "", "", ""]);
          setActiveCard(2);
          router.replace({
            pathname: "/active_card_success"
          });
        } else {
          setCardNumber(["", "", "", ""]);
          router.navigate({
            pathname: "/active_card_success",
            params: {
              success: "false"
            }
          });
          setError(true);
        }
      }, 2000);
    } else {
      Alert.alert("Error", "Please enter all 4 numbers.");
    }
  }, [cardNumber]);

  return (
    <View
      className="bg-white gap-4 p-6 flex-1"
      style={{ paddingBottom: bottom }}
    >
      <Header onRightFunction={router.back} />
      <View className="flex-1 gap-8">
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
                autoFocus={index == 0}
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
                keyboardType="numeric"
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
            <View className="flex-row justify-center items-center gap-1 mt-1">
              <MaterialIcons
                name="error"
                size={16}
                color={colors.errormessage}
              />
              <Typography type="body-small" weight="medium" textColor="#D9323D">
                {`Incorrect last 4-digits. Try again.`}
              </Typography>
            </View>
          )}
        </View>
        <Animated.View style={translateStyle} className="justify-end">
          <Button
            variant="default"
            disabled={loading}
            size={"lg"}
            className="rounded-full bg-primary h-[48px]"
            loading={loading}
            onPress={null}
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {loading ? `Activating......` : `Activate card`}
            </Typography>
          </Button>
        </Animated.View>
      </View>
    </View>
  );
}
export default ActiveCardScreen;
