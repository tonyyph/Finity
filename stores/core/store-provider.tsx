import { clearAsyncStorage } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-expo";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import {
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useState
} from "react";
import { StoreIntervalUpdate } from "./store-interval-update";
import { useResetAllStores } from "./use-reset-all-stores";
import { useUserAuthenticateStore } from "../user-authenticate";

export type StoreProviderProps = {
  children: ReactNode;
};

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const { userId } = useAuth();
  const resetAllStores = useResetAllStores();
  const { storeUserId } = useUserAuthenticateStore();

  // console.log(" storeUserId:", storeUserId);

  const handleUserChange = useCallback(async () => {
    // console.log("current user id", userId);
    if (userId === storeUserId || !userId) {
      return;
    }

    await clearAsyncStorage();
    resetAllStores();

    console.log("Storage cleared");
  }, [userId, resetAllStores, storeUserId]);

  useEffect(() => {
    handleUserChange().catch((error) => {
      console.error("Failed to clear storage", error);
    });

    setIsReady(true);
  }, [handleUserChange]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      {userId && <StoreIntervalUpdate />}
      {children}
    </>
  );
};
