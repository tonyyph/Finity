import {CardLost, FinityLogo, MasterCard, OnboardCard, SmartChip} from '@/assets'
import {
  AnimatedSpinnerV2,
  ArrowRightIcon,
  BottomSheet,
  Button,
  DowntimeMessage,
  FreezeIcon,
  FrozenIcon,
  HomeSkeleton,
  MenuItem,
  Typography,
  UnFreezeIcon,
} from '@/components'
import {useCardHolder} from '@/hooks'
import {BottomIndicatorAvoidingView, scale, TopIndicatorAvoidingView, tw} from '@/utils'
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet'
import {BlurView} from 'expo-blur'
import {router, useFocusEffect} from 'expo-router'
import {isEmpty} from 'lodash-es'
import {EyeIcon, TriangleAlertIcon, XIcon} from 'lucide-react-native'
import {useCallback, useRef} from 'react'
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'

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
  } = useCardHolder()

  useFocusEffect(
    useCallback(() => {
      fetchCardHolderCurrent()
      !!showBottomSheetPin && sheetRef.current?.present()
    }, [showBottomSheetPin]),
  )

  const {cardholderId, cardBalance, pointsBalance, cardStatus, last4Digits, hasIssuedCard} = userData || {}

  const sheetRef = useRef<BottomSheetModal>(null)

  const handleViewPIN = async () => {
    router.push({
      pathname: '/pin-verification',
      params: {
        type: 'view-pin',
      },
    })
  }

  // //ACTIVE, FROZEN, DAMAGED
  if (cardStatus === 1 || cardStatus === 4 || cardStatus === 3) {
    return (
      <>
        <View style={tw`flex-1 bg-white`}>
          <TopIndicatorAvoidingView />
          <Typography type="hs" weight="semibold" style={tw`p-sp12`}>
            {'Card'}
          </Typography>
          {hasIssuedCard && (
            <View style={tw`p-sp12 mx-sp16 mt-sp8 rounded-br12 items-start bg-teal-200 flex-row`}>
              <Image source={require('@/assets/images/info-filled-b.png')} style={tw`w-w24 h-h24`} />
              <View style={tw`px-sp12 gap-sp4 flex-1`}>
                <Typography weight="semibold">Your card is on its way!</Typography>
                <Typography weight="regular">Expect your card to arrive within 5-7 business days.</Typography>
              </View>
            </View>
          )}
          <View style={tw`bg-neutral-100 border border-[#E5E5E5] items-center justify-center p-sp16 rounded-br16 m-sp16`}>
            <View style={tw.style(`bg-white w-full h-h240 border border-subtitle rounded-br12 flex-row`, styles.shadow)}>
              <View style={tw`justify-between flex-1 items-start px-sp24 pt-sp8 pb-sp24`}>
                <View style={tw`h-h48`} />
                <Image resizeMode="contain" source={SmartChip} style={tw`w-w44 h-h32 mx-sp16`} />
                <View style={tw`h-h48`} />
                <View style={tw`flex-row items-center gap-sp12`}>
                  <Typography>{`**** ${last4Digits ?? '****'}`}</Typography>
                </View>
              </View>
              <View style={tw`justify-between flex-1 items-end p-sp24`}>
                <Image resizeMode="contain" source={FinityLogo} style={tw`w-w100 h-h28`} />
                <Image resizeMode="contain" source={MasterCard} style={tw`w-w65 h-h40`} />
              </View>
              {cardStatus === 3 && (
                <BlurView intensity={25} experimentalBlurMethod="dimezisBlurView" tint="extraLight" style={styles.blurView}>
                  <FrozenIcon />
                  <Typography type="bl">Card frozen</Typography>
                </BlurView>
              )}
            </View>
          </View>
          <View style={tw`gap-sp4 px-sp16 py-sp4`}>
            <MenuItem label={`View PIN`} onPress={handleViewPIN} icon={EyeIcon} />
            <MenuItem
              label={cardStatus === 3 ? `Unfreeze card` : `Freeze card`}
              onPress={handleFreezeCard}
              icon={cardStatus === 3 ? UnFreezeIcon : FreezeIcon}
              rightSection={freezeLoading && <AnimatedSpinnerV2 size={scale(20)} color={'#ff885d'} />}
            />
            <MenuItem label={`Report lost or damaged`} icon={TriangleAlertIcon} rightSection={<ArrowRightIcon />} onPress={handleReport} />
          </View>
        </View>
        <BottomSheet ref={sheetRef} onDismiss={() => setShowBottomSheetPin(false)} index={0} snapPoints={['40%']}>
          <BottomSheetView>
            <View style={tw`flex-row justify-between gap-sp12 p-sp12 items-center`}>
              <View style={tw`h-h24 w-w24`} />
              <Typography type="bl" weight="semibold">
                {`View PIN`}
              </Typography>
              <TouchableOpacity style={tw`flex-shrink items-center`} onPress={() => sheetRef.current?.close()}>
                <XIcon style={tw`h-h24 w-w24 text-black`} />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row items-center justify-center gap-sp12 mt-sp24 px-sp16`}>
              {PINInfo?.split('').map((digit, index) => (
                <View key={index} style={tw`bg-neutral-100 rounded-br8 items-center w-w56 h-h56 border border-[##D4D4D4] justify-center`}>
                  <Typography type="hsm" weight="medium">
                    {digit}
                  </Typography>
                </View>
              ))}
            </View>
            <View style={tw`p-sp12 mx-sp16 my-sp24 rounded-br12 items-start bg-teal-200 flex-row`}>
              <Image source={require('@/assets/images/info-filled-b.png')} style={tw`w-w24 h-h24`} />
              <View style={tw`px-sp12 gap-sp4 flex-1`}>
                <Typography weight="regular">Your PIN is confidential. For your security, this will automatically close.</Typography>
              </View>
            </View>
            <DowntimeMessage ref={sheetRef} />
            <BottomIndicatorAvoidingView />
          </BottomSheetView>
        </BottomSheet>
      </>
    )
  }

  if (loading && isEmpty(userData)) {
    return (
      <View style={tw`flex-1 bg-white`}>
        <HomeSkeleton />
      </View>
    )
  }

  //REQUIRING ACTIVATION
  return (
    <View style={tw`flex-1 bg-white`}>
      <TopIndicatorAvoidingView />
      <Typography type="hs" weight="semibold" style={tw`p-sp12`}>
        {'Card'}
      </Typography>
      {cardStatus === 0 && (
        <View style={tw`p-sp12 mx-sp16 mt-sp8 rounded-br12 items-start bg-teal-200 flex-row`}>
          <Image source={require('@/assets/images/info-filled-b.png')} style={tw`w-w24 h-h24`} />
          <View style={tw`px-sp12 gap-sp4 flex-1`}>
            <Typography weight="semibold">Your card is on its way!</Typography>
            <Typography weight="regular">Expect your card to arrive within 5-7 business days.</Typography>
          </View>
        </View>
      )}
      <View style={tw`bg-neutral-100 border border-[#E5E5E5] rounded-br16 min-h-h200 p-sp12 m-sp16 gap-sp16`}>
        <View style={tw`gap-sp12`}>
          {hasIssuedCard && (cardBalance !== 0 || pointsBalance !== 0) ? (
            <Image resizeMode="cover" source={CardLost} style={tw`w-full h-h240 rounded-br12 mb-sp4`} />
          ) : (
            <Image resizeMode="contain" source={OnboardCard} style={tw`w-w192 h-h300 mx-auto self-center`} />
          )}
          {!cardholderId && (
            <Typography weight="regular" textColor="#404040" style={tw`text-center px-sp16`}>
              Request a physical card, convert your points, and start spending.
            </Typography>
          )}
        </View>
        {(!cardholderId || cardStatus === 0) && (
          <Button.Primary title={!cardholderId ? `Request card` : `Activate card`} onPress={!cardholderId ? handleRequestCard : handleActiveCard} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    gap: 8,
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
})
