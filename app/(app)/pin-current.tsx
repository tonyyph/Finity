import { CircleAlert } from "@/components/common/icons";
import { Keypad } from "@/components/common/keypad";
import { Typography } from "@/components/common/text-typography";
import { Header } from "@/components/ui/header";
import { cn } from "@/lib/utils";
import { useUserAuthenticateStore } from "@/stores";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function PINCurrentScreen() {
  const { verificationPin } = useUserAuthenticateStore();

  const [wrongPin, setWrongPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState<string>("");

  const handleKeyPress = (key: string) => {
    if (key === "back") {
      setConfirmPin((prev) => prev.slice(0, -1));
    } else if (key === ".") {
      setConfirmPin((prev) => prev.slice(0, -1));
    } else {
      if (confirmPin.length < 4) {
        setConfirmPin((prev) => prev + key);
      }
    }
  };

  useEffect(() => {
    if (confirmPin?.length === 4) {
      if (confirmPin === verificationPin) {
        router.push("/(app)/pin-verify-change");
      } else {
        setWrongPin(true);
      }
    } else {
      setWrongPin(false);
    }
  }, [confirmPin, verificationPin]);

  return (
    <View className="bg-background flex-1">
      <Header onBack={router.back} title="" />
      <View className="flex-1 px-6 pt-8">
        {/* Welcome */}
        <View className="z-10 mb-2">
          <View className="gap-2">
            <Typography type="heading-small" weight="semibold">
              {`Current PIN code`}
            </Typography>
            <Typography weight="regular">{`Enter your 4-digit PIN.`}</Typography>
          </View>
        </View>

        {/* PIN container */}
        <View className="flex-row h-7 inline-flex justify-center items-center gap-14 mt-8">
          {[...Array(4)].map((_, i) => (
            <View
              key={i}
              className={cn(
                "w-[12px] h-[12px] relative bg-neutral-300 rounded-full",
                confirmPin.length > i && "bg-black"
              )}
            />
          ))}
        </View>
        {wrongPin && (
          <View className="flex flex-row items-center justify-center mt-4">
            <CircleAlert className="top-1 " />
            <Typography type="body-small" weight="medium" textColor="#D9323D">
              Incorrect PIN. Try again.
            </Typography>
          </View>
        )}
      </View>

      {/* Button */}
      <View className={`flex-1`}>
        <Keypad onKeyPress={handleKeyPress} />
      </View>
      <BottomIndicatorAvoidingView number={3.5} />
    </View>
  );
}
