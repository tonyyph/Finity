import { Button } from "@/components/ui/button";
import { AnimatedSpinner } from "@/components/ui/spinner";
import AnimatedSpinnerV2 from "@/components/ui/spinnerIndicator";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/Colors";
import { exactDesign, ti18n } from "@/utils";
import { t } from "@lingui/macro";
import { router } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, View } from "react-native";

const content = [
  {
    title: "Free card",
    sub: "Request a physical card at no cost.",
    icons: require("@/assets/images/free-card.png"),
  },
  {
    title: "Convert points",
    sub: "Convert your points into card balance effortlessly.",
    icons: require("@/assets/images/convert-icon.png"),
  },
  {
    title: "Spend anywhere",
    sub: "Pay in any store where Mastercard® is accepted, locally and overseas.",
    icons: require("@/assets/images/spend-icon.png"),
  },
];

function RequestCard() {
  useEffect(() => {}, []);
  const [loading, setLoading] = useState<boolean>();

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: colors.backgroundSubtle }}
    >
      <SafeAreaView className="flex-1">
        <Button size="icon" variant="ghost" onPress={router.back}>
          <ArrowLeftIcon className="h-8 w-8 left-2 text-foreground" />
        </Button>
        <View className="p-4 gap-2">
          <Text className="text-h2 font-bold">{"Request a physical card"}</Text>
          <Text className="">
            {
              "Convert your points into real value and start enjoying the rewards."
            }
          </Text>
        </View>
        <View className="items-center pt-4 pb-4">
          <Image
            resizeMode="contain"
            source={require("@/assets/images/OnboardCard.png")}
            style={{ width: exactDesign(120), height: exactDesign(187.5) }}
          />
        </View>
        <View className="flex-1 p-4 gap-5 top-3">
          {content.map((e, i) => {
            return (
              <View key={`${i}`} className="flex-row gap-3">
                <View className="items-star ">
                  <Image
                    source={e.icons}
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                </View>
                <View className="flex-1 gap-1">
                  <Text className="text-sm font-bold">{e.title}</Text>
                  <Text className="text-sm font-normal">{e.sub}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View className="ml-4 mr-4 mb-4">
          <Text
            className="text-sm font-extralight"
            style={{ color: colors.secondary }}
          >
            {`By proceeding, you agree to bank’s `}
            <Text className="text-sm underline color-black font-medium">
              Terms and Conditions
            </Text>
          </Text>
          <Button
            variant="default"
            disabled={loading}
            size={"lg"}
            className="mt-8 rounded-full bg-primary h-[48px]"
            loading={loading}
            onPress={handleConfirm}
          >
            {loading && <AnimatedSpinnerV2 size={20} color={colors.orange} />}
            <Text className="text-white text-base font-medium">
              {loading
                ? ti18n(`Confirming...`)
                : ti18n(`Confirm and request card`)}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
export default RequestCard;
