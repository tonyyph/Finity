import { validatePassword, validateUsername } from "@/utils";
import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import { useValidateInput } from "../commons";
import { useLocalPIN } from "../use-local-pin";

export const useForgotPin = () => {
  const { signIn, setActive: setActiveSignIn, isLoaded } = useSignIn();
  const { setShouldPINLocal } = useLocalPIN();

  const [loading, setLoading] = useState<boolean>(false);

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
      const result = await signIn?.create({
        identifier:
          usernameState.value === "1"
            ? "tonyphvincent@gmail.com" //TODO: remove that mockup
            : usernameState.value === "2"
            ? "chelsea.chan+0617@finity.co.uk"
            : usernameState.value === "3"
            ? "chelsea.chan+0619@finity.co.uk"
            : usernameState.value,
        password:
          passwordState.value === "1"
            ? "Khaccuong@14"
            : passwordState.value === "2"
            ? "EGQ@mkx1pmw_dct1vdp"
            : passwordState.value === "3"
            ? "EGQ@mkx1pmw_dct1vdp"
            : passwordState.value
      });

      if (result?.status === "complete") {
        return true;
      } else {
        return false;
      }
    } catch (_) {
      return false;
    }
  };

  return {
    usernameState,
    cookieAccessState,
    cookieRefreshState,
    passwordState,
    error,
    setError,
    isLoading: loading,
    onSubmitForgotPIN
  };
};
