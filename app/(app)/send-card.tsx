import { BottomSheet } from "@/components/common/bottom-sheet";
import { CircleAlert } from "@/components/common/icons";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { Progress } from "@/components/ui/progress";
import Tooltip from "@/components/ui/tooltip";
import Touch from "@/components/ui/touch";
import { colors } from "@/constants/Colors";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { t } from "@lingui/macro";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, SafeAreaView, Text, TextInput, View } from "react-native";

const mockupCardHolders = [
  { id: 1, shortName: "AG", name: "Amber Green", isChoose: true },
  { id: 2, shortName: "BB", name: "Blaire Brown", isChoose: false },
  { id: 3, shortName: "ZW", name: "Zack White", isChoose: false }
];

function SendCardScreen() {
  const [enterAmount, setEnterAmount] = useState("");
  const [error, setError] = useState(false);
  const sheetRef = useRef<BottomSheetModal>(null);

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
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <Header onBack={router.back} title="Send points" />
        <Progress
          value={80}
          className="h-[4px] mt-4 bg-border"
          indicatorClassName="bg-orange-primary"
        />
        <View className="flex-1">
          {/* point balance */}
          <View className="p-4 gap-2">
            <Typography type="body-default" weight="medium" textColor="#404040">
              {t`Points balance`}
            </Typography>
            <TextInput
              editable={false}
              value={"123,890"}
              className="bg-neutral-100  rounded-lg h-[48px] border-[1px] border-subtitle px-3 text-[18px] font-semibold"
            />
          </View>
          {/* card holder */}
          <View className="p-4 gap-2">
            <Typography type="body-default" weight="medium" textColor="#404040">
              {t`Cardholder`}
            </Typography>
            <Touch
              onPress={() => {
                sheetRef?.current?.present();
              }}
              className="flex-row justify-between items-center rounded-lg z-10 border-[1px] border-subtitle px-3"
            >
              <TextInput
                editable={false}
                value={"Amber Green"}
                className="flex-1 bg-white h-[48px] text-[16px] font-medium"
              />
              <Image
                source={require("@/assets/images/caret-down.png")}
                className="w-[24px] h-[24px]"
              />
            </Touch>
          </View>
          {/* Enter amount */}
          <View className="p-4 gap-2 ">
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
        <View className="px-4">
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
        <BottomSheet ref={sheetRef} index={0} enableDynamicSizing>
          <BottomSheetView className="min-h-[50%]">
            <Header
              title="Select a cardholder"
              onRightFunction={() => {
                sheetRef.current?.close();
              }}
            />
            <View className="p-4 my-4">
              {mockupCardHolders.map((item, index) => (
                <View className="gap-4">
                  <View
                    key={item.id}
                    className={cn(
                      "flex-row gap-4 items-center rounded-lg  p-4 mb-2",
                      item?.isChoose && "bg-[#E5E5E5]"
                    )}
                  >
                    <View className="flex items-center justify-center w-10 h-10 rounded-full bg-[#A3A3A3]">
                      <Typography textColor="white">
                        {item?.shortName}
                      </Typography>
                    </View>
                    <Typography type="body-default" weight="medium">
                      {item.name}
                    </Typography>
                  </View>
                  {index < 2 && (
                    <View className="h-[1px] bottom-3 bg-[#E5E5E5]" />
                  )}
                </View>
              ))}
            </View>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </View>
  );
}
export default SendCardScreen;
