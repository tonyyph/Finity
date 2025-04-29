import { Platform } from "react-native";
import Keychain, {
  type SetOptions,
  BIOMETRY_TYPE
} from "react-native-keychain";

import CryptoJS from "react-native-crypto-js";

const IS_ANDROID = Platform.OS === "android";
const IS_IOS = Platform.OS === "ios";

export enum KeychainResultState {
  SUCCESS = "SUCCESS",
  INVALID_DATA = "INVALID_DATA",
  INVALID_KEYCHAIN = "INVALID_KEYCHAIN",
  USER_CANCELED = "USER_CANCELED",
  TOO_MANY_ATTEMPTS = "TOO_MANY_ATTEMPTS"
}

type RetrieveKeychainDataResult = {
  secret: string;
  username: string;
  state: KeychainResultState;
};

export const AESEncrypt = (data: any, secretKey: string) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return "";
  }
};
export const AESDecrypt = (cipher_text: string, secretKey: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher_text, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return "";
  }
};
export const KEYCHAIN_BIOMETRIC_TYPE = {
  FaceID: Keychain.BIOMETRY_TYPE.FACE_ID,
  TouchID: Keychain.BIOMETRY_TYPE.TOUCH_ID,
  Fingerprint: Keychain.BIOMETRY_TYPE.FINGERPRINT
} as const;

const clearKeychain = (serviceName: string) => {
  return Keychain.resetGenericPassword({ service: serviceName });
};
const clear = (serviceName: string) => {
  clearKeychain(serviceName).catch();
};
const hasUsernameInKeychain = async (username: string, serviceName: string) => {
  try {
    const result = await Keychain.getGenericPassword({
      service: serviceName
    });
    return !!result && result.username === username;
  } catch (_) {
    return false;
  }
};
const saveWithPasscode = async (
  secret: string,
  passcode: string,
  username: string,
  serviceName: string
) => {
  try {
    const storage = Keychain.STORAGE_TYPE.AES_GCM_NO_AUTH;
    let securityLevel = Keychain.SECURITY_LEVEL.ANY;
    const encrypted = AESEncrypt(secret, passcode).toString();
    if (!IS_IOS) {
      securityLevel =
        (await Keychain.getSecurityLevel()) || Keychain.SECURITY_LEVEL.ANY;
    }
    const options: SetOptions = {
      storage,
      securityLevel,
      service: serviceName
    };
    const result = await Keychain.setGenericPassword(
      username,
      encrypted,
      options
    );
    return !!result && !!result.storage;
  } catch (_) {
    return false;
  }
};
const saveWithBiometric = async (
  username: string,
  password: string,
  serviceName: string
) => {
  try {
    const storage = Keychain.STORAGE_TYPE.AES_GCM;
    let securityLevel = Keychain.SECURITY_LEVEL.ANY;
    if (!IS_IOS) {
      securityLevel =
        (await Keychain.getSecurityLevel()) || Keychain.SECURITY_LEVEL.ANY;
    }
    const options: SetOptions = {
      storage,
      securityLevel,
      service: serviceName,
      authenticationPrompt: {
        title: "Authenticate with biometrics",
        cancel: "Cancel"
      },
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET
    };
    const result = await Keychain.setGenericPassword(
      username,
      password,
      options
    );
    return !!result && !!result.storage;
  } catch (_) {
    return false;
  }
};
const retrieveWithPasscode = async (
  passcode: string,
  username: string,
  serviceName: string
) => {
  const result: RetrieveKeychainDataResult = {
    secret: "",
    username: "",
    state: KeychainResultState.INVALID_KEYCHAIN
  };
  const hasInKeychain = await hasUsernameInKeychain(username, serviceName);
  if (!hasInKeychain) {
    return result;
  }
  try {
    const data = await Keychain.getGenericPassword({
      service: serviceName
    });
    if (data) {
      result.username = data.username;
      result.secret = AESDecrypt(data.password, passcode);
    }
    if (!result.secret) {
      result.username = "";
      result.state = KeychainResultState.INVALID_DATA;
    } else {
      result.state = KeychainResultState.SUCCESS;
    }
    return result;
  } catch (_) {
    return result;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTooManyAttemptsError = async (e: any) => {
  if (IS_ANDROID) {
    const stringifiedError = JSON.stringify(e.message);
    return (
      stringifiedError.includes("code: 7") || // BIOMETRIC_ERROR_LOCKOUT
      stringifiedError.includes("code: 9") // BIOMETRIC_ERROR_LOCKOUT_PERMANENT
    ); // Too many attempts error code
  }
  return null;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isUserCanceledError = (e: any) => {
  if (IS_IOS) {
    return e && String(e?.code) === "-128";
  } else {
    // Android
    const stringifiedError = JSON.stringify(e.message);
    return (
      stringifiedError.includes("code: 13") || // android "log out" pressed
      stringifiedError.includes("code: 10") // android cancel via back button, touch outside, tap Cancel, kill app
    );
  }
};
const retrieveWithBiometric = async (
  username: string,
  promptText?: {
    title: string;
    cancel: string;
  },
  serviceName?: string
) => {
  const result: RetrieveKeychainDataResult = {
    secret: "",
    username: "",
    state: KeychainResultState.USER_CANCELED
  };
  try {
    const data = await Keychain.getGenericPassword({
      service: serviceName,
      authenticationPrompt: {
        title: promptText?.title ?? "",
        cancel: promptText?.cancel ?? ""
      }
    });
    if (data) {
      result.secret = data.password;
      result.username = data.username;
    }
    if (result.username !== username) {
      result.secret = "";
      result.username = "";
      result.state = KeychainResultState.INVALID_KEYCHAIN;
    } else if (!result.secret) {
      result.secret = "";
      result.username = "";
      result.state = KeychainResultState.INVALID_DATA;
    } else {
      result.state = KeychainResultState.SUCCESS;
    }
    return result;
  } catch (e) {
    if (await isTooManyAttemptsError(e)) {
      result.state = KeychainResultState.TOO_MANY_ATTEMPTS;
    }
    if (isUserCanceledError(e)) {
      result.state = KeychainResultState.USER_CANCELED;
    }
    return result;
  }
};
const getSupportedBiometryType = (): Promise<null | BIOMETRY_TYPE> => {
  return Keychain.getSupportedBiometryType();
};
export {
  clear,
  getSupportedBiometryType,
  hasUsernameInKeychain,
  retrieveWithBiometric,
  retrieveWithPasscode,
  saveWithBiometric,
  saveWithPasscode
};
export type { RetrieveKeychainDataResult };
