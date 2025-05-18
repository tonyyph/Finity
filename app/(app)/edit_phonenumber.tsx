import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { TextInput, View } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EditPhoneNumberScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState<boolean>();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [focusMobileNumber, setFocusMobileNumber] = useState<boolean>(false);

  const keyboard = useAnimatedKeyboard();

  const translateStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          -keyboard.height.value + (!!keyboard.height.value ? bottom / 3 : 0)
      }
    ]
  }));

  const handleConfirm = useCallback(() => {
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
    <View className="flex-1 bg-background" style={{ paddingBottom: bottom }}>
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
          <View className="flex-1 flex-row gap-3">
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
                setPhoneNumber(text);
              }}
            />
            <View className="w-2" />
          </View>
        </View>
        <Animated.View
          style={translateStyle}
          key={1}
          className="justify-end flex-1"
        >
          <View className="px-6 gap-6">
            <Button
              variant="default"
              size={"lg"}
              disabled={loading || phoneNumber?.length < 10}
              className="rounded-full bg-primary h-[48px]"
              loading={loading}
              onPress={handleConfirm}
            >
              <Typography type="body-default" weight="medium" textColor="white">
                {loading ? `Sending...` : `Send code`}
              </Typography>
            </Button>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default EditPhoneNumberScreen;
