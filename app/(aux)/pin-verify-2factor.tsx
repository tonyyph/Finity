/* eslint-disable react-hooks/exhaustive-deps */
import { CircleAlert } from "@/components/common/icons";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { colors } from "@/constants/Colors";
import { useAnimatedKeyboard } from "@/hooks";
import { useForgotPin } from "@/hooks/auth/useForgotPin";
import { cn, IS_IOS } from "@/lib";
import { exactDesign } from "@/utils";
import { BottomIndicatorAvoidingView } from "@/utils";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, TextInput, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

export default function PINVerify2FactorScreen() {
  const { handleVerifyTOTP, error, isLoading, setError } = useForgotPin();

  const [isFirstTry, setIsFirstTry] = useState<boolean>(true);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(TextInput | null)[]>([]);
  const [indexCursor, setIndexCursor] = useState<number>(0);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0]?.focus();
    }
  }, []);

  const { keyboardHeight } = useAnimatedKeyboard(0);
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value
  }));

  const otpString = otp.join("");

  const handleVerifyOTP = useCallback(() => {
    Keyboard.dismiss();
    handleVerifyTOTP && handleVerifyTOTP({ otp: otpString });
  }, [otpString]);

  useEffect(() => {
    if (otpString.length === 6 && isFirstTry) {
      setIsFirstTry(false);
      handleVerifyOTP();
    }
  }, [otpString, isFirstTry]);

  useEffect(() => {
    if (error) {
      otpString.length === 6 && setOtp(Array(6).fill(""));
    }
  }, [error, otpString]);

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      setError("");
      if (index === 0) setIndexCursor(0);
      else setIndexCursor(index + 1);
      inputsRef.current?.[index]?.setNativeProps({
        selection: { start: text.length, end: text.length }
      });

      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < 5) {
        inputsRef.current?.[index + 1]?.focus();
      }
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

  return (
    <View className="bg-background flex-1">
      <Header onBack={router.back} title="" />
      <View className="flex-1 px-6 pt-8">
        <View className="z-10 mb-2 gap-2">
          <Typography type="heading-small" weight="semibold">
            {`Two-factor authentication`}
          </Typography>
          <Typography weight="regular">
            {`Enter the 6-digit verification code generated from\nyour app.`}
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
                editable={!isLoading}
                autoFocus={index === 0}
                className={`text-[20px] text-black text-center w-14 h-14 rounded-lg bg-white border`}
                style={[
                  { borderColor: colors.border },
                  indexCursor === index && {
                    borderWidth: exactDesign(2),
                    borderColor: colors.black
                  },
                  !!error && {
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
              />
            </View>
          ))}
        </View>
        {!!error && (
          <View className="flex flex-row items-center mt-3">
            <CircleAlert className="top-1" />
            <Typography
              type="body-small"
              weight="medium"
              textColor="#D9323D"
              className="flex-1"
            >
              {error}
            </Typography>
          </View>
        )}
      </View>
      <View key={1} className={cn("justify-start px-6")}>
        <View className="justify-end">
          <Button
            variant="default"
            size="lg"
            disabled={otpString.length !== 6 || isLoading}
            className="rounded-full bg-primary h-[48px]"
            loading={isLoading}
            onPress={handleVerifyOTP}
          >
            <Typography
              type="body-default"
              weight="medium"
              textColor={otpString.length !== 6 ? "#A3A3A3" : "white"}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Typography>
          </Button>
        </View>
      </View>
      <BottomIndicatorAvoidingView />
      <Animated.View style={translateStyle} />
    </View>
  );
}
