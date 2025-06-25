import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import { useCardHolder } from "@/hooks/cardholders/useCardHolder";
import { router } from "expo-router";
import { Linking, TextInput, View } from "react-native";

export default function CashOutPointScreen() {
  const { userData, loading } = useCardHolder();

  const formatPointValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(userData?.pointsBalance ?? 0));

  const handleSendEmail = async () => {
    const email = "support@finity.co.uk";
    const subject = "Request cash out";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    const canOpen = await Linking.canOpenURL(mailtoUrl);
    if (canOpen) {
      Linking.openURL(mailtoUrl);
    } else {
      router.push({
        pathname: "/web-view",
        params: {
          title: "",
          webLink: "https://support.finity.co.uk/en/"
        }
      });
    }
  };

  return (
    <View className="flex-1 bg-background">
      <Header onBack={router.back} title="Cash out points" />

      <ProgressBar completeAnimation={!loading} />
      <View className="m-6 gap-4">
        <Typography weight="regular">
          {`You may cash out your points at a rate of `}
          <Typography>1 point = £0.001.</Typography>
        </Typography>
        <View className="gap-1">
          <Typography type="body-default" weight="medium" textColor="#404040">
            {`Points balance`}
          </Typography>
          <TextInput
            editable={false}
            value={formatPointValue}
            className="bg-neutral-100  rounded-lg h-[48px] border-[1px] border-subtitle px-3 text-[18px] font-bold color-[#404040]"
          />
        </View>
        <Button
          disabled={loading}
          variant="default"
          size={"lg"}
          className="rounded-full bg-primary h-[48px] mt-4"
          onPress={handleSendEmail}
        >
          <Typography type="body-default" weight="medium" textColor="white">
            {`Request cash out`}
          </Typography>
        </Button>
      </View>
    </View>
  );
}
