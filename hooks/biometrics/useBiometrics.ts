import { useUserSettingsStore } from "@/stores/user-settings/store";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect } from "react";

export const useBiometrics = () => {
  const { enabledLocalAuth, setEnabledLocalAuth } = useUserSettingsStore();

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (!compatible || !enrolled) {
        setEnabledLocalAuth(false);
      }
    })();
  }, [setEnabledLocalAuth]);
  return {
    bioStatus: enabledLocalAuth
  };
};
