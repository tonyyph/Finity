import { Text } from "@/components/ui/text";
import Touch from "@/components/ui/touch";
import { t } from "@lingui/macro";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import { Image, SafeAreaView, View } from "react-native";

interface propsLocal {
  title: string;
  sub: string;
  icon: any;
  button: string;
}

const type = [
  {
    title: t`Something went wrong`,
    sub: t`An unexpected error occurred while processing your request. Please try again.`,
    icon: require("../../assets/images/error-filled.png"),
    button: t`Try again`,
  },
  {
    title: t`Card activated successfully!`,
    sub: t`Your card has been activated and is ready for use. Enjoy your transactions!`,
    icon: require("../../assets/images/success-filled.png"),
    button: t`Return to home`,
  },
];

function OrderCardSuccessScreen() {
  const { success } = useLocalSearchParams();
  const [localType, setLocalType] = useState<propsLocal>();
  useEffect(() => {
    if (success != "false") {
      setLocalType(type[1]);
    } else {
      setLocalType(type[0]);
    }
  }, [success]);

  const handleReturnHome = useCallback(() => {
    router.back();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-4 gap-3 items-center top-28">
          <Image
            className="w-16 h-16"
            resizeMode="contain"
            source={localType?.icon}
          />
          <Text className="text-2xl font-semibold ">{localType?.title}</Text>
          <Text className="text-base font-regular text-center">
            {localType?.sub}
          </Text>
        </View>
        <View className="px-6 gap-6 py-6">
          <Touch
            onPress={handleReturnHome}
            className=" bg-black rounded-full px-6 py-3 justify-center items-center h-12"
          >
            <Text className="text-base font-semibold color-white ">
              {localType?.button}
            </Text>
          </Touch>
        </View>
      </SafeAreaView>
    </View>
  );
}
export default OrderCardSuccessScreen;
