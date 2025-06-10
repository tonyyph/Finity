import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import {
  BottomIndicatorAvoidingView,
  TopIndicatorAvoidingView
} from "@/utils/spacing";
import { AuthenticationType } from "expo-local-authentication";
import { router, useLocalSearchParams } from "expo-router";
import { find } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { Image, Platform, View } from "react-native";

interface AuthenticationProps {
  authenticationType: AuthenticationType;
  title: string;
  subTitle: string;
}

const authentication: AuthenticationProps[] = [
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

const authenticationAndroid: AuthenticationProps[] = [
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
  const { typeAuthentication, firstFA = "0", ...res } = useLocalSearchParams();
  const [authenticationType, setAuthenticationType] =
    useState<AuthenticationProps>();
  useEffect(() => {
    setAuthenticationType(
      find(
        Platform.OS === "ios" ? authentication : authenticationAndroid,
        (au) => String(au.authenticationType) === String(typeAuthentication)
      )
    );
  }, [typeAuthentication, res]);

  const handleContinue = useCallback(() => {
    if (firstFA === "1") {
      router.replace("/(app)/(tabs)");
    } else {
      router.dismissAll();
    }
  }, [firstFA]);

  return (
    <View className="flex-1 bg-background">
      <TopIndicatorAvoidingView />
      <View className="flex-1">
        <View className="flex-1 px-4 gap-3 items-center mt-40">
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={require("@/assets/images/success-filled.png")}
          />
          <Typography type="heading-small" weight="semibold">
            {`${authenticationType?.title}`}
          </Typography>
          <Typography weight="regular" className="text-center px-4">
            {`${authenticationType?.subTitle}`}
          </Typography>
        </View>
        <View className="px-6 gap-6">
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full bg-primary h-[48px]"
            onPress={handleContinue}
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {`Continue`}
            </Typography>
          </Button>
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  );
}
export default BiometricsSuccess;
