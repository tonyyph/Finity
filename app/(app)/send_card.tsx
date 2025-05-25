import { MenuItem } from "@/components/common";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { CircleAlert } from "@/components/common/icons";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import Touch from "@/components/ui/touch";
import { useAnimatedKeyboard } from "@/hooks";
import { useCardHolder } from "@/hooks/cardholders/useCardHolder";
import { cn } from "@/lib/utils";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { isEmpty } from "lodash-es";
import { useLayoutEffect, useRef, useState } from "react";
import { Image, Keyboard, SafeAreaView, TextInput, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

function SendCardScreen() {
  const { userData, fetchListCardHolder, listCardHolder } = useCardHolder();
  const [enterAmount, setEnterAmount] = useState("");
  const [cardHolderValue, setCardHolderValue] = useState<UserCardHolder>(
    {} as UserCardHolder
  );
  const [error, setError] = useState("");
  const [cardHolderError, setCardHolderError] = useState("");
  const sheetRef = useRef<BottomSheetModal>(null);
  const { keyboardHeight } = useAnimatedKeyboard(0);
  const translateStyle = useAnimatedStyle(() => ({
    height: keyboardHeight.value
  }));

  useLayoutEffect(() => {
    fetchListCardHolder();
  }, []);

  const formatPointValue = new Intl.NumberFormat("en-US").format(
    Number(userData?.pointsBalance ?? 0)
  );

  const handleContinue = () => {
    if (enterAmount?.includes(",")) {
      setError("Amount must be a whole number");
    }
    if (isEmpty(cardHolderValue)) {
      setCardHolderError("You must select a cardholder");
    }
    if (cardHolderValue?.status === 0) {
      setCardHolderError("Cardholder must verify account to receive points");
    }
    if (
      Number(enterAmount) < 1 ||
      Number(enterAmount) > userData?.pointsBalance
    ) {
      setError(
        Number(enterAmount) < 1
          ? "The minimum amount to send is 1 point"
          : "Amount exceeds your balance"
      );
    }
    if (
      Number(enterAmount) >= 1 &&
      Number(enterAmount) <= userData?.pointsBalance &&
      !isEmpty(cardHolderValue) &&
      cardHolderValue?.status !== 0
    ) {
      router.push({
        pathname: "/pin-verification",
        params: {
          type: "load-card",
          amount: Number(enterAmount),
          cardHolderName: "Amber Green"
        }
      });
    }
  };

  const isEmptyString = (str: string) => !str.trim();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <Header onBack={router.back} title="Send points" />
        <ProgressBar />

        <View className="flex-1">
          {/* point balance */}
          <View className="p-4 gap-2">
            <Typography type="body-default" weight="medium" textColor="#404040">
              {`Points balance`}
            </Typography>
            <TextInput
              editable={false}
              value={formatPointValue}
              className="bg-neutral-100  rounded-lg h-[48px] border-[1px] border-subtitle px-3 text-[18px] font-semibold"
            />
          </View>
          {/* card holder */}
          <View className="p-4 gap-2">
            <Typography type="body-default" weight="medium" textColor="#404040">
              {`Cardholder`}
            </Typography>
            <Touch
              onPress={() => {
                sheetRef?.current?.present();
                Keyboard.dismiss();
              }}
              className="flex-row justify-between items-center rounded-lg z-10 border-[1px] border-subtitle px-3"
            >
              <View className="bg-white h-[48px] justify-center">
                <Typography>
                  {isEmptyString(cardHolderValue?.name ?? "")
                    ? cardHolderValue?.email
                    : cardHolderValue?.name}
                </Typography>
              </View>
              <Image
                source={require("@/assets/images/caret-down.png")}
                className="w-[24px] h-[24px]"
              />
            </Touch>
            {(cardHolderValue?.status === 0 || isEmpty(cardHolderValue)) &&
              cardHolderError && (
                <View className={cn("flex flex-row items-center")}>
                  <CircleAlert className="top-1" />
                  <Typography
                    type="body-small"
                    weight="medium"
                    textColor="#D9323D"
                  >
                    {cardHolderError}
                  </Typography>
                </View>
              )}
          </View>
          {/* Enter amount */}
          <View className="p-4 gap-2 ">
            <Typography type="body-default" weight="medium" textColor="#404040">
              {`Enter amount`}
            </Typography>
            <View className="flex-row justify-between items-center rounded-lg border-[1px] border-subtitle px-4">
              <TextInput
                value={enterAmount}
                className="flex-1 bg-white h-[72px] text-[28px] font-medium"
                keyboardType="numeric"
                onChangeText={(text) => {
                  setError("");
                  setEnterAmount(text);
                }}
              />
              <Typography type="body-large" weight="medium" textColor="#737373">
                {`points`}
              </Typography>
            </View>
            {!!error && (
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
            )}
          </View>
        </View>
        {/* Bottom */}
        <View className="justify-end">
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
        </View>
        <Animated.View style={translateStyle} />

        <BottomSheet ref={sheetRef} index={0} snapPoints={["44%"]}>
          <BottomSheetView className="min-h-[50%] mt-1">
            <Header
              title="Select a cardholder"
              onRightFunction={() => {
                sheetRef.current?.close();
              }}
            />
            <View className="p-4 my-3 mb-4">
              {listCardHolder?.map((item, index) => (
                <View key={`${index}`}>
                  <MenuItem
                    label={
                      !isEmptyString(item?.name) ? item?.name : item?.email
                    }
                    onPress={() => {
                      setCardHolderValue(item);
                      setCardHolderError("");
                      sheetRef.current?.close();
                    }}
                    className="py-3"
                  />
                  {index < listCardHolder.length - 1 && (
                    <View className="h-[1px] my-2 bg-[#E5E5E5]" />
                  )}
                </View>
              ))}
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </View>
  );
}
export default SendCardScreen;
