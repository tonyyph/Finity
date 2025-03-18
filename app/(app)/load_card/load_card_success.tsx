import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { t } from "@lingui/macro";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, View } from "react-native";

function LoadCardSuccesScreen() {
  const { success } = useLocalSearchParams();
  useEffect(() => {}, []);

  if (success == "0") {
    return (
      <View className="flex-1">
        <SafeAreaView className="flex-1">
          <View className="flex-1 gap-[24px]">
            <View className="justify-center items-center pt-[8px] gap-[16px]">
              <Image
                source={require("@/assets/images/error-filled.png")}
                className="w-[48px] h-[48px]"
              />
              <View className="gap-[4px] items-center">
                <Text
                  className="text-[24px]"
                  style={{ fontFamily: "PP Neue Montreal", fontWeight: "600" }}
                >{t`Something went wrong`}</Text>
                <Text
                  className="text-[16px]] text-center"
                  style={{ fontFamily: "PP Neue Montreal", fontWeight: "400" }}
                >{`An unexpected error occurred while processing\nyour request. Please try again.`}</Text>
              </View>
            </View>
          </View>
          <View className="pl-[16px] pr-[16px] gap-[16px] pb-[16px]">
            <Button
              // disabled={loadcard}
              variant="default"
              size={"lg"}
              className="rounded-full bg-primary h-[48px]"
              // loading={loadcard}
              onPress={() => {
                router.back();
              }}
            >
              <Text className="text-white text-base font-medium">
                {t`Loading card again`}
              </Text>
            </Button>
            <Button
              // disabled={loadcard}
              variant="outline"
              size={"lg"}
              className="rounded-full  h-[48px]"
              // loading={loadcard}
              onPress={() => {
                router.navigate({
                  pathname: "/(app)/(tabs)",
                });
              }}
            >
              <Text className="text-black text-base font-medium">
                {t`Return to home`}
              </Text>
            </Button>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1  bg-backgroundSubtle">
      <SafeAreaView className="flex-1">
        <View className="flex-1 gap-[24px]">
          <View className="justify-center items-center pt-[8px] gap-[16px]">
            <Image
              source={require("@/assets/images/success-filled.png")}
              className="w-[48px] h-[48px]"
            />
            <View className="gap-[4px] items-center">
              <Text
                className="text-[24px]"
                style={{ fontFamily: "PP Neue Montreal", fontWeight: "600" }}
              >{`+ £150.00`}</Text>
              <Text
                className="text-[16px]]"
                style={{ fontFamily: "PP Neue Montreal", fontWeight: "400" }}
              >{`successfully loaded to your card.`}</Text>
            </View>
          </View>
          <View className=" gap-[16px] ">
            <Text
              className="text-[16px]] text-center"
              style={{ fontFamily: "PP Neue Montreal", fontWeight: "400" }}
            >{`07 August 2024, 09:45am`}</Text>
            <View className="border-[1px] ml-[16px] mr-[16px] bg-white border-subtitle rounded-[16px] p-[16px] pt-[24px] pb-[24px] gap-[16px]">
              <View className="flex-row justify-between">
                <Text
                  className="text-[16px] color-secondarys"
                  style={{
                    fontFamily: "PP Neue Montreal",
                    fontWeight: "400",
                  }}
                >{`Reference number`}</Text>
                <Text
                  className="text-[16px] color-black"
                  style={{
                    fontFamily: "PP Neue Montreal",
                    fontWeight: "500",
                  }}
                >
                  {987654321}
                </Text>
              </View>
              {/*  */}
              <View className="flex-row justify-between">
                <Text
                  className="text-[16px] color-secondarys"
                  style={{
                    fontFamily: "PP Neue Montreal",
                    fontWeight: "400",
                  }}
                >{`You loaded`}</Text>
                <Text
                  className="text-[16px] color-black"
                  style={{
                    fontFamily: "PP Neue Montreal",
                    fontWeight: "500",
                  }}
                >
                  {`1,500 points`}
                </Text>
              </View>
              {/*  */}
              <View className="flex-row justify-between">
                <Text
                  className="text-[16px] color-secondarys"
                  style={{
                    fontFamily: "PP Neue Montreal",
                    fontWeight: "400",
                  }}
                >{`Conversion rate`}</Text>
                <Text
                  className="text-[16px] color-black"
                  style={{
                    fontFamily: "PP Neue Montreal",
                    fontWeight: "500",
                  }}
                >
                  {`1 point = £0.1`}
                </Text>
              </View>
              {/*  */}
              <View className="h-[1px] bg-subtitle" />
              {/*  */}
              {/*  */}
              <View className="flex-row justify-between">
                <Text
                  className="text-[16px] color-secondarys"
                  style={{
                    fontFamily: "PP Neue Montreal",
                    fontWeight: "bold",
                  }}
                >{`Account balances`}</Text>
              </View>
              {/*  */}
              <View className="flex-row justify-between">
                <Text
                  className="text-[16px] color-secondarys"
                  style={{
                    fontFamily: "PP Neue Montreal",
                    fontWeight: "400",
                  }}
                >{`Points`}</Text>
                <Text
                  className="text-[16px] color-black"
                  style={{
                    fontFamily: "PP Neue Montreal",
                    fontWeight: "500",
                  }}
                >
                  {`122,390`}
                </Text>
              </View>
              {/*  */}
              <View className="flex-row justify-between">
                <Text
                  className="text-[16px] color-secondarys"
                  style={{
                    fontFamily: "PP Neue Montreal",
                    fontWeight: "400",
                  }}
                >{`Card`}</Text>
                <Text
                  className="text-[16px] color-black"
                  style={{
                    fontFamily: "PP Neue Montreal",
                    fontWeight: "500",
                  }}
                >
                  {`£150.00`}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Bottom */}
        <View className="pl-[16px] pr-[16px] gap-[16px] pb-[16px]">
          <Button
            // disabled={loadcard}
            variant="default"
            size={"lg"}
            className="rounded-full bg-primary h-[48px]"
            // loading={loadcard}
            onPress={() => {
              router.back();
            }}
          >
            <Text className="text-white text-base font-medium">
              {t`Loading card again`}
            </Text>
          </Button>
          <Button
            // disabled={loadcard}
            variant="outline"
            size={"lg"}
            className="rounded-full  h-[48px]"
            // loading={loadcard}
            onPress={() => {
              router.navigate({
                pathname: "/(app)/(tabs)",
              });
            }}
          >
            <Text className="text-black text-base font-medium">
              {t`Return to home`}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
export default LoadCardSuccesScreen;
