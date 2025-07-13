// useIsScreenActive.ts
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";

export const useIsScreenActive = () => {
  const isActiveRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      isActiveRef.current = true;
      return () => {
        isActiveRef.current = false;
      };
    }, [])
  );

  return isActiveRef;
};
