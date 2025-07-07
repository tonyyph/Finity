import { toast as RNToast, Toasts } from "@backpackapp-io/react-native-toast";

export function ToastRoot() {
  return (
    <Toasts
      overrideDarkMode={true}
      extraInsets={{ top: -12 }}
      defaultStyle={{
        text: {
          fontFamily: "NeueMontreal-Medium",
          color: "#FFFFFF",
          fontSize: 16,
          letterSpacing: 0.48,
          right: -6
        },
        view: {
          backgroundColor: "#525252",
          borderRadius: 12
        },
        indicator: {
          position: "absolute",
          backgroundColor: "#525252"
        }
      }}
    />
  );
}

export const toast = RNToast;
