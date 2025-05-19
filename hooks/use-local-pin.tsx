import { useUserAuthenticateStore } from "@/stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect } from "react";
import { AppState, type AppStateStatus } from "react-native";

// 1 minutes / 20s
const BIO_AUTH_EXPIRATION_TIME = 1000 * 20 * 1;

// const BIO_TEN_SECONDS = 1000 * 10;

export function useLocalPIN() {
  const { isFirst2FA, shouldPINLocal, setShouldPINLocal, setPinInfo } =
    useUserAuthenticateStore();

  const changeAppStateListener = useCallback(
    async (status: AppStateStatus) => {
      console.log(" status:", status);

      if (isFirst2FA) {
        AsyncStorage.removeItem("movedToBackgroundAt");
        return;
      }

      if (status === "background") {
        const date = Date.now();
        await AsyncStorage.setItem("movedToBackgroundAt", date.toString());
        if (date && Date.now() - Number(date) >= BIO_AUTH_EXPIRATION_TIME) {
          await AsyncStorage.removeItem("movedToBackgroundAt");
          setShouldPINLocal(true);
        }
      }

      if (status === "active") {
        const date = await AsyncStorage.getItem("movedToBackgroundAt");
        if (date && Date.now() - Number(date) >= BIO_AUTH_EXPIRATION_TIME) {
          await AsyncStorage.removeItem("movedToBackgroundAt");
          setShouldPINLocal(true);
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
    return subscription.remove;
  }, [changeAppStateListener]);

  return {
    shouldPINLocal,
    setShouldPINLocal,
    setPinInfo
  };
}
