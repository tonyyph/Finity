import { useUserSettingsStore } from "@/stores";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";

export const useBiometrics = () => {
  const { enabledLocalAuth, setEnabledLocalAuth } = useUserSettingsStore();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [supportType, setSupportType] = useState<
    LocalAuthentication.AuthenticationType[]
  >([]);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      const supportType =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (!compatible || !enrolled) {
        setEnabledLocalAuth(false);
      }
      setSupportType(supportType);
      setIsBiometricSupported(compatible && enrolled);
    })();
  }, [setEnabledLocalAuth]);
  return {
    bioStatus: enabledLocalAuth,
    isBiometricSupported,
    supportType
  };
};
