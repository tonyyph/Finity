import { clerk } from "@/lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import uuid from "react-native-uuid";

export const refreshToken = async (data: RefreshTokenRequest) => {
  return await axios.post<RefreshTokenResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh-token`,
    {
      refreshToken: data.refreshToken
    }
  );
};

export const getLoginTime = async () => {
  const token = await clerk.session?.getToken();

  return await axios.post<any>(
    `${process.env.EXPO_PUBLIC_API_URL}/users/login-time`,
    {},
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const getUserProfile = async () => {
  const token = await clerk.session?.getToken();
  return await axios.get<UserResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/user`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const getSettingProfile = async () => {
  const token = await clerk.session?.getToken();
  return await axios.get<UserValue>(
    `${process.env.EXPO_PUBLIC_API_URL}/settings/profile`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const getCardHolderCurrent = async () => {
  const token = await clerk.session?.getToken();
  return await axios.get<UserCardInfo>(
    `${process.env.EXPO_PUBLIC_API_URL}/cardholders/current`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const getPINInfo = async () => {
  const token = await clerk.session?.getToken();
  if (!token) throw new Error("No session token found");

  let deviceId = await AsyncStorage.getItem("device-id");

  if (!deviceId) {
    deviceId = uuid.v4() as string;
    await AsyncStorage.setItem("device-id", deviceId);
  }

  return await axios.post<PinResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/cards/pin-mobile`,
    { DeviceId: deviceId },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net",
        "X-DeviceId": deviceId,
        DeviceId: deviceId
      }
    }
  );
};

export const activeCard = async (last4Digits: string) => {
  const token = await clerk.session?.getToken();
  return await axios.post<any>(
    `${process.env.EXPO_PUBLIC_API_URL}/cards/activate`,
    { last4Digits: last4Digits },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const handleFreeze = async (cardHolderId: number) => {
  const token = await clerk.session?.getToken();
  return await axios.post<any>(
    `${process.env.EXPO_PUBLIC_API_URL}/cardholders/freeze-card`,
    {
      cardholderId: cardHolderId
    },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};
export const handleUnFreeze = async (cardHolderId: number) => {
  const token = await clerk.session?.getToken();
  return await axios.post<any>(
    `${process.env.EXPO_PUBLIC_API_URL}/cardholders/unfreeze-card`,
    {
      cardholderId: cardHolderId
    },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const getCardDetail = async () => {
  const token = await clerk.session?.getToken();

  let deviceId = await AsyncStorage.getItem("device-id");

  if (!deviceId) {
    deviceId = uuid.v4() as string;
    await AsyncStorage.setItem("device-id", deviceId);
  }

  return await axios.post<CardDetailInfo>(
    `${process.env.EXPO_PUBLIC_API_URL}/cards/details-mobile`,
    { DeviceId: deviceId },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net",
        "X-DeviceId": deviceId,
        DeviceId: deviceId
      }
    }
  );
};

export const getCardTransaction = async (data: ListTransactionRequest) => {
  const token = await clerk.session?.getToken();

  if (!token) {
    throw new Error("No auth token found");
  }

  const params: Record<string, any> = {
    cursor: data?.cursor ?? 0,
    take: data?.take ?? 20,
    search: data?.search ?? ""
  };

  if (data?.types && data.types.length > 0) {
    params.types = data.types;
  }

  return axios.get<ListTransactionResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/account/paginated-card-transactions`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      params,
      paramsSerializer: (params) => {
        const query = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((v) => query.append(key, String(v)));
          } else {
            query.append(key, String(value));
          }
        });
        return query.toString();
      }
    }
  );
};

export const getPointTransaction = async (data: ListTransactionRequest) => {
  const token = await clerk.session?.getToken();

  if (!token) {
    throw new Error("No auth token found");
  }

  const url = `${process.env.EXPO_PUBLIC_API_URL}/account/paginated-point-transactions`;

  const params: Record<string, any> = {
    cursor: data?.cursor ?? 0,
    take: data?.take ?? 20,
    search: data?.search ?? ""
  };

  if (data?.types && data.types.length > 0) {
    params.types = data.types;
  }

  return axios.get<ListTransactionResponse>(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    params,
    paramsSerializer: (params) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => query.append(key, String(v)));
        } else {
          query.append(key, String(value));
        }
      });
      return query.toString();
    }
  });
};

export const sendMobileVerificationCode = async (mobileNumber: string) => {
  const token = await clerk.session?.getToken();
  return await axios.post<VerificationCodeResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/users/send-mobile-verification-code`,
    { mobileNumber: mobileNumber },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const changePhoneNumber = async (data: ChangePhoneNumberRequest) => {
  const token = await clerk.session?.getToken();
  return await axios.put<any>(
    `${process.env.EXPO_PUBLIC_API_URL}/user/profile`,
    { ...data },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const changeHomeAddress = async (data: ChangeHomeAddressRequest) => {
  const token = await clerk.session?.getToken();
  return await axios.put<any>(
    `${process.env.EXPO_PUBLIC_API_URL}/user/profile`,
    {
      ...data
    },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const generatePointStatements = async (data: StatementProps) => {
  const token = await clerk.session?.getToken();
  return await axios.post<GenerateFileResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/statements/points`,
    { month: data?.month, year: data?.year },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const generateCardStatements = async (data: StatementProps) => {
  const token = await clerk.session?.getToken();
  return await axios.post<GenerateFileResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/statements/card`,
    { month: data?.month, year: data?.year },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const getListFAQ = async () => {
  const token = await clerk.session?.getToken(); // Make sure this is awaited

  if (!token) {
    throw new Error("No auth token found");
  }

  const params = {};

  return axios.get<ListTransactionResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/faq`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      params
    }
  );
};

export const reportOrDamageCard = async (isDamaged: boolean) => {
  const token = await clerk.session?.getToken();
  return await axios.post<any>(
    `${process.env.EXPO_PUBLIC_API_URL}/cards/report-card`,
    { isDamaged: isDamaged },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const getCardHolders = async () => {
  const token = await clerk.session?.getToken(); // Make sure this is awaited

  if (!token) {
    throw new Error("No auth token found");
  }

  return axios.get<UserCardHolder[]>(
    `${process.env.EXPO_PUBLIC_API_URL}/cardHolders/get-cardholders`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const getSettingInfo = async () => {
  const token = await clerk.session?.getToken();
  return await axios.get<any>(`${process.env.EXPO_PUBLIC_API_URL}/settings`, {
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
    }
  });
};

export const requestCard = async (data: RequestCardInfo) => {
  const token = await clerk.session?.getToken();
  return await axios.post<any>(
    `${process.env.EXPO_PUBLIC_API_URL}/cards/issue-self`,
    {
      addressLine1: data?.addressLine1,
      addressLine2: data?.addressLine2,
      city: data?.city,
      postCode: data?.postcode,
      country: ""
    },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://as-rwd-uks-rewards-api-dev.azurewebsites.net"
      }
    }
  );
};

export const handleLoadCard = async (data: LoadCardRequest) => {
  const token = await clerk.session?.getToken();

  if (!token) throw new Error("No session token found");

  let deviceId = await AsyncStorage.getItem("device-id");

  if (!deviceId) {
    deviceId = uuid.v4() as string;
    await AsyncStorage.setItem("device-id", deviceId);
  }

  return await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/PersonalPoints/load-points-mobile`,
    {
      pointsAmount: data.pointsAmount,
      DeviceId: deviceId
    },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-DeviceId": deviceId,
        DeviceId: deviceId
      }
    }
  );
};

export const handleSendPoint = async (data: SendPointRequest) => {
  const token = await clerk.session?.getToken();
  if (!token) throw new Error("No session token found");

  let deviceId = await AsyncStorage.getItem("device-id");
  if (!deviceId || typeof deviceId !== "string") {
    deviceId = uuid.v4() as string;
    await AsyncStorage.setItem("device-id", deviceId);
  }

  return await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/accounts/send-points-mobile`,
    {
      pointsAmount: data.pointsAmount,
      destinationUserId: data.destinationUserId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-DeviceId": deviceId
      }
    }
  );
};

export const getConfirmationDetails = async (transactionId: number) => {
  const token = await clerk.session?.getToken();
  if (!token) throw new Error("No session token found");

  let deviceId = await AsyncStorage.getItem("device-id");
  if (!deviceId || typeof deviceId !== "string") {
    deviceId = uuid.v4() as string;
    await AsyncStorage.setItem("device-id", deviceId);
  }

  try {
    return await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/accounts/get-confirmation-details/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-DeviceId": deviceId,
          Accept: "application/json"
        }
      }
    );
  } catch (err: any) {
    console.error(
      "❌ getConfirmationDetails error:",
      err?.response?.data || err.message
    );
    throw err;
  }
};

export const getPersonalPoints = async () => {
  const token = await clerk.session?.getToken();
  if (!token) throw new Error("No session token found");

  let deviceId = await AsyncStorage.getItem("device-id");
  if (!deviceId || typeof deviceId !== "string") {
    deviceId = uuid.v4() as string;
    await AsyncStorage.setItem("device-id", deviceId);
  }

  try {
    return await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/PersonalPoints`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-DeviceId": deviceId,
          Accept: "application/json"
        }
      }
    );
  } catch (err: any) {
    console.error(
      "❌ getPersonalPoints error:",
      err?.response?.data || err.message
    );
    throw err;
  }
};

export const getPersonalCard = async () => {
  const token = await clerk.session?.getToken();
  if (!token) throw new Error("No session token found");

  let deviceId = await AsyncStorage.getItem("device-id");
  if (!deviceId || typeof deviceId !== "string") {
    deviceId = uuid.v4() as string;
    await AsyncStorage.setItem("device-id", deviceId);
  }

  try {
    return await axios.get<CardHolderResponse>(
      `${process.env.EXPO_PUBLIC_API_URL}/Cards`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-DeviceId": deviceId,
          Accept: "application/json"
        }
      }
    );
  } catch (err: any) {
    console.error(
      "❌ getPersonalCard error:",
      err?.response?.data || err.message
    );
    throw err;
  }
};
