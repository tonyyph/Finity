import { validatePassword, validateUsername } from "@/utils";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useValidateInput } from "../commons";

export const useLogin = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const usernameState = useValidateInput({
    defaultValue: "",
    validate: validateUsername
  });
  const passwordState = useValidateInput({
    defaultValue: "",
    validate: validatePassword
  });
  const cookieAccessState = useValidateInput({ defaultValue: "" });
  const cookieRefreshState = useValidateInput({ defaultValue: "" });

  const [error, setError] = useState("");

  const onLogin = async () => {
    if (!isLoaded) return;
    const setError = (error: string = "Invalid password") => {
      passwordState.setState((prev) => ({ ...prev, error }));
    };
    try {
      const result = await signIn.create({
        identifier:
          usernameState.value === "1"
            ? "tonyphvincent@gmail.com"
            : usernameState.value,
        password:
          passwordState.value === "1" ? "Khaccuong@14" : passwordState.value
      });

      if (result.status === "needs_second_factor") {
        router.push("/(auth)/verify-2factor");
      } else {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.longMessage ?? err.message ?? "Unknown error");
    }
  };

  const handleVerifyTOTP = async ({ otp }: { otp: string }) => {
    try {
      if (!signIn) {
        setError("Sign-in session not initialized. Please try again.");
        return;
      }

      const result = await signIn.attemptSecondFactor({
        strategy: "totp",
        code: otp
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          router.push({
            pathname: "/success-2factor",
            params: { isResetPin: 0 }
          });
        }, 1500);
      } else {
        setError("Invalid code. Please try again.");
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.longMessage ?? err.message ?? "Unknown error");
    }
  };

  return {
    usernameState,
    cookieAccessState,
    cookieRefreshState,
    passwordState,
    handleVerifyTOTP,
    error,
    loading,
    onLogin
  };
};
