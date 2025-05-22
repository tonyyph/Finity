import { expoSecurePersistStorage } from "@/utils";
import isEqual from "react-fast-compare";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

interface CertificationStore {
  tempUserName?: string;
  tempPassword?: string;
  reset: () => void;
}

const defaultValue = {
  tempUserName: undefined,
  tempPassword: undefined
};

export const certificationStore = createWithEqualityFn<
  CertificationStore,
  [["zustand/persist", CertificationStore]]
>(
  persist(
    (set) => ({
      ...defaultValue,
      reset: () => set({ ...defaultValue })
    }),
    {
      name: "certification-storage",
      storage: createJSONStorage(() => expoSecurePersistStorage)
    }
  ),
  isEqual
);
