import { validatePassword, validateUsername } from "@/utils";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useValidateInput } from "../commons";

export const useLogin = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
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

  // Handle the submission of the sign-in form
  const onLogin = async () => {
    if (!isLoaded) return;
    const setError = (error: string = "Invalid password") => {
      passwordState.setState((prev) => ({ ...prev, error }));
    };
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: usernameState.value,
        password: passwordState.value
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else if (signInAttempt.status === "needs_second_factor") {
        // If the status is "needs_second_factor", the user needs to complete
        // a second factor authentication step before they can sign in
        router.push("/(auth)/verify-2factor");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.longMessage ?? err.message ?? "Unknown error");
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return {
    usernameState,
    cookieAccessState,
    cookieRefreshState,
    passwordState,
    onLogin
  };
};
