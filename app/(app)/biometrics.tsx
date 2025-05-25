import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { useUserSettingsStore } from "@/stores";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { BlurView } from "expo-blur";
import * as LocalAuthentication from "expo-local-authentication";
import { router, useLocalSearchParams } from "expo-router";
import { find } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";

interface AuthenticationProps {
  authenticationType: LocalAuthentication.AuthenticationType;
  title: string;
  subTitle: string;
  subTitle2: string;
  submit: string;
}

const authentication: AuthenticationProps[] = [
  {
    authenticationType:
      LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
    title: `Setup Face ID`,
    subTitle: `Use Face ID for fast, secure access to your account and approve transactions.`,
    subTitle2: `You can enable it now or later in settings.`,
    submit: "Setup Face ID"
  },
  {
    authenticationType: LocalAuthentication.AuthenticationType.FINGERPRINT,
    title: `Setup Touch ID`,
    subTitle: `Use Touch ID for fast, secure access to your account and approve transactions. `,
    subTitle2: `You can enable it now or later in settings.`,
    submit: "Setup Touch ID"
  }
];

const authenticationAndroid: AuthenticationProps[] = [
  {
    authenticationType:
      LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
    title: `Setup biometric authentication`,
    subTitle: `Use your face recognition for secure access to your account and easy transaction approvals.`,
    subTitle2: `You can enable it now or later in settings.`,
    submit: "Setup biometrics"
  },
  {
    authenticationType: LocalAuthentication.AuthenticationType.FINGERPRINT,
    title: `Setup biometric authentication`,
    subTitle: `Use your fingerprint for secure access to your account and easy transaction approvals.`,
    subTitle2: `You can enable it now or later in settings.`,
    submit: "Setup biometrics"
  },
  {
    authenticationType: LocalAuthentication.AuthenticationType.IRIS,
    title: `Setup biometric authentication`,
    subTitle: `Use your fingerprint or face recognition for secure access to your account and easy transaction approvals..`,
    subTitle2: `You can enable it now or later in settings.`,
    submit: "Setup biometrics"
  }
];

function Biometrics() {
  const { typeAuthentication } = useLocalSearchParams();
  const { setEnabledLocalAuth } = useUserSettingsStore();

  const [authenticationType, setAuthenticationType] =
    useState<AuthenticationProps>();
  const [authInProgress, setAuthInProgress] = useState(false);

  useEffect(() => {
    setAuthenticationType(
      find(
        Platform.OS === "ios" ? authentication : authenticationAndroid,
        (au) => String(au.authenticationType) === String(typeAuthentication)
      )
    );
  }, [typeAuthentication]);

  const handleAuthenticate = useCallback(async () => {
    setAuthInProgress(true);
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with biometrics",
      disableDeviceFallback: true, // This only works on Android
      cancelLabel: "Cancel",
      fallbackLabel: "" // iOS only – setting empty label hides the fallback button
    });

    if (result.success) {
      setEnabledLocalAuth(true);
      setAuthInProgress(false);
      router.replace({
        pathname: "/(app)/biometrics-success",
        params: {
          typeAuthentication: authenticationType?.authenticationType
        }
      });
    } else {
      if (!!result?.error && result?.error === "user_cancel") {
        setAuthInProgress(false);
      }
    }
  }, [authenticationType]);

  if (authInProgress) {
    return (
      <BlurView
        intensity={Platform.OS === "ios" ? 60 : 100}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Header onBack={router.back} title="" />
      <View className="flex-1 px-4 gap-3 mt-10">
        <Typography type="heading-small" weight="semibold">
          {`${authenticationType?.title}`}
        </Typography>
        <Typography weight="regular" className="mr-4">
          {`${authenticationType?.subTitle}`}
        </Typography>
        <Typography weight="regular" className="mt-4">
          {`${authenticationType?.subTitle2}`}
        </Typography>
      </View>
      <View className="px-6 gap-6 mb-6">
        <Button
          variant="default"
          size={"lg"}
          className="rounded-full bg-primary h-[48px]"
          onPress={handleAuthenticate}
        >
          <Typography type="body-default" textColor="white">
            {`${authenticationType?.submit}`}
          </Typography>
        </Button>
        <Typography
          type="body-default"
          className="text-center"
          onPress={() => {
            router.back();
          }}
        >
          {`Not now`}
        </Typography>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  );
}
export default Biometrics;
