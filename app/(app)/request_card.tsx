import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { colors } from "@/constants/Colors";
import { exactDesign } from "@/utils";
import { t } from "@lingui/macro";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, View } from "react-native";

const content = [
  {
    title: "Free card",
    sub: "Request a physical card at no cost.",
    icons: require("@/assets/images/free-card.png")
  },
  {
    title: "Convert points",
    sub: "Convert your points into card balance effortlessly.",
    icons: require("@/assets/images/convert-icon.png")
  },
  {
    title: "Spend anywhere",
    sub: "Pay in any store where Mastercard® is accepted, locally and overseas.",
    icons: require("@/assets/images/spend-icon.png")
  }
];

function RequestCard() {
  useEffect(() => {}, []);
  const [loading, setLoading] = useState<boolean>();

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 5000);
  };

  return (
    <View className="flex-1 bg-backgroundSubtle">
      <SafeAreaView className="flex-1">
        <View className="p-4 gap-2">
          <Text className="self-stretch justify-end text-neutral-950 text-heading-small font-semibold font-['PP_Neue_Montreal'] leading-[30px] tracking-wide">
            {"Request a physical card"}
          </Text>
          <Text className="self-stretch justify-start text-neutral-950 text-base font-normal font-['PP_Neue_Montreal'] leading-snug tracking-wide">
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
                  <Text className="justify-start text-neutral-950 text-base font-600 leading-snug tracking-wide">
                    {e.title}
                  </Text>
                  <Text className="self-stretch justify-start text-neutral-950 text-base font-normal leading-snug tracking-wide">
                    {e.sub}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View className="mx-4 mb-4">
          <Text
            className="self-stretch justify-center text-neutral-700 text-base font-normal font-['PP_Neue_Montreal'] leading-tight tracking-wide"
            style={{ color: colors.secondary }}
          >
            {`By proceeding, you agree to bank’s `}
            <Text className="text-neutral-950 text-base font-medium font-['PP_Neue_Montreal'] underline leading-tight tracking-tight">
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
            <Text className="text-center justify-center text-white text-base font-medium font-['PP_Neue_Montreal'] leading-snug tracking-wide">
              {loading ? t`Confirming...` : t`Confirm and request card`}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
export default RequestCard;
