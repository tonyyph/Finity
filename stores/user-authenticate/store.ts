import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserAuthenticateStore {
  _reset: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  verificationPin: string;
  setVerificationPin: (verificationPin: string) => void;
  shouldPINLocal: boolean;
  setShouldPINLocal: (shouldPINLocal: boolean) => void;
  pinInfo: string;
  setPinInfo: (pinInfo: string) => void;
  showBottomSheetPin: boolean;
  setShowBottomSheetPin: (showBottomSheetPin: boolean) => void;
  storeUserId: string | null | undefined;
  setStoreUserId: (storeUserId: string | null | undefined) => void;
}

const defaultValue = {
  isLoggedIn: false,
  verificationPin: "",
  shouldPINLocal: false,
  pinInfo: "",
  showBottomSheetPin: false,
  storeUserId: null
};

export const useUserAuthenticateStore = create<UserAuthenticateStore>()(
  persist(
    (set) => ({
      _reset: () => set({ ...defaultValue }),
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      verificationPin: "",
      setVerificationPin: (verificationPin) => set({ verificationPin }),
      shouldPINLocal: false,
      setShouldPINLocal: (shouldPINLocal) => set({ shouldPINLocal }),
      pinInfo: "",
      setPinInfo: (pinInfo) => set({ pinInfo }),
      showBottomSheetPin: false,
      setShowBottomSheetPin: (showBottomSheetPin) =>
        set({ showBottomSheetPin }),
      storeUserId: null,
      setStoreUserId: (storeUserId) => set({ storeUserId })
    }),
    {
      name: "user-authenticate-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
