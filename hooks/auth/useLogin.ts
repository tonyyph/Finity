import { getUserProfile } from "@/api";
import { useUserAuthenticateStore, userStore } from "@/stores";
import { validatePassword, validateUsername } from "@/utils";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useValidateInput } from "../commons";

export const useLogin = () => {
  const { signIn, setActive: setActiveSignIn, isLoaded } = useSignIn();
  const { verificationPin } = useUserAuthenticateStore();

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
      const result = await signIn.create({
        identifier: usernameState.value,
        password: passwordState.value
      });

      if (result.status === "needs_second_factor") {
        router.push("/verify-2factor");
      } else {
        if (!verificationPin) {
          router.push({
            pathname: "/pin-verify",
            params: { isResetPin: "false", type: "setup" }
          });
        }
        await setActiveSignIn({ session: result.createdSessionId });
      }
    } catch {
      setError("Incorrect email address or password. Try again.");
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
          userStore.setState({
            userProfile: session
          });
        } else {
          router.push("/success-phonenumber");
        }
      } else {
        setError("Invalid code. Please try again.");
      }
    } catch {
      setError("Incorrect verification code. Try again.");
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
    onLogin,
    setError
  };
};
