import { useCallback } from "react";
import { commonStore } from "../commonStore";
import { useUserAuthenticateStore } from "../user-authenticate";
import { useUserSettingsStore } from "../user-settings";

export const useResetAllStores = () => {
  const resetUserAuthentication = useUserAuthenticateStore(
    (state) => state._reset
  );

  const resetUserSettings = useUserSettingsStore((state) => state._reset);
  const resetCommons = commonStore((state) => state._reset);

  const resetAllStores = useCallback(() => {
    resetUserAuthentication();
    resetUserSettings();
    resetCommons();
  }, [resetUserAuthentication, resetUserSettings, resetCommons]);

  return resetAllStores;
};
