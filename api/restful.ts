import axios from "axios";

import { clerk } from "@/lib/client";

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
        Origin: "https://finity-rewards-web-app-dev.azurewebsites.net"
      }
    }
  );
};

export const getPINInfo = async (verificationCode: string) => {
  const token = await clerk.session?.getToken();
  return await axios.post<PinResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/cards/pin`,
    {
      otp: verificationCode
    },
    {
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://finity-rewards-web-app-dev.azurewebsites.net"
      }
    }
  );
};

export const refreshToken = async (data: RefreshTokenRequest) => {
  return await axios.post<RefreshTokenResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh-token`,
    {
      refreshToken: data.refreshToken
    }
  );
};
