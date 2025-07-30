import { Keypad } from "@/components/common/keypad";
import { Typography } from "@/components/common/text-typography";
import { cn } from "@/lib/utils";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function VerifyPINScreen() {
  const { isResetPin } = useLocalSearchParams();

  const [pin, setPin] = useState<string>("");

  const handleKeyPress = (key: string) => {
    if (key === "back") {
      setPin((prev) => prev.slice(0, -1));
    } else if (key === ".") {
      setPin((prev) => prev.slice(0, -1));
    } else {
      if (pin.length < 4) {
        setPin((prev) => prev + key);
      }
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      router.push({
        pathname: "/pin-confirm",
        params: {
          pin: pin,
          isResetPin
        }
      });
    }
  }, [pin, isResetPin]);

  return (
    <View className="bg-background gap-4 p-8 flex-1">
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
              className={cn(
                "w-[12px] h-[12px] bg-neutral-300 rounded-full",
                pin.length > i && "bg-black"
              )}
            />
          ))}
        </View>
      </View>
      <View className={`flex-1`}>
        <Keypad onKeyPress={handleKeyPress} />
      </View>
      <BottomIndicatorAvoidingView number={2.5} />
    </View>
  );
}
