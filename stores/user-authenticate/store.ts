import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserAuthenticateStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoginWithPin: boolean;
  setIsLoginWithPin: (isLoginWithPin: boolean) => void;
  isFirst2FA: boolean;
  setIsFirst2FA: (isFirst2FA: boolean) => void;
  verificationPin: string;
  setVerificationPin: (verificationPin: string) => void;
}

export const useUserAuthenticateStore = create<UserAuthenticateStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      isLoginWithPin: false,
      setIsLoginWithPin: (isLoginWithPin) => set({ isLoginWithPin }),
      isFirst2FA: true,
      setIsFirst2FA: (isFirst2FA) => set({ isFirst2FA }),
      verificationPin: "",
      setVerificationPin: (verificationPin) => set({ verificationPin })
    }),
    {
      name: "user-authenticate-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
