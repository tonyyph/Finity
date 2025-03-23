import { RemoveNumpad } from "@/components/common/icons";
import Typography from "@/components/common/text-typography";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

export default function VerifyPINScreen() {
  const { isResetPin } = useLocalSearchParams();

  const [pin, setPin] = useState<string>("");
  const { top, bottom } = useSafeAreaInsets();

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
        pathname: "/(app)/pin-confirm",
        params: {
          pin: pin,
          isResetPin
        }
      });
    }
  }, [pin]);

  return (
    <View
      className="bg-background gap-4 p-8 flex-1"
      style={{ paddingBottom: bottom * 2 }}
    >
      <View className="flex-1">
        {/* Welcome */}
        <View className="z-10 mb-2">
          <View className="gap-2">
            <Typography type="heading-small" weight="semibold">
              Set up your PIN code
            </Typography>
            <Typography weight="regular">
              Create a 4-digit PIN to sign in faster next time.
            </Typography>
          </View>
        </View>

        {/* PIN container */}
        <View className="flex-row h-7 inline-flex justify-center items-center gap-14 mt-8">
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

      {/* Button */}
      <Animated.View style={translateStyle} className="justify-end flex-1 mx-5">
        <View className="py-4 gap-3">
          <View className="flex-row justify-between">
            {["1", "2", "3"].map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => handlePress(num)}
                className="h-[72px] w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
              >
                <Typography type="heading-medium" weight="medium">
                  {num}
                </Typography>
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
                <Typography type="heading-medium" weight="medium">
                  {num}
                </Typography>
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
                <Typography type="heading-medium" weight="medium">
                  {num}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row justify-between">
            <TouchableOpacity
              disabled
              className="h-[72px] opacity-0 w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
            >
              <Typography type="heading-medium" weight="medium">
                0
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress("0")}
              className="h-[72px] w-[72px] p-4 bg-backgroundSubtle rounded-[120px] flex-col justify-center items-center inline-flex"
            >
              <Typography type="heading-medium" weight="medium">
                0
              </Typography>
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
    </View>
  );
}
