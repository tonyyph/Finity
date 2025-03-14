import { CircleAlert } from "@/components/common/icons";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useUserAuthenticateStore } from "@/stores";
import { exactDesign } from "@/utils";
import { useLingui } from "@lingui/react";
import { router, useLocalSearchParams } from "expo-router";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Verify2FactorScreen() {
  const { i18n } = useLingui();
  const { isResetPin } = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();

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

  const { setIsLoggedIn, setIsLoginWithPin } = useUserAuthenticateStore();

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
    setLoading(true);
    Keyboard.dismiss();
    setTimeout(() => {
      setLoading(false);
      if (otpString === "123456") {
        router.push({
          pathname: "/success-2factor",
          params: { isResetPin: 0 }
        });
      } else {
        if (otpString === "111111") {
          setIsLoggedIn(true);
          setIsLoginWithPin(true);
        } else {
        }
      }
    }, 1500);
  }, [otpString]);

  useEffect(() => {
    if (otpString?.length === 6 && wrongOTP === false && !!isResetPin) {
      if (otpString === "123456") {
        router.push({
          pathname: "/success-2factor",
          params: { isResetPin: 1 }
        });
      } else {
        setWrongOTP(true);
        Keyboard.dismiss();
      }
    }
    if (otpString.length === 6 && wrongOTP === false && !isResetPin) {
      if (otpString === "123456" || otpString === "111111") {
        handleSendEmailToResetPassword();
      } else {
        setWrongOTP(true);
        Keyboard.dismiss();
      }
    } else {
      setWrongOTP(false);
    }
  }, [otpString]);

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View
        className="bg-background gap-4 p-8 flex-1"
        style={{ paddingBottom: bottom }}
      >
        <View className="flex-1">
          {/* Welcome */}
          <View className="z-10 mb-2">
            <View className="gap-2">
              <Typography type="heading-small" weight="semibold">
                Two-factor authentication
              </Typography>
              <Typography weight="regular">
                Enter the 6-digit verification code generated from your app.
              </Typography>
            </View>
          </View>
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
              <Typography type="body-small" weight="medium" textColor="#D9323D">
                Incorrect verification code. Try again.
              </Typography>
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
              className="rounded-full bg-primary h-[48px]"
              loading={loading}
              onPress={handleSendEmailToResetPassword}
            >
              <Typography type="body-default" weight="medium" textColor="white">
                {loading ? `Verifying...` : `Verify`}
              </Typography>
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
    gap: 8
  },
  otpBox: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#a3a3a3",
    borderWidth: 1,
    width: exactDesign(48),
    height: exactDesign(48),
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
