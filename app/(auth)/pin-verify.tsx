import { RemoveNumpad } from "@/components/common/icons";
import { Text } from "@/components/ui/text";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";

export default function VerifyPINScreen() {
  const [pin, setPin] = useState<string>("");

  const handlePress = (num: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }]
    };
  });

  useEffect(() => {
    if (pin.length === 4) {
      router.push({
        pathname: "/(auth)/pin-confirm",
        params: {
          pin: pin
        }
      });
    }
  }, [pin]);

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="bg-background gap-4 p-8 flex-1">
        <View className="flex-1">
          {/* Welcome */}
          <View className="z-10">
            <Trans>
              <View className="gap-2">
                <Text className="text-neutral-950 text-2xl font-semibold font-['PP Neue Montreal'] leading-[30px] tracking-wide">
                  Set up your PIN code
                </Text>
                <Text className="text-neutral-950 text-base font-normal font-['PP Neue Montreal'] leading-snug tracking-wide">
                  Create a 4-digit PIN to sign in faster next time.
                </Text>
              </View>
            </Trans>
          </View>

          {/* PIN container */}
          <View className="flex flex-row mt-10 justify-center">
            <View className="h-7 justify-center items-center gap-14 inline-flex flex-row">
              {[...Array(4)].map((_, i) => (
                <View
                  key={i}
                  className={twMerge(
                    "w-3 h-3 bg-neutral-300 rounded-full",
                    pin.length > i && "bg-black"
                  )}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Button */}
        <Animated.View
          style={translateStyle}
          className="justify-end flex-1 mx-5"
        >
          <View className="py-4 gap-3">
            <View className="flex-row justify-between">
              {["1", "2", "3"].map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => handlePress(num)}
                  className="h-[72px] w-[72px] p-4 bg-[#f9f9f9] rounded-[120px] flex-col justify-center items-center inline-flex"
                >
                  <Text className="text-neutral-950 text-[28px] font-medium font-['PP Neue Montreal'] leading-9">
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex-row justify-between">
              {["4", "5", "6"].map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => handlePress(num)}
                  className="h-[72px] w-[72px] p-4 bg-[#f9f9f9] rounded-[120px] flex-col justify-center items-center inline-flex"
                >
                  <Text className="text-neutral-950 text-[28px] font-medium font-['PP Neue Montreal'] leading-9">
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex-row justify-between">
              {["7", "8", "9"].map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => handlePress(num)}
                  className="h-[72px] w-[72px] p-4 bg-[#f9f9f9] rounded-[120px] flex-col justify-center items-center inline-flex"
                >
                  <Text className="text-neutral-950 text-[28px] font-medium font-['PP Neue Montreal'] leading-9">
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex-row justify-between">
              <TouchableOpacity
                disabled
                className="h-[72px] opacity-0 w-[72px] p-4 bg-[#f9f9f9] rounded-[120px] flex-col justify-center items-center inline-flex"
              >
                <Text className="text-neutral-950 text-[28px] font-medium font-['PP Neue Montreal'] leading-9">
                  0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress("0")}
                className="h-[72px] w-[72px] p-4 bg-[#f9f9f9] rounded-[120px] flex-col justify-center items-center inline-flex"
              >
                <Text className="text-neutral-950 text-[28px] font-medium font-['PP Neue Montreal'] leading-9">
                  0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                className="h-[72px] w-[72px] bg-[#f9f9f9] rounded-[120px] justify-center items-center"
              >
                <RemoveNumpad className="bottom-2 right-3" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: "stretch",
    fontSize: 24,
    letterSpacing: 0,
    lineHeight: 30,
    fontWeight: "600",
    fontFamily: "PP Neue Montreal",
    color: "#0a0a0a",
    textAlign: "left"
  },
  writeASubheading: {
    alignSelf: "stretch",
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 22,
    fontFamily: "PP Neue Montreal",
    color: "#0a0a0a",
    textAlign: "left"
  },
  otpContainer: {
    justifyContent: "space-evenly",
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    width: 344,
    gap: 8
  },
  otpBox: {
    borderRadius: 8,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#a3a3a3",
    borderWidth: 1,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center"
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
