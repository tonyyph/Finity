import { Dimensions, PixelRatio, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Standard iPhone 14 Pro size for design reference
const BASE_WIDTH = 390;
const BASE_HEIGHT = 845;

// Breakpoints (could be used for layout changes)
export const BREAKPOINTS = {
  xs: 320,
  sm: 375,
  md: 414,
  lg: 428,
  xl: 768,
  xxl: 1024
} as const;

export const isSmallScreen = SCREEN_WIDTH <= 375;

export type DeviceSize = keyof typeof BREAKPOINTS;
export type ScreenOrientation = "portrait" | "landscape";

export const getDeviceSize = (width: number): DeviceSize => {
  if (width <= BREAKPOINTS.xs) return "xs";
  if (width <= BREAKPOINTS.sm) return "sm";
  if (width <= BREAKPOINTS.md) return "md";
  if (width <= BREAKPOINTS.lg) return "lg";
  if (width <= BREAKPOINTS.xl) return "xl";
  return "xxl";
};

export const currentDeviceSize = getDeviceSize(SCREEN_WIDTH);

/**
 * Scale proportionally based on screen width
 */
export const scaleOnWidth = (value: number) =>
  PixelRatio.roundToNearestPixel((SCREEN_WIDTH / BASE_WIDTH) * value);

/**
 * Scale proportionally based on screen height
 */
export const scaleOnHeight = (value: number) =>
  PixelRatio.roundToNearestPixel((SCREEN_HEIGHT / BASE_HEIGHT) * value);

/**
 * Scale using the smaller axis ratio to maintain aspect ratio
 */
export const scale = (size: number) => {
  const scaleFactor = Math.min(
    SCREEN_WIDTH / BASE_WIDTH,
    SCREEN_HEIGHT / BASE_HEIGHT
  );
  return PixelRatio.roundToNearestPixel(size * scaleFactor);
};

/**
 * Match original design size exactly, mostly used for borders or spacing
 */
export const exactDesign = (value: number) => {
  const ratio = (SCREEN_WIDTH * SCREEN_HEIGHT) / (BASE_WIDTH * BASE_HEIGHT);
  const adjusted = ratio >= 1 ? value : value * ratio;
  return Platform.OS === "android"
    ? Math.round(PixelRatio.roundToNearestPixel(adjusted))
    : Math.round(adjusted);
};

/**
 * Utility to get responsive value based on device size
 */
export type ResponsiveValue<T> = Partial<Record<DeviceSize, T>> & {
  default: T;
};

export const getResponsiveValue = <T>(values: ResponsiveValue<T>): T => {
  return values[currentDeviceSize] ?? values.default;
};
