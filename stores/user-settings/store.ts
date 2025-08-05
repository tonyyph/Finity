import { Palette } from "@/lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserSettingsStore {
  _reset: () => void;
  enabledPushNotifications: boolean;
  setEnabledPushNotifications: (enabledPushNotifications: boolean) => void;
  enabledLocalAuth: boolean;
  setEnabledLocalAuth: (enabledLocalAuth: boolean) => void;
  preferredPalette: Palette;
  setPreferredPalette: (preferredPalette: Palette) => void;
}

const defaultValue = {
  enabledPushNotifications: false,
  enabledLocalAuth: false,
  preferredPalette: Palette.Default
};

export const useUserSettingsStore = create<UserSettingsStore>()(
  persist(
    (set) => ({
      _reset: () => set({ ...defaultValue }),
      enabledPushNotifications: false,
      setEnabledPushNotifications: (enabledPushNotifications) =>
        set({ enabledPushNotifications }),
      enabledLocalAuth: false,
      setEnabledLocalAuth: (enabledLocalAuth) => set({ enabledLocalAuth }),
      preferredPalette: Palette.Default,
      setPreferredPalette: (preferredPalette) => set({ preferredPalette })
    }),
    {
      name: "user-settings-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
