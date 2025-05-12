import { sendMobileVerificationCode } from "@/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useVerification = (phoneNumber: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<VerificationCodeResponse>();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVerificationCode = async () => {
      try {
        const { data: session } = await sendMobileVerificationCode(phoneNumber);
        setData(session);
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoading(false);
      }
    };

    fetchVerificationCode();
  }, []);

  return {
    verificationCode: data?.devVerificationCode ?? "000000",
    loading: loading,
    error
  };
};
