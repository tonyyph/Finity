import { useRef, useState } from "react";
import { DeviceEventEmitter } from "react-native";
import { useMemoFunc } from "./useMemoFunc";

export const useRegisterDataCallback = () => {
  const [key, setKey] = useState<number>(Date.now());
  const resolverRef = useRef<(value: any | PromiseLike<any>) => void>();
  const registerDataCallback = useMemoFunc(<T>(customKey?: number) => {
    return new Promise<{ data: T; newKey: number }>((resolve) => {
      resolverRef.current = resolve;
      const eventName = `event.navigation.${customKey ?? key}`;
      console.log("event.navigation", eventName);
      const unSub = DeviceEventEmitter.addListener(eventName, (eventData) => {
        const newKey = new Date().getTime();
        setKey(newKey);
        unSub.remove();
        resolve({ newKey, data: eventData });
      });
    });
  });

  return { key, registerDataCallback };
};
