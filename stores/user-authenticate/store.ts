import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserAuthenticateStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isFirst2FA: boolean;
  setIsFirst2FA: (isFirst2FA: boolean) => void;
  verificationPin: string;
  setVerificationPin: (verificationPin: string) => void;
  shouldPINLocal: boolean;
  setShouldPINLocal: (shouldPINLocal: boolean) => void;
  pinInfo: string;
  setPinInfo: (pinInfo: string) => void;
  showBottomSheetPin: boolean;
  setShowBottomSheetPin: (showBottomSheetPin: boolean) => void;
}

export const useUserAuthenticateStore = create<UserAuthenticateStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      isFirst2FA: true,
      setIsFirst2FA: (isFirst2FA) => set({ isFirst2FA }),
      verificationPin: "",
      setVerificationPin: (verificationPin) => set({ verificationPin }),
      shouldPINLocal: false,
      setShouldPINLocal: (shouldPINLocal) => set({ shouldPINLocal }),
      pinInfo: "",
      setPinInfo: (pinInfo) => set({ pinInfo }),
      showBottomSheetPin: false,
      setShowBottomSheetPin: (showBottomSheetPin) => set({ showBottomSheetPin })
    }),
    {
      name: "user-authenticate-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
