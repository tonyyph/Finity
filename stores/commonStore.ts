import AsyncStorage from "@react-native-async-storage/async-storage";
import isEqual from "react-fast-compare";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

interface CommonStore {
  isLoading: boolean;
  networkName: string;
  _reset: () => void;
}

const defaultValue = {
  isLoading: false,
  networkName: ""
};

export const commonStore = createWithEqualityFn<
  CommonStore,
  [["zustand/persist", CommonStore]]
>(
  persist(
    (set) => ({
      ...defaultValue,
      _reset: () => set({ ...defaultValue })
    }),
    {
      name: "commons-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  ),
  isEqual
);
