import AsyncStorage from "@react-native-async-storage/async-storage";
import { type ClassValue, clsx } from "clsx";
import { Platform } from "react-native";
import RNFS from "react-native-fs";
import { twMerge } from "tailwind-merge";

export function getFileName(filePath: string) {
  // eslint-disable-next-line no-useless-escape
  const result = filePath.replace(/.*\/([^\/]+)\.*/, "$1");
  return result;
}

export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function clearAsyncStorage() {
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  if (asyncStorageKeys.length > 0) {
    if (Platform.OS === "android") {
      await AsyncStorage.clear();
    }
    if (Platform.OS === "ios") {
      await AsyncStorage.multiRemove(asyncStorageKeys);
    }
  }
}

export const copyFileToDownloadFolder = async (filePath: string) => {
  try {
    const isExist = await RNFS.exists(filePath);

    if (isExist) {
      const fileName = getFileName(filePath);

      const directoryPath = IS_IOS
        ? RNFS.DocumentDirectoryPath
        : RNFS.DownloadDirectoryPath;

      const desPath = `${directoryPath}/${fileName}`;

      await RNFS.copyFile(filePath, desPath);
    }
  } catch (_) {
    /* empty */
  }
};
