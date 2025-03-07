import { Text } from "@/components/ui/text";
import Touch from "@/components/ui/touch";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { AuthenticationType } from "expo-local-authentication";
import { router, useLocalSearchParams } from "expo-router";
import { find } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AuthenticationProps {
  authenticationType: AuthenticationType;
  title: String;
  subTitle: String;
}

const authentication: Array<AuthenticationProps> = [
  {
    authenticationType: AuthenticationType.FACIAL_RECOGNITION,
    title: `Face ID enabled`,
    subTitle: `Face ID successfully enabled. You can now sign in faster and more securely.`
  },
  {
    authenticationType: AuthenticationType.FINGERPRINT,
    title: `Touch ID enabled`,
    subTitle: `Touch ID successfully enabled. You can now sign in faster and more securely.`
  }
];

const authenticationAndroid: Array<AuthenticationProps> = [
  {
    authenticationType: AuthenticationType.FACIAL_RECOGNITION,
    title: `Biometrics enabled`,
    subTitle: `Biometrics successfully enabled. You can now sign in faster and more securely.`
  },
  {
    authenticationType: AuthenticationType.FINGERPRINT,
    title: `Biometrics enabled`,
    subTitle: `Biometrics successfully enabled. You can now sign in faster and more securely.`
  }
];

function BiometricsSuccess() {
  const { typeAuthentication, ...res } = useLocalSearchParams();
  const [] = useState();
  const { i18n } = useLingui();

  const [authenticationType, setAuthenticationType] =
    useState<AuthenticationProps>();

  useEffect(() => {
    setAuthenticationType(
      find(
        Platform.OS === "ios" ? authentication : authenticationAndroid,
        (au) => String(au.authenticationType) == String(typeAuthentication)
      )
    );
  }, [typeAuthentication, res]);

  const handleContinue = useCallback(() => {
    router.replace({
      pathname: "/(app)/(tabs)"
    });
  }, []);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-12 gap-3 items-center top-32">
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={require("@/assets/images/success-filled.png")}
          />
          <Text className="text-2xl font-semibold text-neutral-950 font-['PP Neue Montreal'] leading-[30px] tracking-wide">{`${authenticationType?.title}`}</Text>
          <Text className="text-neutral-950 text-center text-base font-normal font-['PP Neue Montreal'] leading-snug tracking-wide">{`${authenticationType?.subTitle}`}</Text>
        </View>
        <View className="px-6 gap-6 py-6">
          <Touch
            onPress={handleContinue}
            className=" bg-black rounded-full px-6 py-3 justify-center items-center h-12"
          >
            <Text className="text-base font-semibold color-white ">
              {`Continue`}
            </Text>
          </Touch>
        </View>
      </SafeAreaView>
    </View>
  );
}
export default BiometricsSuccess;

const styles = StyleSheet.create({
  container: {}
});
