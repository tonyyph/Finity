import { Palette } from "@/lib/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserSettingsStore {
  enabledPushNotifications: boolean;
  setEnabledPushNotifications: (enabledPushNotifications: boolean) => void;
  enabledLocalAuth: boolean;
  setEnabledLocalAuth: (enabledLocalAuth: boolean) => void;
  preferredPalette: Palette;
  setPreferredPalette: (preferredPalette: Palette) => void;
  isFreezeCard: boolean;
  setIsFreezeCard: (isFreezeCard: boolean) => void;
  cardStatus: number;
  setCardStatus: (cardStatus: number) => void;
}

export const useUserSettingsStore = create<UserSettingsStore>()(
  persist(
    (set) => ({
      enabledPushNotifications: false,
      setEnabledPushNotifications: (enabledPushNotifications) =>
        set({ enabledPushNotifications }),
      enabledLocalAuth: false,
      setEnabledLocalAuth: (enabledLocalAuth) => set({ enabledLocalAuth }),
      preferredPalette: Palette.Default,
      setPreferredPalette: (preferredPalette) => set({ preferredPalette }),
      isFreezeCard: false,
      setIsFreezeCard: (isFreezeCard) => set({ isFreezeCard }),
      cardStatus: 0,
      setCardStatus: (cardStatus) => set({ cardStatus })
    }),
    {
      name: "user-settings-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
