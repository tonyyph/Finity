import { CircleAlert } from "@/components/common/icons";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { Progress } from "@/components/ui/progress";
import Tooltip from "@/components/ui/tooltip";
import { colors } from "@/constants/Colors";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils";
import { t } from "@lingui/macro";
import { router } from "expo-router";
import { useState } from "react";
import { Image, SafeAreaView, TextInput, View } from "react-native";

function LoadCardScreen() {
  const [enterAmount, setEnterAmount] = useState("");
  const [error, setError] = useState(false);

  const handleContinue = () => {
    if (
      Number(enterAmount.replace(/,/g, "")) < 100 ||
      Number(enterAmount.replace(/,/g, "")) > 123890
    ) {
      setError(true);
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-1 " style={{ backgroundColor: colors.white }}>
      <SafeAreaView className="flex-1">
        <Header onBack={router.back} title="Load points to card" />
        <Progress
          value={80}
          className="h-[4px] mt-4 bg-border"
          indicatorClassName="bg-orange-primary"
        />
        <View className="flex-1">
          <View className="p-6 gap-2">
            <Typography type="body-default" weight="medium" textColor="#404040">
              {t`Points balance`}
            </Typography>
            <TextInput
              editable={false}
              value={"123,890"}
              className="bg-neutral-100  rounded-lg h-[48px] border-[1px] border-subtitle px-3 text-[18px] font-semibold"
            />
            {/* point balance */}
            <View className="flex-row gap-1 items-center">
              <View className="items-start">
                <Tooltip content="1 point = £0.10">
                  <Image
                    source={require("@/assets/images/info-filled.png")}
                    className="w-[16px] h-[16px]"
                  />
                </Tooltip>
              </View>
              <Typography type="body-small" weight="medium" textColor="#525252">
                {t`Conversion rate: 1 point = £0.10`}
              </Typography>
            </View>
          </View>
          {/* Enter amount */}
          <View className="p-6 gap-2 ">
            <Typography type="body-default" weight="medium" textColor="#404040">
              {t`Enter amount`}
            </Typography>
            <View className="flex-row justify-between items-center rounded-lg border-[1px] border-subtitle px-4">
              <TextInput
                value={enterAmount}
                className="flex-1 bg-white h-[72px] text-[28px] font-medium"
                keyboardType="number-pad"
                onChangeText={(text) => {
                  let numericValue = text
                    .toString()
                    .replace(/,/g, "")
                    .replace(/\D/g, "");
                  let formattedValue = new Intl.NumberFormat("en-US").format(
                    Number(numericValue)
                  );

                  console.log("formattedValue", formattedValue);
                  setError(false);
                  setEnterAmount(formattedValue);
                }}
              />
              <Typography type="body-large" weight="medium" textColor="#737373">
                {t`points`}
              </Typography>
            </View>
            {!!error ? (
              <View className={cn("flex flex-row items-center")}>
                <CircleAlert className="top-1" />
                <Typography
                  type="body-small"
                  weight="medium"
                  textColor="#D9323D"
                >
                  {Number(enterAmount.replace(/,/g, "")) < 100
                    ? "The minimum amount to load is 100 points"
                    : "The maximum amount to load is 123,890 points"}
                </Typography>
              </View>
            ) : (
              !!Number(enterAmount.replace(/,/g, "")) && (
                <Typography
                  type="body-small"
                  weight="medium"
                  textColor="#525252"
                >
                  {`You’ll receive: £${formatNumber({
                    value: Number(enterAmount.replace(/,/g, "")) * 0.1
                  })}`}
                </Typography>
              )
            )}
          </View>
        </View>
        {/* Bottom */}
        <View className="px-6">
          <Button
            disabled={!enterAmount}
            variant="default"
            size={"lg"}
            className="rounded-full bg-primary h-[48px]"
            // loading
            onPress={handleContinue}
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {t`Continue`}
            </Typography>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
export default LoadCardScreen;
