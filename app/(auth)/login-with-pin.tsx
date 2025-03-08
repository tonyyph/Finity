import { CircleAlert, RemoveNumpad } from "@/components/common/icons";
import { LoadingScreen } from "@/components/common/loading";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

export default function LoginWithPinScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [wrongPin, setWrongPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState<string>("");

  const handlePress = (num: string) => {
    if (confirmPin.length < 4) {
      setConfirmPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setConfirmPin((prev) => prev.slice(0, -1));
  };

  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }]
    };
  });

  useEffect(() => {
    if (confirmPin?.length === 4) {
      if (confirmPin === "1234") {
        router.push("/(auth)/pin-success");
      } else {
        if (confirmPin === "0000") {
          setLoading(true);
        } else {
          setWrongPin(true);
        }
      }
    } else {
      setWrongPin(false);
    }
  }, [confirmPin]);

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <View className="bg-background gap-4 p-8 flex-1 pt-32">
        <LoadingScreen loading={loading} />
        <View className="flex-1">
          {/* Welcome */}
          <View className="z-10">
            <View className="gap-14 items-center">
              <Image
                source={require("@/assets/images/logo.png")}
                className="w-[152px] h-10 "
                resizeMode="contain"
              />
              <Text className="relative text-center justify-start text-[#212121] text-base font-normal font-['PP_Neue_Montreal'] leading-snug tracking-wide">
                Welcome back, Tony Phan
              </Text>
            </View>
          </View>

          {/* PIN container */}
          <View className="flex-row h-7 inline-flex justify-center items-center gap-12 mt-8">
            {[...Array(4)].map((_, i) => (
              <View
                key={i}
                className={twMerge(
                  "w-3 h-3 relative bg-neutral-300 rounded-full",
                  confirmPin.length > i && "bg-black"
                )}
              />
            ))}
          </View>
          {wrongPin && (
            <View className="flex flex-row items-center justify-center mt-4">
              <CircleAlert className="top-1 right-1" />
              <Text className="relative justify-start text-errormessage text-sm font-medium font-['PP_Neue_Montreal'] leading-tight tracking-tight">{`Incorrect PIN. Try again.`}</Text>
            </View>
          )}
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
                  className="h-[72px] w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
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
                  className="h-[72px] w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
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
                  className="h-[72px] w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
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
                className="h-[72px] opacity-0 w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
              >
                <Text className="text-neutral-950 text-[28px] font-medium font-['PP Neue Montreal'] leading-9">
                  0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress("0")}
                className="h-[72px] w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
              >
                <Text className="text-neutral-950 text-[28px] font-medium font-['PP Neue Montreal'] leading-9">
                  0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                className="h-[72px] w-[72px] bg-backgroundSubtle rounded-[120px] justify-center items-center"
              >
                <RemoveNumpad className="bottom-2 right-3" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
        {/* Forgot password */}
        <View className="px-4 mt-2">
          <Text className="mx-auto text-center text-muted-foreground">
            <Text
              className="relative text-center justify-center text-neutral-950 text-base font-medium font-['PP_Neue_Montreal'] leading-snug tracking-wide"
              onPress={() => {
                router.push({
                  pathname: "/(auth)/pin-forgot"
                });
              }}
            >
              Forgot PIN?
            </Text>
          </Text>
        </View>
        <View style={{ height: bottom }} />
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
