import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/Colors";
import { formatNumber } from "@/utils";
import { t } from "@lingui/macro";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput, View } from "react-native";

function LoadCardScreen() {
  useEffect(() => {}, []);
  const [enterAmount, setEnterEmount] = useState("");

  return (
    <View className="flex-1 " style={{ backgroundColor: colors.white }}>
      <SafeAreaView className="flex-1">
        <Header onBack={router.back} title="Load points to card" />
        <Progress
          value={80}
          className="h-[4px] mt-4 bg-border2"
          indicatorClassName="bg-orange-primary"
        />
        <View className="flex-1 gap-6">
          <View className="p-4 gap-2">
            <Text>{t`Points balance`}</Text>
            <TextInput
              editable={false}
              value={"123,890"}
              className="bg-neutral-100  rounded-lg h-[48px] border-[1px] border-subtitle pl-[12px] pr-[12px] text-[18px] font-bold"
            />
            {/* point balance */}
            <View className="flex-row gap-1">
              <View
                className="rounded-full w-5 h-5 justify-center items-center"
                style={{ backgroundColor: colors.neutral }}
              >
                <Text className="color-white text-xs font-medium">i</Text>
              </View>
              <Text className="text-bs">{t`Conversion rate: 1 point = £0.1`}</Text>
            </View>
          </View>
          {/* Enter amount */}
          <View className="p-4 gap-2 ">
            <Text>{t`Enter amount`}</Text>
            <View className="flex-row justify-between items-center rounded-lg  border-[1px] border-subtitle pl-[12] pr-[12]">
              <TextInput
                value={enterAmount}
                className="flex-1 bg-white h-[72px]  text-[28px] font-medium"
                keyboardType="number-pad"
                onChangeText={(text) => {
                  let numericValue = text
                    .toString()
                    .replace(/,/g, "")
                    .replace(/\D/g, "");
                  let formattedValue = new Intl.NumberFormat("en-US").format(
                    Number(numericValue)
                  );
                  setEnterEmount(formattedValue);
                }}
              />
              <Text className="color-tertiary text-[18px]">{t`points`}</Text>
            </View>
            {!!Number(enterAmount.replace(/,/g, "")) && (
              <Text className="text-[14px] color-neutral">
                {`You’ll receive: £${formatNumber({
                  value: Number(enterAmount.replace(/,/g, "")) * 0.1,
                })}`}
              </Text>
            )}
          </View>
        </View>
        {/* Bottom */}
        <View className="pl-4 pr-4 pb-4">
          <Button
            disabled={!enterAmount}
            variant="default"
            size={"lg"}
            className="mt-8 rounded-full bg-primary h-[48px]"
            // loading
            onPress={null}
          >
            <Text className="text-white text-base font-medium">
              {t`Continue`}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
export default LoadCardScreen;
