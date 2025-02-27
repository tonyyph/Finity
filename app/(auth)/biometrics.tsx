import { Text } from "@/components/ui/text";
import Touch from "@/components/ui/touch";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import React, { useEffect, useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { router, useLocalSearchParams } from "expo-router";
import { find } from "lodash-es";
import { BackButton } from "@/components/common/back-button";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react-native";

interface AuthenticationProps {
  authenticationType: LocalAuthentication.AuthenticationType;
  title: String;
  subTitle: String;
  subTitle2: String;
  submit: String;
}

const authentication: Array<AuthenticationProps> = [
  {
    authenticationType:
      LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
    title: `Setup Face ID`,
    subTitle: `Use Face ID for fast, secure access to your account and approve transactions.`,
    subTitle2: `You can enable it now or later in settings.`,
    submit: "Setup Face ID",
  },
  {
    authenticationType: LocalAuthentication.AuthenticationType.FINGERPRINT,
    title: `Setup Touch ID`,
    subTitle: `Use Touch ID for fast, secure access to your account and approve transactions. `,
    subTitle2: `You can enable it now or later in settings.`,
    submit: "Setup Touch ID",
  },
];

function Biometrics() {
  const { typeAuthentication } = useLocalSearchParams();
  const [loading, setLoading] = useState<Boolean>(false);
  const { i18n } = useLingui();
  const [authenticationType, setAuthenticationType] =
    useState<AuthenticationProps>();

  useEffect(() => {
    setAuthenticationType(
      find(
        authentication,
        (au) => String(au.authenticationType) == String(typeAuthentication)
      )
    );
  }, [typeAuthentication]);

  const handleAuthenticate = useCallback(async () => {
    setLoading(true);
    const result = await LocalAuthentication.authenticateAsync({
      // disableDeviceFallback: true,
    });
    setLoading(false);
    if (result.success) {
      router.replace({
        pathname: "/(auth)/biometrics-success",
        params: {
          typeAuthentication: authenticationType?.authenticationType,
        },
      });
    }
  }, [authenticationType]);

  if (loading) return <View className="flex-1 bg-white" />;

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView />
      <Button size="icon" variant="ghost" onPress={router.back}>
        <ArrowLeftIcon className="h-8 w-8 left-4 text-foreground" />
      </Button>
      <View className="flex-1 px-4 gap-3 top-6">
        <Text className="text-2xl font-semibold ">{t(
          i18n
        )`${authenticationType?.title}`}</Text>
        <Text className="text-base font-regular">{t(
          i18n
        )`${authenticationType?.subTitle}`}</Text>
        <Text className="text-base font-regular">{t(
          i18n
        )`${authenticationType?.subTitle2}`}</Text>
      </View>
      <View className="px-6 gap-6">
        <Touch
          onPress={handleAuthenticate}
          className=" bg-black rounded-full px-6 py-3 justify-center items-center h-12"
        >
          <Text className="text-base font-semibold color-white ">
            {t(i18n)`${authenticationType?.submit}`}
          </Text>
        </Touch>
        <Touch
          onPress={() => {}}
          className=" bg-white rounded-full px-6 py-3 justify-center items-center h-12"
        >
          <Text className="text-base font-semibold color-black">{t(
            i18n
          )`Not now`}</Text>
        </Touch>
      </View>
      <SafeAreaView />
    </View>
  );
}
export default Biometrics;

const styles = StyleSheet.create({
  container: {},
});
