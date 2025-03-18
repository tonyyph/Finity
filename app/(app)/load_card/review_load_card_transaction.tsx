import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { Text } from "@/components/ui/text";
import { formatNumber } from "@/utils";
import { t } from "@lingui/macro";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

const mockdata = {
  load: 1500,
  receive: 150,
};

function review_load_card_transaction() {
  const [loadcard, setLoadCard] = useState(false);
  useEffect(() => {}, []);

  const handleLoadCard = () => {
    setLoadCard(true);
    setTimeout(() => {
      setLoadCard(false);
      router.push({
        pathname: "/(app)/load_card/load_card_success",
        params: {
          success: 1,
        },
      });
    }, 3000);
  };
  // Unsuccess
  return (
    <View className="flex-1 bg-white">
      <StatusBar backgroundColor={"white"} />
      <SafeAreaView className="flex-1">
        <Header onBack={router.back} title="Review transactions" />
        <View className="flex-1 bg-white gap-[8px] mt-[16px] ml-[16px] mr-[16px]">
          <View className="  p-[16px] rounded-[12px] bg-neutral-100">
            <Text className="font-bold">{t`Load`}</Text>
            <Text>
              {`${formatNumber({
                value: mockdata.load,
                decimalCount: 0,
              })} points`}
            </Text>
          </View>
          <View className="p-[16px] rounded-[12px] bg-neutral-100">
            <Text className="font-bold">{t`You’ll receive`}</Text>
            <Text>
              {`${formatNumber({
                value: mockdata.load,
                decimalCount: 0,
              })} points`}
            </Text>
          </View>
          <Text className="text-[14px] color-neutral">{`Card balance after load: £150.00`}</Text>
        </View>
        <View className="pl-4 pr-4 pb-4">
          <Button
            disabled={loadcard}
            variant="default"
            size={"lg"}
            className="mt-8 rounded-full bg-primary h-[48px]"
            loading={loadcard}
            onPress={handleLoadCard}
          >
            <Text className="text-white text-base font-medium">
              {loadcard ? t`Loading card..` : t`Confirm and load`}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
export default review_load_card_transaction;
