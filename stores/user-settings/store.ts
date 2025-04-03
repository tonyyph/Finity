import { Palette } from "@/lib/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserSettingsStore {
  preferredCurrency?: string;
  setPreferredCurrency: (preferredCurrency: string) => void;
  enabledPushNotifications: boolean;
  setEnabledPushNotifications: (enabledPushNotifications: boolean) => void;
  activeCard: number;
  setActiveCard: (activeCard: number) => void;
  enabledLocalAuth: boolean;
  setEnabledLocalAuth: (enabledLocalAuth: boolean) => void;
  preferredPalette: Palette;
  setPreferredPalette: (preferredPalette: Palette) => void;
  hideTabBarStatus: boolean;
  setHideTabBarStatus: (hideTabBarStatus: boolean) => void;
  isFreezeCard: boolean;
  setIsFreezeCard: (isFreezeCard: boolean) => void;
}

export const useUserSettingsStore = create<UserSettingsStore>()(
  persist(
    (set) => ({
      preferredCurrency: undefined,
      setPreferredCurrency: (preferredCurrency) => set({ preferredCurrency }),
      enabledPushNotifications: false,
      setEnabledPushNotifications: (enabledPushNotifications) =>
        set({ enabledPushNotifications }),
      activeCard: 0,
      setActiveCard: (activeCard) => set({ activeCard }),
      enabledLocalAuth: false,
      setEnabledLocalAuth: (enabledLocalAuth) => set({ enabledLocalAuth }),
      preferredPalette: Palette.Default,
      setPreferredPalette: (preferredPalette) => set({ preferredPalette }),
      hideTabBarStatus: false,
      setHideTabBarStatus: (hideTabBarStatus) => set({ hideTabBarStatus }),
      isFreezeCard: true,
      setIsFreezeCard: (isFreezeCard) => set({ isFreezeCard })
    }),
    {
      name: "user-settings-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
