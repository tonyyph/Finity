import { CircleAlert } from "@/components/common/icons";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { colors } from "@/constants/Colors";
import { useUserAuthenticateStore } from "@/stores";
import { exactDesign } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Keyboard,
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
  const { isResetPin } = useLocalSearchParams();
  const { bottom } = useSafeAreaInsets();

  const [loading, setLoading] = useState<boolean>(false);
  const [wrongOTP, setWrongOTP] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const [indexCursor, setIndexCursor] = useState<number>(0);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0]?.focus();
    }
  }, []);

  const { setIsLoggedIn, setIsLoginWithPin } = useUserAuthenticateStore();
  const keyboard = useAnimatedKeyboard();

  const translateStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          -keyboard.height.value + (!!keyboard.height.value ? bottom / 3 : 0)
      }
    ]
  }));

  const otpString = otp.join("");

  const handleVerifyOTP = useCallback(() => {
    setLoading(true);
    Keyboard.dismiss();
    setTimeout(() => {
      setLoading(false);
      if (otpString === "123456") {
        router.push({
          pathname: "/success-2factor",
          params: { isResetPin: 0 }
        });
      } else if (otpString === "111111") {
        setIsLoggedIn(true);
        setIsLoginWithPin(true);
      } else {
        setWrongOTP(true);
      }
    }, 1500);
  }, [otpString]);

  console.log("indexCursor", indexCursor);

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      setIndexCursor(index + 1);
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < 5) inputsRef.current[index + 1]?.focus();
      if (!text && index > 0) inputsRef.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

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
        handleVerifyOTP();
      } else {
        Keyboard.dismiss();
      }
    } else {
      setWrongOTP(false);
    }
  }, [otpString]);

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View
        className="bg-background gap-4 p-6 flex-1"
        style={{ paddingBottom: bottom }}
      >
        <View className="flex-1">
          <View className="z-10 mb-2 gap-2">
            <Typography type="heading-small" weight="semibold">
              Two-factor authentication
            </Typography>
            <Typography weight="regular">
              Enter the 6-digit verification code generated from your app.
            </Typography>
          </View>
          <View className="flex flex-row justify-between items-center mt-8 gap-2">
            {otp.map((digit, index) => (
              <View className=" flex flex-row items-center mt-3 gap-4">
                {index === 3 && (
                  <View className="w-[8px] h-[1px] bg-[#A3A3A3]" />
                )}
                <TextInput
                  key={index}
                  editable={!loading}
                  autoFocus={index == 0}
                  className={`text-[20px] text-black text-center w-14 h-14 rounded-lg bg-white border`}
                  style={[
                    { borderColor: colors.border },
                    indexCursor === index && {
                      borderWidth: exactDesign(2),
                      borderColor: colors.black
                    },
                    wrongOTP && {
                      borderWidth: exactDesign(2),
                      borderColor: colors.errormessage
                    }
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={(el) => (inputsRef.current[index] = el)}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => setIndexCursor(index)}
                  onSubmitEditing={handleVerifyOTP}
                />
              </View>
            ))}
          </View>
          {wrongOTP && (
            <View className="flex flex-row items-center mt-3">
              <CircleAlert className="top-1" />
              <Typography type="body-small" weight="medium" textColor="#D9323D">
                Incorrect verification code. Try again.
              </Typography>
            </View>
          )}
        </View>
        <Animated.View style={translateStyle} className="justify-end flex-1">
          <View className="justify-end">
            <Button
              variant="default"
              size="lg"
              disabled={otpString.length !== 6 || loading}
              className="rounded-full bg-primary h-12"
              loading={loading}
              onPress={handleVerifyOTP}
            >
              <Typography type="body-default" weight="medium" textColor="white">
                {loading ? "Verifying..." : "Verify"}
              </Typography>
            </Button>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
