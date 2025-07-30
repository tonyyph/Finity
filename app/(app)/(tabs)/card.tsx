import {
  CardLost,
  FinityLogo,
  FreezeIcon,
  MasterCard,
  OnboardCard,
  SmartChip,
  UnFreezeIcon
} from "@/assets";
import { ArrowRightIcon } from "@/assets/icons/ArrowRightIcon";
import { FrozenIcon } from "@/assets/icons/FrozenIcon";
import { DowntimeMessage } from "@/components";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { MenuItem } from "@/components/common/menu-item";
import { Typography } from "@/components/common/text-typography";
import { HomeSkeleton } from "@/components/skeleton/home-skeleton";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import AnimatedSpinnerV2 from "@/components/ui/spinnerIndicator";
import { useCardHolder } from "@/hooks/cardholders/useCardHolder";
import { cn, IS_ANDROID } from "@/lib/utils";
import { exactDesign } from "@/utils";
import {
  BottomIndicatorAvoidingView,
  TopIndicatorAvoidingView
} from "@/utils/spacing";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { router, useFocusEffect } from "expo-router";
import { isEmpty } from "lodash-es";
import { EyeIcon, TriangleAlertIcon, XIcon } from "lucide-react-native";
import { useCallback, useRef } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function CardScreen() {
  const {
    userData,
    handleRequestCard,
    handleActiveCard,
    handleReport,
    handleFreezeCard,
    loading,
    freezeLoading,
    fetchCardHolderCurrent,
    showBottomSheetPin,
    setShowBottomSheetPin,
    PINInfo,
    getPINDetailInfo
  } = useCardHolder();

  useFocusEffect(
    useCallback(() => {
      fetchCardHolderCurrent();
      !!showBottomSheetPin && sheetRef.current?.present();
      !!showBottomSheetPin && getPINDetailInfo();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showBottomSheetPin])
  );

  const {
    cardholderId,
    cardBalance,
    pointsBalance,
    cardStatus,
    last4Digits,
    hasIssuedCard
  } = userData || {};

  const sheetRef = useRef<BottomSheetModal>(null);

  const handleViewPIN = async () => {
    router.push({
      pathname: "/pin-verification",
      params: {
        type: "view-pin"
      }
    });
  };

  // //ACTIVE, FROZEN, DAMAGED
  if (cardStatus === 1 || cardStatus === 4 || cardStatus === 3) {
    return (
      <>
        <View className="flex-1 bg-background">
          <TopIndicatorAvoidingView />
          <Typography type="heading-small" weight="semibold" className="p-4">
            {"Card"}
          </Typography>
          {hasIssuedCard && (
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
          <View className="bg-neutral-100 border border-[#E5E5E5] px-4 py-2 rounded-2xl m-4 gap-4">
            <View
              style={styles.shadow}
              className={cn(
                `bg-white w-full h-[240px] my-2 border border-border rounded-xl flex-row`,
                IS_ANDROID && `h-[200px]`
              )}
            >
              <View className="justify-between flex-1 items-start p-6">
                <View className="h-12" />
                <Image
                  resizeMode="contain"
                  source={SmartChip}
                  className="w-[44px] h-[32px] mx-4"
                />
                <View className="h-12" />
                <View className="flex-row items-center gap-3">
                  <Typography>{`**** ${last4Digits ?? "****"}`}</Typography>
                </View>
              </View>
              <View className="justify-between flex-1 items-end p-6">
                <Image
                  resizeMode="contain"
                  source={FinityLogo}
                  className="w-[100px] h-[27px]"
                />
                <Image
                  resizeMode="contain"
                  source={MasterCard}
                  className="w-[65px] h-[40px]"
                />
              </View>
              {cardStatus === 3 && (
                <BlurView
                  intensity={25}
                  experimentalBlurMethod="dimezisBlurView"
                  tint="extraLight"
                  style={styles.blurView}
                >
                  <FrozenIcon />
                  <Typography type="body-large">Card frozen</Typography>
                </BlurView>
              )}
            </View>
          </View>
          <View className={`gap-1 px-4 py-1`}>
            <MenuItem
              label={`View PIN`}
              onPress={handleViewPIN}
              icon={EyeIcon}
            />
            <MenuItem
              label={cardStatus === 3 ? `Unfreeze card` : `Freeze card`}
              onPress={handleFreezeCard}
              icon={cardStatus === 3 ? UnFreezeIcon : FreezeIcon}
              rightSection={
                freezeLoading && (
                  <AnimatedSpinnerV2 size={exactDesign(24)} color={"#fb923c"} />
                )
              }
            />
            <MenuItem
              label={`Report lost or damaged`}
              icon={TriangleAlertIcon}
              rightSection={<ArrowRightIcon />}
              onPress={handleReport}
            />
          </View>
        </View>
        <BottomSheet
          ref={sheetRef}
          onDismiss={() => setShowBottomSheetPin(false)}
          index={0}
          snapPoints={["40%"]}
        >
          <BottomSheetView>
            <View className="flex-row justify-between gap-3 p-3 items-center">
              <View className="h-[24px] w-[24px]" />
              <Typography type="body-large" weight="semibold">
                {`View PIN`}
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
            <View className="flex-row items-center justify-center gap-3 mt-6 px-4">
              {PINInfo?.split("").map((digit, index) => (
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
            <BottomIndicatorAvoidingView />
          </BottomSheetView>
        </BottomSheet>
      </>
    );
  }

  if (loading && isEmpty(userData)) {
    return (
      <View className="flex-1 bg-background">
        <HomeSkeleton />
      </View>
    );
  }

  //REQUIRING ACTIVATION
  return (
    <View className="flex-1 bg-background">
      <TopIndicatorAvoidingView />
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
          {hasIssuedCard && (cardBalance !== 0 || pointsBalance !== 0) ? (
            <Image
              resizeMode="cover"
              source={CardLost}
              className="w-full h-[240px] rounded-xl mb-1"
            />
          ) : (
            <Image
              resizeMode="contain"
              source={OnboardCard}
              className="w-[192px] h-[300px] mx-auto self-center"
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
    borderRadius: 12,
    overflow: "hidden",
    gap: 8
  },
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2
  }
});
