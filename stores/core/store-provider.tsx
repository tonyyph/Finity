import {
  useEffect,
  useState,
  useCallback,
  type FC,
  type ReactNode
} from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useUserAuthenticateStore } from "../user-authenticate";
import { useResetAllStores } from "./use-reset-all-stores";
import { clearAsyncStorage } from "@/lib";
import { StoreIntervalUpdate } from "./store-interval-update";

export type StoreProviderProps = {
  children: ReactNode;
};

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const { userId } = useAuth();
  const { storeUserId } = useUserAuthenticateStore();
  const resetAllStores = useResetAllStores();

  // Handle storage reset when user changes
  const handleUserChange = useCallback(async () => {
    if (!userId || userId === storeUserId) return;

    try {
      await clearAsyncStorage();
      resetAllStores();
      console.log("Storage cleared due to user change.");
    } catch (error) {
      console.error("Failed to clear storage:", error);
    }
  }, [userId, storeUserId, resetAllStores]);

  useEffect(() => {
    handleUserChange().finally(() => setIsReady(true));
  }, [handleUserChange]);

  if (!isReady) return null;

  return (
    <>
      {userId && <StoreIntervalUpdate />}
      {children}
    </>
  );
};
