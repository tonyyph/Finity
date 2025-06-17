import { getCardDetail, getPINInfo, getUserProfile } from "@/api";
import { certificationStore } from "@/stores/certificationStore";
import { userStore } from "@/stores/userStore";
import { validatePassword, validateUsername } from "@/utils";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useValidateInput } from "../commons";
import { useLocalPIN } from "../use-local-pin";

export const useForgotPin = () => {
  const { signIn, setActive: setActiveSignIn, isLoaded } = useSignIn();
  const { signOut } = useAuth();
  const { setShouldPINLocal } = useLocalPIN();

  const [loading, setLoading] = useState<boolean>(false);
  const { tempPassword, tempUserName } = certificationStore.getState();
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

  const onSubmitForgotPIN = async () => {
    setLoading(true);
    if (!isLoaded) return;
    const setError = (error: string = "Invalid password") => {
      passwordState.setState((prev) => ({ ...prev, error }));
    };

    const setErrorUsername = (error: string = "Invalid username") => {
      usernameState.setState((prev) => ({ ...prev, error }));
    };

    if (!usernameState.value || !passwordState.value) {
      !usernameState.value && setErrorUsername("Enter your email address");
      !passwordState.value && setError("Enter your password");
      setLoading(false);
      return;
    }

    try {
      const result =
        (usernameState.value === "1"
          ? "tonyphvincent@gmail.com" //TODO: remove that mockup
          : usernameState.value === "2"
          ? "anhtuyetk36acntt@gmail.com"
          : usernameState.value) === tempUserName &&
        (passwordState.value === "1"
          ? "Khaccuong@14"
          : passwordState.value === "2"
          ? "Tuyetvo123@@"
          : passwordState.value) === tempPassword;

      if (result) {
        await signOut();

        const value = await signIn.create({
          identifier:
            usernameState.value === "1"
              ? "tonyphvincent@gmail.com" //TODO: remove that mockup
              : usernameState.value === "2"
              ? "tuyetvo001vat@gmail.com"
              : usernameState.value,
          password:
            passwordState.value === "1"
              ? "Khaccuong@14"
              : passwordState.value === "2"
              ? "Tuyetvo123@@"
              : passwordState.value
        });

        if (value.status === "needs_second_factor") {
          router.push("/pin-verify-2factor");
        } else {
          router.push({
            pathname: "/pin-verify",
            params: { isResetPin: "1", type: "setup" }
          });
          await setActiveSignIn({ session: value?.createdSessionId });
        }
        certificationStore.setState({
          tempUserName:
            usernameState.value === "1"
              ? "tonyphvincent@gmail.com" //TODO: remove that mockup
              : usernameState.value === "2"
              ? "tuyetvo001vat@gmail.com"
              : usernameState.value,
          tempPassword:
            passwordState.value === "1"
              ? "Khaccuong@14"
              : passwordState.value === "2"
              ? "Tuyetvo123@@"
              : passwordState.value
        });
        setError("");
        setErrorUsername("");
      } else {
        setError("Invalid username or password");
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
          const { data: cardDetail } = await getCardDetail(otp);
          userStore.setState({
            userProfile: session,
            pinInfo: res?.pin,
            cardDetailInfo: cardDetail
          });
          setShouldPINLocal(false);
          router.push({
            pathname: "/pin-success-2factor",
            params: { isResetPin: "1" }
          });
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
    setError,
    isLoading: loading,
    onSubmitForgotPIN
  };
};
