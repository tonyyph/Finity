import { BiometricIcon } from "@/assets";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { RemoveNumpad } from "./icons";
import { Typography } from "./text-typography";
import { useAuth } from "@clerk/clerk-expo";
import { useUserAuthenticateStore, useUserSettingsStore } from "@/stores";

/**
 * Props for the Keypad component.
 * @property {(key: string) => void} onKeyPress - Callback function triggered when a key is pressed.
 */
type KeypadProps = {
  onKeyPress: (key: string) => void;
  showForgotPin?: boolean;
  className?: string;
  allowBiometric?: boolean;
};

/**
 * Layout definition for the numeric keypad.
 * Each sub-array represents a row of keys.
 */
const keys = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "back"]
];

/**
 * Keypad Component
 *
 * A custom numeric keypad UI component that emits pressed key values to a parent via a callback.
 *
 * @component
 * @param {KeypadProps} props - The props for the component.
 * @returns {JSX.Element} The rendered Keypad component.
 *
 * @example
 * <Keypad onKeyPress={(key) => console.log(key)} />
 */

export const Keypad: React.FC<KeypadProps> = ({
  onKeyPress,
  showForgotPin = false,
  className,
  allowBiometric = false
}) => {
  const { signOut } = useAuth();
  const { setVerificationPin } = useUserAuthenticateStore();
  const { setEnabledLocalAuth } = useUserSettingsStore();

  const onPressForgotPin = async () => {
    await signOut();
    setVerificationPin("");
    setEnabledLocalAuth(false);
    router.replace({
      pathname: "/pin-forgot"
    });
  };

  return (
    <View className={`flex-col items-center justify-end gap-2 flex-1`}>
      {keys.map((row, rowIndex) => (
        <View
          key={rowIndex}
          className={`flex-row items-center justify-around w-full`}
        >
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              className={cn(
                "h-[72px] w-[72px] p-4 bg-backgroundSubtle rounded-full justify-center items-center",
                (key === "back" || key === ".") && "bg-white"
              )}
              onPress={() => onKeyPress(key)}
              disabled={!allowBiometric && key === "."}
            >
              {key === "back" ? (
                <RemoveNumpad />
              ) : key === "." ? (
                allowBiometric ? (
                  <BiometricIcon />
                ) : (
                  <View className={`w-[6px] h-[6px] rounded-full bg-white`} />
                )
              ) : (
                key !== "" && (
                  <Typography type="heading-medium" weight="medium">
                    {key}
                  </Typography>
                )
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
      {/* Forgot PIN */}
      {showForgotPin && (
        <View className={cn("px-4 mt-10 mb-4", className)}>
          <Typography className="text-center" onPress={onPressForgotPin}>
            {`Forgot PIN?`}
          </Typography>
        </View>
      )}
    </View>
  );
};
