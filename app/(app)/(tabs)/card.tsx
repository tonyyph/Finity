import { CardLost, FreezeIcon, OnboardCard, UnFreezeIcon } from "@/assets";
import { FrozenIcon } from "@/assets/icons/FrozenIcon";
import { BottomSheet } from "@/components/common/bottom-sheet";
import DowntimeMessage from "@/components/common/down-time-message";
import { MenuItem } from "@/components/common/menu-item";
import Typography from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { useCardHolder } from "@/hooks/cardholders/useCardHolder";
import { useUserAuthenticateStore, useUserSettingsStore } from "@/stores";
import { exactDesign } from "@/utils";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { router, useFocusEffect } from "expo-router";
import {
  ChevronRightIcon,
  EyeIcon,
  TriangleAlertIcon,
  XIcon
} from "lucide-react-native";
import { useRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CardScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { isDamagedCard, isDisableCard, isFreezeCard, setIsFreezeCard } =
    useUserSettingsStore();
  const { pinInfo, showBottomSheetPin, setShowBottomSheetPin } =
    useUserAuthenticateStore();

  const { userData, handleRequestCard, handleActiveCard, handleReport } =
    useCardHolder();

  const { cardholderId, cardStatus } = userData || {};

  const sheetRef = useRef<BottomSheetModal>(null);

  useFocusEffect(() => {
    !!showBottomSheetPin && sheetRef.current?.present();
  });

  const handleViewPIN = async () => {
    router.navigate({
      pathname: "/pin-verification",
      params: {
        type: "view-pin"
      }
    });
  };

  const handleFreezeCard = () => {
    setIsFreezeCard(!isFreezeCard);
  };

  const BottomSheetViewPin = () => {
    return (
      <BottomSheet
        ref={sheetRef}
        onDismiss={() => setShowBottomSheetPin(false)}
        index={0}
        snapPoints={["40%"]}
      >
        <BottomSheetView style={{ paddingBottom: bottom }}>
          <View className="flex-row items-center justify-between px-4">
            <View className="w-[24px] h-[24px]" />
            <Typography type="body-large" weight="semibold" className="p-4">
              {"View PIN"}
            </Typography>
            <XIcon
              onPress={() => {
                sheetRef.current?.dismiss();
              }}
              className="w-[24px] h-[24px] text-black"
            />
          </View>
          <View className="flex-row items-center justify-center gap-3 mt-6 px-4">
            {pinInfo?.split("").map((digit, index) => (
              <View
                key={index}
                className="bg-neutral-100 rounded-lg items-center w-[56px] h-[56px] border border-[##D4D4D4] justify-center"
              >
                <Typography type="heading-extraSmall" weight="medium">
                  {digit}
                </Typography>
              </View>
            ))}
          </View>
          <View className="p-3 mx-4 my-6 rounded-2xl items-start bg-teal-200 flex-row">
            <Image
              source={require("@/assets/images/info-filled-b.png")}
              className="w-[24px] h-[24px]"
            />
            <View className="px-3 gap-1 flex-1">
              <Typography weight="regular">
                Your PIN is confidential. For your security, this will
                automatically close.
              </Typography>
            </View>
          </View>
          <DowntimeMessage ref={sheetRef} />
        </BottomSheetView>
      </BottomSheet>
    );
  };

  if (cardStatus === 1 || cardStatus === 4) {
    return (
      <>
        <View className="flex-1 bg-background" style={{ paddingTop: top }}>
          <Typography type="heading-small" weight="semibold" className="p-4">
            {"Card"}
          </Typography>
          {isDamagedCard && (
            <View className="p-3 mx-4 mt-2 rounded-2xl items-start bg-teal-200 flex-row">
              <Image
                source={require("@/assets/images/info-filled-b.png")}
                className="w-[24px] h-[24px]"
              />
              <View className="px-3 gap-1 flex-1">
                <Typography weight="semibold">
                  Your card is on its way!
                </Typography>
                <Typography weight="regular">
                  Expect your card to arrive within 5-7 business days.
                </Typography>
              </View>
            </View>
          )}
          <View className="bg-neutral-100 border border-[#E5E5E5] px-3 py-1 rounded-2xl m-4 gap-4">
            <Image
              resizeMode="contain"
              source={require("@/assets/images/horizontal_card.png")}
              style={{ height: exactDesign(260), width: "100%" }}
            />
            {!isFreezeCard && (
              <BlurView
                intensity={25}
                experimentalBlurMethod="dimezisBlurView"
                tint="extraLight"
                style={styles.blurView}
              >
                <FrozenIcon />
                <Typography type="body-large" weight="medium">
                  Card frozen
                </Typography>
              </BlurView>
            )}
          </View>
          <View className="gap-3 p-4">
            <MenuItem
              label={`View PIN`}
              onPress={handleViewPIN}
              icon={EyeIcon}
            />
            <MenuItem
              label={isFreezeCard ? `Freeze card` : `Unfreeze card`}
              onPress={handleFreezeCard}
              icon={isFreezeCard ? FreezeIcon : UnFreezeIcon}
            />
            <MenuItem
              label={`Report lost or damaged`}
              icon={TriangleAlertIcon}
              rightSection={
                <ChevronRightIcon className="h-[24px] w-[24px] text-primary" />
              }
              onPress={handleReport}
            />
          </View>
        </View>
        <BottomSheetViewPin />
      </>
    );
  }

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: top }}>
      <Typography type="heading-small" weight="semibold" className="p-4">
        {"Card"}
      </Typography>
      {cardStatus === 0 && (
        <View className="p-3 mx-4 mt-2 rounded-2xl items-start bg-teal-200 flex-row">
          <Image
            source={require("@/assets/images/info-filled-b.png")}
            className="w-[24px] h-[24px]"
          />
          <View className="px-3 gap-1 flex-1">
            <Typography weight="semibold">Your card is on its way!</Typography>
            <Typography weight="regular">
              Expect your card to arrive within 5-7 business days.
            </Typography>
          </View>
        </View>
      )}
      <View className="bg-neutral-100 border border-[#E5E5E5] rounded-2xl min-h-[200px] p-4 m-4 gap-4">
        <View className="gap-3">
          {isDisableCard ? (
            <Image
              resizeMode="cover"
              source={CardLost}
              style={{
                width: "100%",
                height: exactDesign(208),
                borderRadius: exactDesign(12),
                marginBottom: exactDesign(4)
              }}
            />
          ) : (
            <Image
              resizeMode="contain"
              source={OnboardCard}
              style={{
                width: exactDesign(192),
                height: exactDesign(300),
                alignSelf: "center"
              }}
            />
          )}
          {!cardholderId && (
            <Typography
              weight="regular"
              textColor="#404040"
              className="text-center px-4"
            >
              Request a physical card, convert your points, and start spending.
            </Typography>
          )}
        </View>
        {(!cardholderId || cardStatus === 0) && (
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full bg-primary h-[48px] mb-1"
            onPress={!cardholderId ? handleRequestCard : handleActiveCard}
          >
            <Typography type="body-default" weight="medium" textColor="white">
              {!cardholderId ? `Request card` : `Activate card`}
            </Typography>
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    overflow: "hidden",
    gap: 8
  }
});
