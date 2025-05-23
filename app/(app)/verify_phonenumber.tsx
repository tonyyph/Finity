import { CircleAlert } from "@/components/common/icons";
import { ResendVerificationDowntime } from "@/components/common/resend_verification_downtime";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { colors } from "@/constants/Colors";
import { useVerification } from "@/hooks/profile/useVerification";
import { exactDesign } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, TextInput, View } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function VerifyPhoneNumberCodeScreen() {
  const { bottom } = useSafeAreaInsets();
  const { phoneNumber, rawPhoneNumber } = useLocalSearchParams();

  const { verificationCode, loading, error, handleVerifyOTP } = useVerification(
    rawPhoneNumber as string
  );

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(TextInput | null)[]>([]);
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

  const handleVerifyChangePNOTP = useCallback(() => {
    Keyboard.dismiss();
    if (loading) return;
    handleVerifyOTP &&
      handleVerifyOTP({
        verificationCode: otpString
      });
  }, [otpString]);

  useEffect(() => {
    if (otpString.length === 6) {
      handleVerifyChangePNOTP();
    }
  }, [otpString, handleVerifyChangePNOTP]);

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      setIndexCursor(index + 1);
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
    <View
      className="bg-background gap-4 p-6 flex-1"
      style={{ paddingBottom: bottom }}
    >
      <View className="flex-1">
        <View className="z-10 mb-2 gap-2">
          <Typography type="heading-small" weight="semibold">
            Verify mobile number
          </Typography>
          <Typography weight="regular">
            {`To continue, verify your number by entering the verification code sent to ${phoneNumber
              .toString()
              ?.replace(/^\+44(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3")}.`}
          </Typography>
        </View>
        <View className="flex flex-row justify-between items-center mt-6 gap-2">
          {otp.map((digit, index) => (
            <View
              className=" flex flex-row items-center mt-3 gap-4"
              key={index}
            >
              {index === 3 && <View className="w-[8px] h-[1px] bg-[#A3A3A3]" />}
              <TextInput
                editable={!loading}
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
              {`Incorrect verification code. Try again.`}
            </Typography>
          </View>
        )}
        <ResendVerificationDowntime />
        {verificationCode !== "000000" && (
          <Typography
            type="body-small"
            textColor="#737373"
            className="self-center mt-6"
          >
            {`(Testing Verification code: ${verificationCode})`}
          </Typography>
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
            onPress={handleVerifyChangePNOTP}
          >
            <Typography
              type="body-default"
              weight="medium"
              textColor={otpString.length !== 6 ? "#A3A3A3" : "white"}
            >
              {loading ? "Verifying..." : "Verify"}
            </Typography>
          </Button>
        </View>
      </Animated.View>
    </View>
  );
}
