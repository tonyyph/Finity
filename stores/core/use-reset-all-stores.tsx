import { useCallback } from "react";
import { useUserAuthenticateStore } from "../user-authenticate";
import { useUserSettingsStore } from "../user-settings";
import { certificationStore } from "../certificationStore";
import { commonStore } from "../commonStore";

export const useResetAllStores = () => {
  const resetUserAuthentication = useUserAuthenticateStore(
    (state) => state._reset
  );

  const resetUserSettings = useUserSettingsStore((state) => state._reset);
  const resetCertification = certificationStore((state) => state._reset);
  const resetCommons = commonStore((state) => state._reset);

  const resetAllStores = useCallback(() => {
    resetUserAuthentication();
    resetUserSettings();
    resetCertification();
    resetCommons();
  }, [
    resetUserAuthentication,
    resetUserSettings,
    resetCertification,
    resetCommons
  ]);

  return resetAllStores;
};
