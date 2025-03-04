import { Text } from "@/components/ui/text";
import Touch from "@/components/ui/touch";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { router } from "expo-router";
import { useCallback } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function TwoFactorAuthenticationSuccess() {
  const { i18n } = useLingui();

  const handleSetupPin = useCallback(() => {
    router.push("/(auth)/pin-verify");
  }, []);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-4 gap-3 items-center top-28">
          <Image source={require("../../assets/images/success-filled.png")} />
          <Text className="text-2xl font-semibold text-neutral-950 font-['PP Neue Montreal'] leading-[30px] tracking-wide">{`Verification success`}</Text>
          <Text className="text-neutral-950 text-center text-base font-normal font-['PP Neue Montreal'] leading-snug tracking-wide">{`Two-factor authentication verified. `}</Text>
        </View>
        <View className="px-6 gap-6 py-6">
          <Touch
            onPress={handleSetupPin}
            className=" bg-black rounded-full px-6 py-3 justify-center items-center h-12"
          >
            <Text className="text-base font-semibold color-white ">
              {t(i18n)`Set up PIN`}
            </Text>
          </Touch>
        </View>
      </SafeAreaView>
    </View>
  );
}
export default TwoFactorAuthenticationSuccess;
