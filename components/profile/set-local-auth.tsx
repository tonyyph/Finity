import { useUserSettingsStore } from "@/stores";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import { MenuItem, toast, FaceIDIcon } from "../common";
import { Switch } from "../ui";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

export function SetLocalAuth() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [supportType, setSupportType] = useState<
    LocalAuthentication.AuthenticationType[]
  >([]);
  const { enabledLocalAuth, setEnabledLocalAuth } = useUserSettingsStore();

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();

      const enrolled = await LocalAuthentication.isEnrolledAsync();
      const supportType =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      setSupportType(supportType);
      setIsBiometricSupported(compatible && enrolled);
    })();
  }, []);

  async function handleToggleLocalAuth(enabled: boolean) {
    Haptics.selectionAsync();

    if (!enabledLocalAuth) {
      router.push({
        pathname: "/biometrics",
        params: {
          typeAuthentication: supportType
        }
      });
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with biometrics",
      disableDeviceFallback: true, // This only works on Android
      cancelLabel: "Cancel",
      fallbackLabel: "" // iOS only – setting empty label hides the fallback button
    });
    if (result.success) {
      setEnabledLocalAuth(enabled);
    } else {
      if (!!result?.error && result?.error === "user_cancel") {
      }
      toast.error(
        result.warning ??
          `Can not ${
            enabledLocalAuth ? "disabled" : "enabled"
          } biometrics at the moment`
      );
    }
  }

  if (!isBiometricSupported) {
    return null;
  }

  return (
    <MenuItem
      label={`Biometrics`}
      icon={FaceIDIcon}
      rightSection={
        <Switch
          checked={enabledLocalAuth}
          onCheckedChange={handleToggleLocalAuth}
        />
      }
    />
  );
}
