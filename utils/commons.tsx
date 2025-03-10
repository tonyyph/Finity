import { commonStore } from "@/stores/commonStore";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { ComponentType, memo, MemoExoticComponent } from "react";
import fastCompare from "react-fast-compare";
import { Dimensions } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const scaleOnHeight = (value: number) => (SCREEN_HEIGHT / 845) * value;
export const scaleOnWidth = (value: number) => (SCREEN_WIDTH / 390) * value;

export function memoFC<T extends ComponentType<any>>(
  component: T,
  ignoreProps?: string[]
): MemoExoticComponent<T> {
  return memo(component, (prev, next) => {
    if (ignoreProps?.length) {
      const prevProps = { ...prev };
      const nextProps = { ...next };
      ignoreProps.forEach((prop) => {
        // @ts-ignore
        delete prevProps[prop];
        // @ts-ignore
        delete nextProps[prop];
      });
      return fastCompare(prevProps, nextProps);
    }
    return fastCompare(prev, next);
  });
}

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const showLoading = () => commonStore.setState({ isLoading: true });

export const hideLoading = () => commonStore.setState({ isLoading: false });

export const actionWithLoading = <T extends any>(cb: () => Promise<T>) => {
  return async () => {
    let result;
    showLoading();
    try {
      result = await cb();
    } catch (error) {
      hideLoading();
      throw error;
    }
    hideLoading();
    return result;
  };
};

export const actionWithTimeout = <T extends any>(
  cb: () => Promise<T>,
  onCallback: (result: T | null) => void
) => {
  return async () => {
    const timeout = new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Operation timed out")), 5000)
    );
    const result = await Promise.race([cb(), timeout]).catch(() => null);
    onCallback(result);
    const timedOut = result instanceof Error;

    return { result, timedOut };
  };
};

const pivotWidth = 390;
const pivotHeight = 844;

export const exactDesign = (value: any) => {
  const ratio = (SCREEN_HEIGHT * SCREEN_WIDTH) / (pivotHeight * pivotWidth);
  return ratio >= 1 ? value : value * ratio;
};

export function formatNumber({
  value,
  decimalCount = 2,
  decimal = ".",
  thousands = ",",
}: {
  value: string | number;
  decimalCount?: number;
  decimal?: string;
  thousands?: string;
}): string {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return `${0}${decimal}00`;

  const negativeSign = num < 0 ? "-" : "";
  const absoluteAmount = Math.abs(num);
  const fixedAmount = absoluteAmount.toFixed(decimalCount);
  const [integerPart, decimalPart] = fixedAmount.split(".");

  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousands
  );

  return `${negativeSign}${formattedInteger}${
    decimalCount ? decimal + decimalPart : ""
  }`;
}

export const ti18n = (value: string) => {
  const { i18n } = useLingui();
  return t(i18n)`${value}`;
};
