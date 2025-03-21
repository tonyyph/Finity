import { CircleAlert } from "@/components/common/icons";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { colors } from "@/constants/Colors";
import { useLogin } from "@/hooks/auth";
import { exactDesign } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, TextInput, View } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Verify2FactorScreen() {
  const { isResetPin } = useLocalSearchParams();
  const { bottom } = useSafeAreaInsets();
  const { handleVerifyTOTP, error, loading } = useLogin();

  const [wrongOTP, setWrongOTP] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<Array<TextInput | null>>([]);
  const [indexCursor, setIndexCursor] = useState<number>(0);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0]?.focus();
    }
  }, []);

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

  const handleVerifyOTP = useCallback(() => {
    handleVerifyTOTP && handleVerifyTOTP({ otp: otpString });
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
        handleVerifyOTP();
      } else {
        Keyboard.dismiss();
      }
    } else {
      setWrongOTP(false);
    }
  }, [otpString]);

  return (
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
            <View
              className=" flex flex-row items-center mt-3 gap-4"
              key={index}
            >
              {index === 3 && <View className="w-[8px] h-[1px] bg-[#A3A3A3]" />}
              <TextInput
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
        {!!error && (
          <View className="flex flex-row items-center mt-3">
            <CircleAlert className="top-1" />
            <Typography type="body-small" weight="medium" textColor="#D9323D">
              {error}
            </Typography>
          </View>
        )}
      </View>
      <Animated.View
        style={translateStyle}
        key={1}
        className="justify-end flex-1"
      >
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
  );
}
