/**
 * Represents the type of error that occurred during an Axios request.
 */
export enum ErrorType {
  Axios = "AXIOS_ERROR",
  Network = "NETWORK_ERROR",
  Generic = "GENERIC_ERROR"
}

/**
 * The standardized error object returned by the `parseError` function.
 */
export type ParsedError = {
  type: ErrorType;
  message: string;
  userInfo?: {
    statusCode?: number;
    url?: string;
    method?: string;
    errorName?: string;
    raw?: unknown; // Raw server response (if any)
  };
};

export type ErrorKey =
  | "EMAIL_NOT_FOUND"
  | "AUTH_CODE_INVALID"
  | "PASSWORD_MISMATCH"
  | "ACCOUNT_LOCKED"
  | "CURRENT_PASSWORD_INVALID"
  | "NEW_PASSWORD_REUSED"
  | "CONFIRM_PASSWORD_MISMATCH"
  | "INTERNAL_SERVER_ERROR"
  | "KYC_VERIFICATION_FAILED"
  | "BALANCE_INSUFFICIENT"
  | "UNKNOWN_ERROR";
