import AsyncStorage from "@react-native-async-storage/async-storage";
import isEqual from "react-fast-compare";
import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

interface UserStore {
  userProfile?: UserProfile;
  pinInfo?: string;
  cardDetailInfo?: CardDetailInfo;
}

const defaultValue: UserStore = {};

export const userStore = createWithEqualityFn<
  UserStore,
  [["zustand/persist", UserStore]]
>(
  persist(
    () => ({
      ...defaultValue
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  ),
  isEqual
);
