import { commonStore } from "@/stores/commonStore";
import { ComponentType, memo, MemoExoticComponent } from "react";
import fastCompare from "react-fast-compare";
import { Dimensions, Platform, PixelRatio } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
const BASE_HEIGHT = 845; // iPhone 14 Pro size (your original base)
const BASE_WIDTH = 390; // iPhone 14 Pro size

/** Scale based on screen height */
export const scaleOnHeight = (value: number) =>
  (SCREEN_HEIGHT / BASE_HEIGHT) * value;

/** Scale based on screen width */
export const scaleOnWidth = (value: number) =>
  (SCREEN_WIDTH / BASE_WIDTH) * value;

/** Platform-agnostic scaling based on PixelRatio */
export const scale = (size: number) => {
  const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
  const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT;
  const scaleFactor = Math.min(scaleWidth, scaleHeight);

  return PixelRatio.roundToNearestPixel(size * scaleFactor);
};

export function memoFC<T extends ComponentType<any>>(
  component: T,
  ignoreProps?: string[]
): MemoExoticComponent<T> {
  return memo(component, (prev, next) => {
    if (ignoreProps?.length) {
      const prevProps = { ...prev };
      const nextProps = { ...next };
      ignoreProps.forEach((prop) => {
        delete (prevProps as any)[prop];
        delete (nextProps as any)[prop];
      });
      return fastCompare(prevProps, nextProps);
    }
    return fastCompare(prev, next);
  });
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const showLoading = () => commonStore.setState({ isLoading: true });
export const hideLoading = () => commonStore.setState({ isLoading: false });

/**
 * Wraps async function with loading indicator
 */
export const actionWithLoading = <T extends any>(cb: () => Promise<T>) => {
  return async () => {
    showLoading();
    try {
      const result = await cb();
      hideLoading();
      return result;
    } catch (error) {
      hideLoading();
      throw error;
    }
  };
};

/**
 * Wraps async function with 5-second timeout
 */
export const actionWithTimeout = <T extends any>(
  cb: () => Promise<T>,
  onCallback: (result: T | null) => void
) => {
  return async () => {
    const timeout = new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Operation timed out")), 5000)
    );
    const result = await Promise.race([cb(), timeout]).catch(() => null);
    const timedOut = result === null;
    onCallback(result);
    return { result, timedOut };
  };
};

/**
 * Scales a value based on actual screen area compared to a pivot design size.
 * For Android, we use PixelRatio-adjusted value.
 */
export const exactDesign = (value: number) => {
  const ratio = (SCREEN_HEIGHT * SCREEN_WIDTH) / (BASE_HEIGHT * BASE_WIDTH);

  const adjusted = ratio >= 1 ? value : value * ratio;
  return Platform.OS === "android"
    ? Math.round(PixelRatio.roundToNearestPixel(adjusted))
    : Math.round(adjusted);
};

/**
 * Format numbers with thousand separators and fixed decimal places
 */
export function formatNumber({
  value,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
}: {
  value: string | number;
  decimalCount?: number;
  decimal?: string;
  thousands?: string;
}): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return `${0}${decimal}00`;

  const negativeSign = num < 0 ? "-" : "";
  const fixed = Math.abs(num).toFixed(decimalCount);
  const [integerPart, decimalPart] = fixed.split(".");
  const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);

  return `${negativeSign}${formatted}${
    decimalCount ? decimal + decimalPart : ""
  }`;
}
