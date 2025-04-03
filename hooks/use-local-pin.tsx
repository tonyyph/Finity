import { useUserAuthenticateStore } from "@/stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";

// 30 minutes
const BIO_AUTH_EXPIRATION_TIME = 1000 * 60 * 30;

const BIO_TEN_SECONDS = 1000 * 10; //TODO: remove this one

export function useLocalPIN() {
  const [shouldPINLocal, setShouldPINLocal] = useState(false);
  const { isFirst2FA } = useUserAuthenticateStore();

  const changeAppStateListener = useCallback(
    async (status: AppStateStatus) => {
      if (isFirst2FA) {
        AsyncStorage.removeItem("movedToBackgroundAt");
        return;
      }

      console.log("status", status);

      if (status === "background") {
        const date = Date.now();
        await AsyncStorage.setItem("movedToBackgroundAt", date.toString());
      }

      if (status === "active") {
        const date = await AsyncStorage.getItem("movedToBackgroundAt");
        if (date && Date.now() - Number(date) >= BIO_TEN_SECONDS) {
          await AsyncStorage.removeItem("movedToBackgroundAt");
          setShouldPINLocal(true);
        }
      }
    },
    [isFirst2FA]
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
    setShouldPINLocal
  };
}
