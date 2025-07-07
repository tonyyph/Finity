import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useCardHolder } from "@/hooks/cardholders/useCardHolder";
import { useUserProfile } from "@/hooks/profile/useUserProfile";
import { exactDesign } from "@/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Image, View } from "react-native";
import { router } from "expo-router";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";

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
  const { handleRequestCardHolder, loading } = useCardHolder();
  const { userProfile } = useUserProfile();
  const insets = useSafeAreaInsets();

  const handleConfirm = () => {
    handleRequestCardHolder({
      addressLine1: userProfile?.address?.addressLine1,
      addressLine2: userProfile?.address?.addressLine2,
      city: userProfile?.address?.city,
      postcode: userProfile?.address?.postCode
    });
  };

  return (
    <View className="flex-1 bg-backgroundSubtle">
      <ScrollView className="pb-[120px]">
        <View className="px-4 pt-6 gap-2">
          <Typography type="heading-small" weight="semibold">
            {"Request a physical card"}
          </Typography>
          <Typography weight="regular" className="mr-6">
            Convert your points into real value and start enjoying the rewards.
          </Typography>
        </View>

        <View className="items-center py-6">
          <Image
            resizeMode="contain"
            source={require("@/assets/images/OnboardCard.png")}
            style={{ width: exactDesign(124), height: exactDesign(192) }}
          />
        </View>

        <View className="p-4 gap-5">
          {content.map((e, i) => (
            <View key={`${i}`} className="flex-row gap-3">
              <View className="items-start">
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
          ))}
        </View>

        <View className="p-4 pt-5">
          <Typography weight="regular" textColor="#404040">
            {`By proceeding, you agree to bank’s `}
            <Typography
              onPress={() =>
                router.push({
                  pathname: "/web-view",
                  params: {
                    title: "Terms and conditions",
                    webLink: "https://www.finity.co.uk/terms-conditions/"
                  }
                })
              }
              weight="medium"
              className="underline"
            >
              {`Terms and Conditions`}
            </Typography>
          </Typography>
        </View>
      </ScrollView>

      {/* Sticky bottom button */}
      <View
        className="bg-white p-4 shadow-md shadow-slate-100"
        style={{
          position: "absolute",
          bottom: insets.bottom - 32,
          left: 0,
          right: 0
        }}
      >
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
        <BottomIndicatorAvoidingView number={0.8} />
      </View>
    </View>
  );
}
export default RequestCard;
