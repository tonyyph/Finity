import { CircleAlert, RemoveNumpad } from "@/components/common/icons";
import Typography from "@/components/common/text-typography";
import Header from "@/components/ui/header";
import { useUserAuthenticateStore } from "@/stores";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { twMerge } from "tailwind-merge";

export default function VerifyPINChangeScreen() {
  const { verificationPin } = useUserAuthenticateStore();
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState("");

  const handlePress = (num: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
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
    <View className="bg-background gap-4 flex-1">
      <Header onBack={router.back} title="" />
      <View className="flex-1 px-8 pt-6">
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
      <View className="justify-end flex-1 mx-8">
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
              <RemoveNumpad />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BottomIndicatorAvoidingView number={2.5} />
    </View>
  );
}
