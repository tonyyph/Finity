import { AxiosError } from "axios";
import { ErrorType, ParsedError } from "../types";

/**
 * Parses any error thrown during an Axios request into a standardized structure.
 *
 * This function distinguishes between:
 * - Axios errors with a response (e.g., status code 4xx or 5xx)
 * - Network errors (request sent but no response received)
 * - Generic JavaScript errors
 *
 * It also extracts useful metadata for tracking/logging purposes (URL, method, status code).
 *
 * @param {unknown} error - The error thrown from an Axios request or any async function.
 * @returns {ParsedError} A standardized object containing type, message, and optional debug info.
 *
 * @example
 * ```ts
 * try {
 *   await axios.post('/api/auth/signup', payload)
 * } catch (error) {
 *   const parsed = parseError(error)
 *   console.log(parsed.type)    // "AXIOS_ERROR"
 *   console.log(parsed.message) // "Validation failed"
 *   console.log(parsed.userInfo?.statusCode) // 400
 *   console.log(JSON.stringify(parsed.userInfo?.raw, null, 2)) // see below
 * }
 * ```
 *
 * Example output:
 * ```json
 * {
 *   "type": "AXIOS_ERROR",
 *   "message": "Validation failed",
 *   "userInfo": {
 *     "statusCode": 400,
 *     "url": "https://example.com/api/auth/signup",
 *     "method": "post",
 *     "errorName": "AxiosError",
 *     "raw": {
 *       "status_code": 400,
 *       "error_message": "Validation failed",
 *       "error_id": 400001,
 *       "error_details": [
 *         {
 *           "field": "confirmPassword",
 *           "constraints": {
 *             "isNotEmpty": "validation.required",
 *             "equals": "validation.confirm_password"
 *           },
 *           "target": {
 *             "email": "john@example.com",
 *             "password": "••••••",
 *             "name": "John",
 *             "countryCode": "US",
 *             "referralCode": "",
 *             "preferredLocale": "en",
 *             "acceptTnc": "1"
 *           }
 *         }
 *       ]
 *     }
 *   }
 * }
 * ```
 */
export function parseError(error: unknown): ParsedError {
  const fallback = "Something went wrong. Please try again.";

  if (error instanceof AxiosError) {
    const statusCode = error.response?.status;
    const url = error.config?.url;
    const method = error.config?.method;
    const name = error.name;
    const responseData = error.response?.data;

    // Case 1: JSON-like response body
    if (responseData && typeof responseData === "object") {
      const data = responseData as {
        error?: string;
        message?: string;
        detail?: string;
        error_message?: string;
      };
      return {
        type: ErrorType.Axios,
        message:
          data.error ||
          (Array.isArray(responseData) && responseData[0]?.message) ||
          data.detail ||
          data.error_message ||
          error.message ||
          fallback,
        userInfo: {
          statusCode,
          url,
          method,
          errorName: name,
          raw: responseData
        }
      };
    }

    // Case 2: plain text or HTML error body
    if (typeof responseData === "string") {
      return {
        type: ErrorType.Axios,
        message: responseData,
        userInfo: {
          statusCode,
          url,
          method,
          errorName: name,
          raw: responseData
        }
      };
    }

    // Case 3: no response received
    if (error.request) {
      return {
        type: ErrorType.Network,
        message:
          "No response from server. Please check your internet connection.",
        userInfo: { url, method, errorName: name }
      };
    }

    // Case 4: config/setup issue
    return {
      type: ErrorType.Generic,
      message: error.message || fallback,
      userInfo: { url, method, errorName: name }
    };
  }

  // Case 5: non-Axios JS error
  if (error instanceof Error) {
    return {
      type: ErrorType.Generic,
      message: error.message,
      userInfo: { errorName: error.name }
    };
  }

  // Unknown fallback
  return {
    type: ErrorType.Generic,
    message: fallback
  };
}
