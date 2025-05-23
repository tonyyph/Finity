import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect } from "react";
import { AppState, type AppStateStatus } from "react-native";
import { useUserAuthenticateStore } from "@/stores";

// Constants
const BIO_AUTH_EXPIRATION_TIME = 1000 * 60 * 1; // 1 minute

export function useLocalPIN() {
  const { isFirst2FA, shouldPINLocal, setShouldPINLocal, setPinInfo } =
    useUserAuthenticateStore();

  const changeAppStateListener = useCallback(
    async (status: AppStateStatus) => {
      console.log(" status:", status);

      if (isFirst2FA) {
        await AsyncStorage.removeItem("movedToBackgroundAt");
        return;
      }

      if (status === "inactive") {
        await AsyncStorage.removeItem("movedToBackgroundAt");
        return;
      }

      if (status === "background") {
        const now = Date.now();
        await AsyncStorage.setItem("movedToBackgroundAt", now.toString());
        return;
      }

      if (status === "active") {
        const stored = await AsyncStorage.getItem("movedToBackgroundAt");

        if (stored) {
          const diff = Date.now() - Number(stored);
          if (diff >= BIO_AUTH_EXPIRATION_TIME) {
            await AsyncStorage.removeItem("movedToBackgroundAt");
            setShouldPINLocal(true);
          }
        }
      }
    },
    [isFirst2FA, setShouldPINLocal]
  );

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      changeAppStateListener
    );
    return () => subscription.remove();
  }, [changeAppStateListener]);

  return {
    shouldPINLocal,
    setShouldPINLocal,
    setPinInfo
  };
}
