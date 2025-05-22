import * as LocalAuthentication from "expo-local-authentication";
import { LockKeyholeIcon, ScanFaceIcon } from "lucide-react-native";
import { useCallback, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import Typography from "../common/text-typography";
import { Button } from "../ui/button";

type AuthBiometricsProps = {
  onAuthenticated?: () => void;
};

export function AuthBiometrics({ onAuthenticated }: AuthBiometricsProps) {
  const handleAuthenticate = useCallback(async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with biometrics",
      disableDeviceFallback: true, // This only works on Android
      cancelLabel: "Cancel",
      fallbackLabel: "" // iOS only – setting empty label hides the fallback button
    });
    if (result.success) {
      onAuthenticated?.();
    }
  }, [onAuthenticated]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handleAuthenticate();
  }, [handleAuthenticate]);

  return (
    <SafeAreaView className="absolute inset-0 z-50 flex-1 bg-background p-6">
      <View className="space-y-6 flex-1 p-4">
        <View className="z-10 mb-2 gap-4 items-center justify-center flex-1">
          <LockKeyholeIcon className="size-12 self-center text-primary" />
          <Typography type="heading-small" weight="semibold">
            App is locked.
          </Typography>
          <Typography weight="regular">
            Please authenticate to continue.
          </Typography>
        </View>
        <Button
          onPress={handleAuthenticate}
          variant="default"
          size={"lg"}
          className="rounded-full bg-primary h-[48px]"
        >
          <ScanFaceIcon className="size-6 text-primary-foreground" />
          <Typography type="body-default" weight="medium" textColor="white">
            {`Unlock`}
          </Typography>
        </Button>
      </View>
    </SafeAreaView>
  );
}
