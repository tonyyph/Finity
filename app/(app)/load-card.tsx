import { CircleAlert } from "@/components/common/icons";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import Tooltip from "@/components/ui/tooltip";
import { useAnimatedKeyboard } from "@/hooks";
import { useCardHolder } from "@/hooks/cardholders/useCardHolder";
import { cn, IS_IOS } from "@/lib/utils";
import { formatNumber } from "@/utils";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Keyboard, TextInput, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

function LoadCardScreen() {
  const { isReset } = useLocalSearchParams();

  const [enterAmount, setEnterAmount] = useState("");
  const [error, setError] = useState("");
  const [focusAmount, setFocusAmount] = useState(false);
  const { userData } = useCardHolder();

  useEffect(() => {
    if (isReset === "true") {
      setEnterAmount("");
      setError("");
      Keyboard.dismiss();
    }
  }, [isReset]);

  const { keyboardHeight } = useAnimatedKeyboard(0);
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value
  }));

  const formatPointValue = new Intl.NumberFormat("en-US").format(
    Number(userData?.pointsBalance ?? 0)
  );

  const formatAmount = (value: string) => {
    let numericValue = value.toString().replace(/,/g, "").replace(/\D/g, "");
    let formattedValue = new Intl.NumberFormat("en-US").format(
      Number(numericValue)
    );
    return formattedValue;
  };

  useEffect(() => {
    if (
      (Number(enterAmount) < 100 ||
        Number(enterAmount) > userData?.pointsBalance) &&
      !!enterAmount
    ) {
      setError(
        Number(enterAmount) < 100
          ? "The minimum amount to load is 100 points"
          : "Amount exceeds your balance"
      );
    } else {
      setError("");
    }
  }, [enterAmount, userData]);

  const handleContinue = () => {
    if (enterAmount?.includes(",")) {
      setError("Invalid amount");
      return;
    }
    if (
      Number(enterAmount) < 100 ||
      Number(enterAmount) > userData?.pointsBalance
    ) {
      return;
    } else {
      router.push({
        pathname: "/pin-verification",
        params: {
          type: "load-card",
          amount: Number(enterAmount),
          pointsBalance: userData?.pointsBalance,
          cardHolderName: "Amber Green"
        }
      });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <Header onBack={router.back} title="Load points to card" />
        <ProgressBar completeAnimation />

        <View className="flex-1">
          <View className="p-4 gap-2">
            <Typography type="body-default" weight="medium" textColor="#404040">
              {`Points balance`}
            </Typography>
            <TextInput
              editable={false}
              value={formatPointValue}
              className="bg-neutral-100  rounded-lg h-[48px] border-[1px] border-subtitle px-3 text-[18px] font-bold color-[#404040]"
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
                {`Conversion rate: 1 point = £0.10`}
              </Typography>
            </View>
          </View>
          {/* Enter amount */}
          <View className="p-4 gap-2 ">
            <Typography type="body-default" weight="medium" textColor="#404040">
              {`Enter amount`}
            </Typography>
            <View
              className={cn(
                "flex-row justify-between items-center rounded-lg border-[1px] border-subtitle px-4 gap-6",
                {
                  "border-black": !!focusAmount,
                  "border-errormessage": !!error,
                  "border-2": !!error || !!focusAmount
                }
              )}
            >
              <TextInput
                value={formatAmount(enterAmount)}
                className="flex-1 bg-white h-[72px] text-[28px] font-[NeueMontreal-Medium]"
                keyboardType="number-pad"
                onFocus={() => setFocusAmount(true)}
                onEndEditing={() => setFocusAmount(false)}
                onChangeText={(text) => {
                  setEnterAmount(text);
                }}
              />
              <Typography type="body-large" weight="medium" textColor="#737373">
                {`points`}
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
                  {error}
                </Typography>
              </View>
            ) : (
              (!!Number(enterAmount.replace(/,/g, "")) || focusAmount) && (
                <Typography
                  type="body-small"
                  weight="medium"
                  textColor="#525252"
                >
                  {`You’ll receive: £${formatNumber({
                    value: (
                      parseFloat(enterAmount.replace(",", ".")) / 10
                    ).toFixed(2)
                  })}`}
                </Typography>
              )
            )}
          </View>
        </View>
        {/* Bottom */}
        <Animated.View className="justify-end">
          <View className="px-4">
            <Button
              disabled={!enterAmount}
              variant="default"
              size={"lg"}
              className="rounded-full bg-primary h-[48px]"
              onPress={handleContinue}
            >
              <Typography
                type="body-default"
                weight="medium"
                textColor={!enterAmount ? "#A3A3A3" : "white"}
              >
                {`Continue`}
              </Typography>
            </Button>
          </View>
          <BottomIndicatorAvoidingView />
        </Animated.View>
        <Animated.View style={translateStyle} />
      </View>
    </View>
  );
}
export default LoadCardScreen;
