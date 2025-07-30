import { CircleAlert, RemoveNumpad } from "@/components/common/icons";
import { Keypad } from "@/components/common/keypad";
import { Typography } from "@/components/common/text-typography";
import { Header } from "@/components/ui/header";
import { cn } from "@/lib/utils";
import { useUserAuthenticateStore } from "@/stores";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function VerifyPINChangeScreen() {
  const { verificationPin } = useUserAuthenticateStore();
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState("");

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
    if (pin?.length === 4) {
      if (pin === verificationPin) {
        setError("New PIN must be different from the current one.");
      } else {
        setError("");
        router.push({
          pathname: "/pin-confirm-change",
          params: {
            pin: pin
          }
        });
      }
    }
  }, [pin, verificationPin]);

  return (
    <View className="bg-background flex-1">
      <Header onBack={router.back} title="" />
      <View className="flex-1 px-6 pt-8">
        {/* Welcome */}
        <View className="z-10 mb-2">
          <View className="gap-2">
            <Typography type="heading-small" weight="semibold">
              {`Set up your PIN code`}
            </Typography>
            <Typography weight="regular">
              {`Create a 4-digit PIN to sign in faster next time.`}
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
        {error && (
          <View className="flex flex-row  items-center justify-center mt-4">
            <CircleAlert className="top-1 " />
            <Typography type="body-small" weight="medium" textColor="#D9323D">
              {error}
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
