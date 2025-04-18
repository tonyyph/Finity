import { CircleAlert, RemoveNumpad } from "@/components/common/icons";
import Typography from "@/components/common/text-typography";
import { cn } from "@/lib/utils";
import { useUserAuthenticateStore } from "@/stores";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function VerificationPINScreen() {
  const { type } = useLocalSearchParams();
  const { verificationPin, setVerificationPin } = useUserAuthenticateStore();

  const [wrongPin, setWrongPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState<string>("");
  const { top, bottom } = useSafeAreaInsets();

  const handlePress = (num: string) => {
    if (confirmPin.length < 4) {
      setConfirmPin((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setConfirmPin((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (confirmPin?.length === 4) {
      if (confirmPin === "1234") {
        setVerificationPin(confirmPin);
        // router.push({
        //   pathname: "/pin-success",
        //   params: { isResetPin }
        // });
        router.dismissAll();
        console.log("todo");
      } else {
        setWrongPin(true);
      }
    } else {
      setWrongPin(false);
    }
  }, [confirmPin]);

  const NumpadButton = () => {
    return (
      <View className="mx-5">
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
              className="h-[72px] w-[72px] justify-center items-center"
            >
              <RemoveNumpad className="bottom-2 right-3" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      className="bg-background gap-4 p-8 flex-1"
      style={{ paddingBottom: bottom * 2.5 }}
    >
      <View className="flex-1">
        {/* Welcome */}
        <View className="z-10 mb-2">
          <View className="gap-2">
            <Typography type="heading-small" weight="semibold">
              Confirm your PIN code
            </Typography>
            <Typography weight="regular">
              Re-enter your PIN for confirmation.
            </Typography>
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
      <NumpadButton />
    </View>
  );
}
