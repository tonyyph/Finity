/* eslint-disable react-hooks/exhaustive-deps */
import {
  MenuItem,
  BottomSheet,
  CircleAlert,
  Typography,
  Button,
  Header,
  ProgressBar,
  Touch
} from "@/components";
import { useAnimatedKeyboard, useCardHolder } from "@/hooks";
import { cn, IS_IOS } from "@/lib";
import { BottomIndicatorAvoidingView } from "@/utils";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { isEmpty } from "lodash-es";
import { XIcon } from "lucide-react-native";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Image, Keyboard, TextInput, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

function SendCardScreen() {
  const { isReset } = useLocalSearchParams();
  const { userData, fetchListCardHolder, listCardHolder, loading } =
    useCardHolder();

  const [enterAmount, setEnterAmount] = useState("");
  const [focusAmount, setFocusAmount] = useState(false);
  const [cardHolderValue, setCardHolderValue] = useState<UserCardHolder>(
    {} as UserCardHolder
  );
  const [error, setError] = useState("");
  const [cardHolderError, setCardHolderError] = useState("");
  const sheetRef = useRef<BottomSheetModal>(null);

  const { keyboardHeight } = useAnimatedKeyboard(0);
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value
  }));

  useEffect(() => {
    if (isReset === "true") {
      setEnterAmount("");
      setError("");
      Keyboard.dismiss();
    }
  }, [isReset]);

  useLayoutEffect(() => {
    fetchListCardHolder();
  }, []);

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
      (Number(enterAmount) < 1 ||
        Number(enterAmount) > userData?.pointsBalance) &&
      !!enterAmount
    ) {
      setError(
        Number(enterAmount) < 1
          ? "The minimum amount to send is 1 point"
          : "Amount exceeds your balance"
      );
    }
  }, [enterAmount, userData]);

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
          type: "send-points",
          amount: Number(enterAmount),
          cardHolderName: isEmptyString(cardHolderValue?.name ?? "")
            ? cardHolderValue?.email
            : cardHolderValue?.name,
          cardHolderId: cardHolderValue?.id
        }
      });
    }
  };

  const isEmptyString = (str: string) => !str.trim();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <Header onBack={router.back} title="Send points" />
        <ProgressBar completeAnimation />

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
              disabled={loading}
              onPress={() => {
                sheetRef?.current?.present();
                Keyboard.dismiss();
              }}
              className={cn(
                "flex-row justify-between items-center rounded-lg z-10 border-[1px] border-subtitle px-3",
                {
                  "border-errormessage": !!cardHolderError,
                  "border-2": !!cardHolderError
                }
              )}
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
                value={!!enterAmount ? formatAmount(enterAmount) : ""}
                className="flex-1 bg-white h-[72px] text-[28px] font-[NeueMontreal-Medium]"
                onFocus={() => setFocusAmount(true)}
                onEndEditing={() => setFocusAmount(false)}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  setError("");
                  setEnterAmount(text);
                }}
                selectionColor={"#525252"}
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

        <BottomSheet ref={sheetRef} index={0} snapPoints={["50%"]}>
          <View className="flex-row justify-between gap-3 p-3 items-center">
            <View className="h-[24px] w-[24px]" />
            <Typography type="body-large" weight="semibold">
              {`Select a cardholder`}
            </Typography>
            <Button
              className="flex-shrink items-center"
              size="icon"
              variant="ghost"
              onPress={() => sheetRef.current?.close()}
            >
              <XIcon className="h-[24px] w-[24px] text-black" />
            </Button>
          </View>
          <View className="mb-3" />
          <BottomSheetScrollView
            className="min-h-[100%]"
            showsVerticalScrollIndicator={false}
          >
            <View className="p-4 mb-4">
              {listCardHolder?.map((item, index) => (
                <View key={`${index}`}>
                  <MenuItem
                    label={
                      !isEmptyString(item?.name) ? item?.name : item?.email
                    }
                    showUserAvatar
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
            <BottomIndicatorAvoidingView />
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </View>
  );
}
export default SendCardScreen;
