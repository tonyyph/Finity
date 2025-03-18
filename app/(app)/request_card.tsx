import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useUserSettingsStore } from "@/stores";
import { exactDesign } from "@/utils";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Linking, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const [loading, setLoading] = useState<boolean>();
  const { bottom } = useSafeAreaInsets();
  const { setActiveCard } = useUserSettingsStore();

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setActiveCard(1);
      setLoading(false);
      router.back();
    }, 2000);
  };

  return (
    <View className="flex-1 bg-backgroundSubtle">
      <View className="px-4 pt-6 gap-2">
        <Typography type="heading-small" weight="semibold">
          {"Request a physical card"}
        </Typography>
        <Typography weight="regular">
          Convert your points into real value and start enjoying the rewards.
        </Typography>
        <Text className="self-stretch justify-start text-neutral-950 text-base font-normal font-['PP_Neue_Montreal'] leading-snug tracking-wide"></Text>
      </View>
      <View className="items-center pb-4">
        <Image
          resizeMode="contain"
          source={require("@/assets/images/OnboardCard.png")}
          style={{ width: exactDesign(120), height: exactDesign(187.5) }}
        />
      </View>
      <View className="flex-1 p-4 gap-5">
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
                <Typography weight="semibold">{e.title}</Typography>
                <Typography weight="regular">{e.sub}</Typography>
              </View>
            </View>
          );
        })}
      </View>
      <View className="p-4 mb-4">
        <Typography weight="regular" textColor="#404040">
          {`By proceeding, you agree to bank’s `}
          <Typography
            onPress={() => {
              Linking.openURL("https://www.finity.co.uk/terms-conditions/");
            }}
            weight="medium"
            className="underline"
          >
            {`Terms and Conditions`}
          </Typography>
        </Typography>
      </View>
      <View className="bg-white p-4" style={{ paddingBottom: bottom }}>
        <Button
          variant="default"
          disabled={loading}
          size={"lg"}
          className="rounded-full bg-primary h-[48px]"
          loading={loading}
          onPress={handleConfirm}
        >
          <Typography type="body-default" weight="medium" textColor="white">
            {loading ? `Confirming...` : `Confirm and request card`}
          </Typography>
        </Button>
      </View>
    </View>
  );
}
export default RequestCard;
