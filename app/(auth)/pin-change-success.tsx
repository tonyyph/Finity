import { Text } from "@/components/ui/text";
import Touch from "@/components/ui/touch";
import { useLingui } from "@lingui/react";
import { router } from "expo-router";
import { useCallback } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ChangePinSuccess() {
  const { i18n } = useLingui();

  const handleContinue = useCallback(() => {
    router.replace({
      pathname: "/(app)/(tabs)"
    });
  }, []);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-8 gap-3 items-center top-32">
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={require("@/assets/images/success-filled.png")}
          />
          <Text className="text-2xl font-semibold text-neutral-950 font-['PP Neue Montreal'] leading-[30px] tracking-wide">{`PIN changed`}</Text>
          <Text className="text-neutral-950 text-center text-base font-normal font-['PP Neue Montreal'] leading-snug tracking-wide">{`Remember to keep your new PIN private and update it regularly.`}</Text>
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
export default ChangePinSuccess;
