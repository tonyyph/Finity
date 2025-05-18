import { changePhoneNumber, sendMobileVerificationCode } from "@/api";
import { userStore } from "@/stores/userStore";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export const useVerification = (phoneNumber: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<VerificationCodeResponse>();
  const [error, setError] = useState("");
  const userProfile = userStore?.getState().userProfile;

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

  const handleVerifyOTP = async ({
    verificationCode
  }: {
    verificationCode: string;
  }) => {
    setLoading(true);
    try {
      await changePhoneNumber({
        email: userProfile?.email ?? "",
        dateOfBirth: userProfile?.dateOfBirth ?? "",
        firstName: userProfile?.firstName ?? "",
        lastName: userProfile?.lastName ?? "",
        business: {
          name: userProfile?.business?.name ?? "TOMATO LIMITED"
        },
        addressLine1: userProfile?.address?.addressLine1 ?? "",
        addressLine2: userProfile?.address?.addressLine2 ?? "",
        city: userProfile?.address?.city ?? "",
        country: userProfile?.address?.country ?? "",
        postcode: userProfile?.address?.postCode ?? "",
        mobileNumber: phoneNumber,
        verificationCode: verificationCode
      });

      router.push("/(app)/success_phonenumber");
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    verificationCode: data?.devVerificationCode ?? "000000",
    loading: loading,
    handleVerifyOTP,
    error
  };
};
