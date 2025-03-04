import { CircleAlert } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { AnimatedSpinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { router } from "expo-router";
import { SquareAsterisk } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";

export default function Verify2FactorScreen() {
  const { i18n } = useLingui();
  const [loading, setLoading] = useState(false);
  const [wrongOTP, setWrongOTP] = useState(false);
  const firstInput = useRef<TextInput>(null);
  const secondInput = useRef<TextInput>(null);
  const thirdInput = useRef<TextInput>(null);
  const fourthInput = useRef<TextInput>(null);
  const fifthInput = useRef<TextInput>(null);
  const sixthInput = useRef<TextInput>(null);
  const [otp, setOtp] = useState<any>({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: ""
  });

  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }]
    };
  });
  const otpString = Object.keys(otp)
    .sort((a: any, b: any) => a - b)
    .map((key) => otp[key])
    .join("");

  const handleSendEmailToResetPassword = useCallback(() => {
    if (otpString === "123456") {
      router.push(`/success-2factor`);
    } else {
      setLoading(true);
      Keyboard.dismiss();
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [otpString]);

  useEffect(() => {
    if (otpString.length === 6 && wrongOTP === false) {
      if (otpString === "123456") {
        handleSendEmailToResetPassword();
      } else {
        // Alert.alert("Invalid OTP");
        setWrongOTP(true);
        Keyboard.dismiss();
      }
    } else {
      setWrongOTP(false);
    }
  }, [otpString]);

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="bg-background gap-4 p-8 flex-1">
        <View className="flex-1">
          {/* Welcome */}
          <View className="z-10">
            <Trans>
              <View className="gap-2">
                <Text className="text-neutral-950 text-2xl font-semibold font-['PP Neue Montreal'] leading-[30px] tracking-wide">
                  Two-factor authentication
                </Text>
                <Text className="text-neutral-950 text-base font-normal font-['PP Neue Montreal'] leading-snug tracking-wide">
                  Enter the 6-digit verification code generated from your app.
                </Text>
              </View>
            </Trans>
          </View>
          {/* Illustration */}
          <SquareAsterisk className="absolute top-16 right-0 size-80 text-muted-foreground opacity-30" />
          {/* OTP container */}
          <View style={styles.otpContainer}>
            <View
              style={[
                styles.otpBox,
                {
                  borderColor: wrongOTP ? "#D9323D" : "#a3a3a3",
                  borderWidth: wrongOTP ? 2 : 1
                }
              ]}
            >
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={firstInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 1: text });
                  text && secondInput?.current?.focus();
                }}
              />
            </View>
            <View
              style={[
                styles.otpBox,
                {
                  borderColor: wrongOTP ? "#D9323D" : "#a3a3a3",
                  borderWidth: wrongOTP ? 2 : 1
                }
              ]}
            >
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={secondInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 2: text });
                  text
                    ? thirdInput?.current?.focus()
                    : firstInput?.current?.focus();
                }}
              />
            </View>
            <View
              style={[
                styles.otpBox,
                {
                  borderColor: wrongOTP ? "#D9323D" : "#a3a3a3",
                  borderWidth: wrongOTP ? 2 : 1
                }
              ]}
            >
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={thirdInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 3: text });
                  text
                    ? fourthInput?.current?.focus()
                    : secondInput?.current?.focus();
                }}
              />
            </View>
            <View style={[styles.divider, styles.pinSlotBorder]} />
            <View
              style={[
                styles.otpBox,
                {
                  borderColor: wrongOTP ? "#D9323D" : "#a3a3a3",
                  borderWidth: wrongOTP ? 2 : 1
                }
              ]}
            >
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fourthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 4: text });
                  text
                    ? fifthInput?.current?.focus()
                    : thirdInput?.current?.focus();
                }}
              />
            </View>
            <View
              style={[
                styles.otpBox,
                {
                  borderColor: wrongOTP ? "#D9323D" : "#a3a3a3",
                  borderWidth: wrongOTP ? 2 : 1
                }
              ]}
            >
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fifthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 5: text });
                  text
                    ? sixthInput?.current?.focus()
                    : fourthInput?.current?.focus();
                }}
              />
            </View>
            <View
              style={[
                styles.otpBox,
                {
                  borderColor: wrongOTP ? "#D9323D" : "#a3a3a3",
                  borderWidth: wrongOTP ? 2 : 1
                }
              ]}
            >
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={sixthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 6: text });
                  !text && fifthInput?.current?.focus();
                }}
              />
            </View>
          </View>
          {wrongOTP && (
            <View className=" flex flex-row items-center mt-3">
              <CircleAlert className="top-1" />
              <Text className="text-red-500 text-base font-medium">
                Incorrect verification code. Try again.
              </Text>
            </View>
          )}
        </View>

        {/* Button */}
        <Animated.View style={translateStyle} className="justify-end flex-1">
          <View className="justify-end">
            {/* Submit Button */}
            <Button
              variant="default"
              size={"lg"}
              disabled={otpString.length !== 6 || loading}
              className="mt-8 rounded-full bg-primary h-[48px]"
              loading={loading}
              onPress={handleSendEmailToResetPassword}
            >
              {loading && <AnimatedSpinner />}
              <Text className="text-white text-base font-medium">
                {loading ? t(i18n)`Verifying...` : t(i18n)`Verify`}
              </Text>
            </Button>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  otpContainer: {
    justifyContent: "space-evenly",
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    width: 344,
    gap: 8
  },
  otpBox: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#a3a3a3",
    borderWidth: 1,
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 48
  },
  otpText: {
    fontSize: 24,
    color: "#0a0a0a",
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  divider: {
    width: 9,
    height: 1,
    alignItems: "center"
  },
  pinSlotBorder: {
    borderWidth: 1,
    borderColor: "#a3a3a3",
    borderStyle: "solid"
  }
});
