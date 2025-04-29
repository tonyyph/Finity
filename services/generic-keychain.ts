import {
  clear,
  hasUsernameInKeychain,
  retrieveWithBiometric,
  retrieveWithPasscode,
  saveWithBiometric,
  saveWithPasscode
} from "./keychain";

class GenericKeychain {
  serviceName = "";
  initiated = false;
  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }
  clear = () => {
    clear(this.serviceName);
  };
  // Only use with passcode keychain
  // Using with biometric keychain will automatically trigger biometric prompt
  hasUsernameInKeychain = async (username: string) => {
    return hasUsernameInKeychain(username, this.serviceName);
  };
  saveWithPasscode = async (
    secret: string,
    passcode: string,
    username: string
  ) => {
    return saveWithPasscode(secret, passcode, username, this.serviceName);
  };
  saveWithBiometric = async (username: string, password: string) => {
    return saveWithBiometric(username, password, this.serviceName);
  };
  retrieveWithPasscode = async (passcode: string, username: string) => {
    return retrieveWithPasscode(passcode, username, this.serviceName);
  };
  // isTooManyAttemptsError = async (e: any) => {
  //   if (!IS_IOS) {
  //     const stringifiedError = JSON.stringify(e.message);
  //     return stringifiedError.includes('code: 7'); // Too many attempts error code
  //   }
  // };
  // isUserCanceledError = (e: any) => {
  //   // TODO: https://github.com/oblador/react-native-keychain/issues/609
  //   const stringifiedError = JSON.stringify(e);
  //   return (
  //     (e && String(e?.code) === '-128') || // iOS cancel
  //     stringifiedError.includes('code: 13') || // android "log out" pressed
  //     stringifiedError.includes('code: 10') // android cancel via back button
  //   );
  // };
  retrieveWithBiometric = async (
    username: string,
    promptText?: {
      title: string;
      cancel: string;
    }
  ) => {
    return retrieveWithBiometric(username, promptText, this.serviceName);
  };
}
export { GenericKeychain };
