import { CircleAlert } from "@/components/common";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { useAnimatedKeyboard } from "@/hooks";
import { cn } from "@/lib/utils";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { TextInput, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const EditPhoneNumberScreen = () => {
  const [loading, setLoading] = useState<boolean>();
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isFirstTry, setIsFirstTry] = useState<boolean>(false);

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [focusMobileNumber, setFocusMobileNumber] = useState<boolean>(false);

  const { keyboardHeight } = useAnimatedKeyboard(0);
  const translateStyle = useAnimatedStyle(() => ({
    height: (keyboardHeight.value * 13) / 14
  }));

  const handleConfirm = useCallback(() => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setIsShowError(true);
      setIsFirstTry(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: "/(app)/verify_phonenumber",
        params: {
          phoneNumber: `+44${phoneNumber}`,
          rawPhoneNumber: phoneNumber
        }
      });
    }, 2000);
  }, [phoneNumber]);

  return (
    <View className="flex-1 bg-background">
      <Header onBack={router.back} title="" />
      <View className="flex-1">
        <View className="flex-1 px-6 gap-3 pt-6">
          <Typography type="heading-medium" weight="semibold">
            Edit mobile number
          </Typography>
          <Typography
            type="body-default"
            weight="regular"
            className="mr-4 my-2"
          >
            Enter your updated mobile number, and we’ll send a verification code
            to verify your identity.
          </Typography>
          <Typography textColor="#404040">New mobile number</Typography>
          <View className="flex-row gap-3">
            <View className="w-[56px] h-[48px] bg-neutral-100 items-center border border-border justify-center rounded-lg">
              <Typography weight="regular" textColor="#404040">
                +44
              </Typography>
            </View>
            <TextInput
              className={cn(
                "px-3 rounded-lg bg-background flex-1 border border-border h-[48px]",
                {
                  "border-black border-2": !!focusMobileNumber
                }
              )}
              onFocus={() => setFocusMobileNumber(true)}
              onEndEditing={() => setFocusMobileNumber(false)}
              placeholder={`Enter your new mobile number.`}
              placeholderTextColor={"#A3A3A3"}
              keyboardType="number-pad"
              maxLength={12}
              autoCapitalize="none"
              value={phoneNumber}
              onChangeText={(text) => {
                setIsShowError(text?.length !== 10);
                setPhoneNumber(text);
              }}
            />
            <View className="w-2" />
          </View>
          {isFirstTry && isShowError && (
            <View className={cn("flex-row items-center")}>
              <CircleAlert className="top-1" />
              <Typography type="body-small" weight="medium" textColor="#D9323D">
                {`Please enter a valid 10-digit phone number`}
              </Typography>
            </View>
          )}
        </View>
        <View key={1} className="justify-end flex-1">
          <View className="px-6 gap-6">
            <Button
              variant="default"
              size={"lg"}
              disabled={loading || phoneNumber?.length === 0}
              className="rounded-full bg-primary h-[48px]"
              loading={loading}
              onPress={handleConfirm}
            >
              <Typography
                type="body-default"
                weight="medium"
                textColor={phoneNumber?.length === 0 ? "#A3A3A3" : "white"}
              >
                {loading ? `Sending...` : `Send code`}
              </Typography>
            </Button>
          </View>
          <BottomIndicatorAvoidingView />
        </View>
      </View>
      <Animated.View style={translateStyle} />
    </View>
  );
};

export default EditPhoneNumberScreen;
