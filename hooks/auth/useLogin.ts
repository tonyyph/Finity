import { getPINInfo, getUserProfile } from "@/api";
import { userStore } from "@/stores/userStore";
import { validatePassword, validateUsername } from "@/utils";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useValidateInput } from "../commons";
import { useLocalPIN } from "../use-local-pin";

export const useLogin = () => {
  const { signIn, setActive: setActiveSignIn, isLoaded } = useSignIn();
  const { setShouldPINLocal, setPinInfo } = useLocalPIN();
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
    setLoading(true);
    if (!isLoaded) return;
    const setError = (error: string = "Invalid password") => {
      passwordState.setState((prev) => ({ ...prev, error }));
    };
    try {
      const result = await signIn.create({
        identifier:
          usernameState.value === "1"
            ? "tonyphvincent@gmail.com" //TODO: remove that mockup
            : usernameState.value,
        password:
          passwordState.value === "1" ? "Khaccuong@14" : passwordState.value
      });

      if (result.status === "needs_second_factor") {
        router.push("/(auth)/verify-2factor");
      } else {
        await setActiveSignIn({ session: result.createdSessionId });
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.longMessage ?? err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyTOTP = async ({
    otp,
    type = "default"
  }: {
    otp: string;
    type?: string;
  }) => {
    if (!isLoaded) return;
    try {
      setLoading(true);
      setShouldPINLocal(false);
      if (!signIn) {
        setError("Sign-in session not initialized. Please try again.");
        return;
      }

      const result = await signIn.attemptSecondFactor({
        strategy: "totp",
        code: otp
      });

      if (result.status === "complete") {
        if (type === "default") {
          await setActiveSignIn({ session: result.createdSessionId });
          const { data: session } = await getUserProfile();
          const { data: res } = await getPINInfo(otp);

          setPinInfo(res?.pin);
          userStore.setState({ userProfile: session });
        } else {
          router.push("/success_phonenumber"); //TODO: review it
        }
      } else {
        setError("Invalid code. Please try again.");
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.longMessage ?? err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return {
    usernameState,
    cookieAccessState,
    cookieRefreshState,
    passwordState,
    handleVerifyTOTP,
    error,
    isLoading: loading,
    onLogin
  };
};
