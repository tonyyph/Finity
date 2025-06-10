import AsyncStorage from "@react-native-async-storage/async-storage";
import isEqual from "react-fast-compare";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

interface CertificationStore {
  tempUserName?: string;
  tempPassword?: string;
  _reset: () => void;
}

const defaultValue = {
  tempUserName: "",
  tempPassword: ""
};

export const certificationStore = createWithEqualityFn<
  CertificationStore,
  [["zustand/persist", CertificationStore]]
>(
  persist(
    (set) => ({
      ...defaultValue,
      _reset: () => set({ ...defaultValue })
    }),
    {
      name: "certification-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  ),
  isEqual
);
