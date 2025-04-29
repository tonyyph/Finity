import { ScanFaceIcon, TouchpadIcon } from "lucide-react-native";
import Keychain from "react-native-keychain";
import { GenericKeychain } from "./generic-keychain";
import { Storage, STORAGE_KEY } from "./storage";

export enum KeychainResultState {
  SUCCESS = "SUCCESS",
  INVALID_DATA = "INVALID_DATA",
  INVALID_KEYCHAIN = "INVALID_KEYCHAIN",
  USER_CANCELED = "USER_CANCELED",
  TOO_MANY_ATTEMPTS = "TOO_MANY_ATTEMPTS"
}

export enum KeychainServiceName {
  PASSWORD_PASSCODE_SERVICE_NAME = "FINITY_PASSWORD_PASSCODE_SERVICE_NAME",
  PASSWORD_BIOMETRICS_SERVICE_NAME = "FINITY_PASSWORD_BIOMETRICS_SERVICE_NAME"
}

export const KEYCHAIN_BIOMETRIC_TYPE = {
  FaceID: Keychain.BIOMETRY_TYPE.FACE_ID,
  TouchID: Keychain.BIOMETRY_TYPE.TOUCH_ID,
  Fingerprint: Keychain.BIOMETRY_TYPE.FINGERPRINT
} as const;

export type SUPPORTED_BIOMETRIC =
  (typeof KEYCHAIN_BIOMETRIC_TYPE)[keyof typeof KEYCHAIN_BIOMETRIC_TYPE];
class AuthKeychain {
  passcodeInstance: GenericKeychain;
  biometricInstance: GenericKeychain;
  constructor(passcodeName: string, biometricName: string) {
    this.passcodeInstance = new GenericKeychain(passcodeName);
    this.biometricInstance = new GenericKeychain(biometricName);
  }
  clear = () => {
    this.passcodeInstance.clear();
    this.biometricInstance.clear();
  };
  clearBiometric = () => {
    this.biometricInstance.clear();
  };
  savePwdWithPasscode = async (
    username: string,
    password: string,
    passcode: string
  ) => {
    return this.passcodeInstance.saveWithPasscode(password, passcode, username);
  };
  getPwdWithPasscode = async (username: string, passcode: string) => {
    return this.passcodeInstance.retrieveWithPasscode(passcode, username);
  };
  syncPwdFromPin2Biometric = async (username: string, pin: string) => {
    const { secret, state } = await this.getPwdWithPasscode(username, pin);
    if (state === KeychainResultState.SUCCESS) {
      const resultSaveBiometric =
        await this.biometricInstance.saveWithBiometric(username, secret);
      return resultSaveBiometric;
    }
    return false;
  };
  getPwdWithBiometric = async (username: string) => {
    return this.biometricInstance.retrieveWithBiometric(username, {
      title: "Xác thực sinh trắc",
      cancel: "Huỷ"
    });
  };
  getBiometricDeviceStatus = async () => {
    const previousSupportedType = await Storage.retrieve(
      STORAGE_KEY.BIOMETRIC_SUPPORTED_TYPE
    );
    const supportedType =
      (await Keychain.getSupportedBiometryType()) as SUPPORTED_BIOMETRIC;
    if (!previousSupportedType) {
      Storage.save(STORAGE_KEY.BIOMETRIC_SUPPORTED_TYPE, supportedType);
    }
    return {
      available: !!supportedType,
      supportedType: supportedType || previousSupportedType
    };
  };
  getBiometricForProfile(type: SUPPORTED_BIOMETRIC) {
    let icon = ScanFaceIcon;
    let description = "";
    let title = "dashboard.profileDashboard.biometricLogin";
    let errorTitle = "common.biometrics.canNotTurnOnBiometrics";
    let subErrorTitle = "common.biometrics.goToSettingBiometrics";
    //
    switch (type) {
      case KEYCHAIN_BIOMETRIC_TYPE.FaceID:
        description = "";
        icon = ScanFaceIcon;
        title = "dashboard.profileDashboard.faceIDLogin";
        errorTitle = "canNotTurnOnFaceId";
        subErrorTitle = "goToSettingFaceId";
        break;
      case KEYCHAIN_BIOMETRIC_TYPE.TouchID:
        icon = TouchpadIcon;
        title = "dashboard.profileDashboard.touchIDLogin";
        description = "dashboard.profileDashboard.touchIDSubtitle";
        errorTitle = "canNotTurnOnTouchId";
        subErrorTitle = "goToSettingTouchId";
        break;
      case KEYCHAIN_BIOMETRIC_TYPE.Fingerprint:
        icon = TouchpadIcon;
        title = "dashboard.profileDashboard.fingerPrintIDLogin";
        description = "dashboard.profileDashboard.fingerPrintSubtitle";
        errorTitle = "canNotTurnOnFingerprint";
        subErrorTitle = "goToSettingFingerprint";
        break;
    }
    return { title, description, icon, errorTitle, subErrorTitle };
  }
}
const instance = new AuthKeychain(
  KeychainServiceName.PASSWORD_PASSCODE_SERVICE_NAME,
  KeychainServiceName.PASSWORD_BIOMETRICS_SERVICE_NAME
);
export { AuthKeychain, instance as AuthKeychainInstance };
