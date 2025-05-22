import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export async function saveSecureString(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getSecureStringFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export async function deleteSecureString(key: string) {
  return await SecureStore.deleteItemAsync(key);
}

export const expoSecurePersistStorage = {
  getItem: (name: string) => SecureStore.getItem(name),
  setItem: (name: string, value: string) => SecureStore.setItem(name, value),
  removeItem: (name: string) => SecureStore.deleteItemAsync(name)
};

export const resetUserSettings = async () => {
  try {
    await AsyncStorage.removeItem("user-settings-storage");
  } catch (e) {
    console.error("Failed to reset user settings:", e);
  }
};

export const resetUserProfile = async () => {
  try {
    await AsyncStorage.removeItem("user-profile-storage");
    await AsyncStorage.removeItem("user-storage");
  } catch (e) {
    console.error("Failed to reset user profile:", e);
  }
};

export const resetUserAuthentication = async () => {
  try {
    await AsyncStorage.removeItem("user-authenticate-storage");
  } catch (e) {
    console.error("Failed to reset user authenticate:", e);
  }
};

export const resetAllStorage = async () => {
  await resetUserSettings();
  await resetUserProfile();
  await resetUserAuthentication();
  expoSecurePersistStorage.removeItem("certification-storage");
  expoSecurePersistStorage.removeItem("user-storage");
};
