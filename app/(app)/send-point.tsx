import {BottomSheet, Button, CircleAlert, Header, MenuItem, ProgressBar, Touch, Typography} from '@/components'
import {useAnimatedKeyboard, useCardHolder} from '@/hooks'
import {IS_IOS} from '@/lib'
import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet'
import {router, useLocalSearchParams} from 'expo-router'
import {isEmpty} from 'lodash-es'
import {XIcon} from 'lucide-react-native'
import {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Image, Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'

function SendCardScreen() {
  const {isReset} = useLocalSearchParams()
  const {userData, fetchListCardHolder, listCardHolder, loading} = useCardHolder()

  const [enterAmount, setEnterAmount] = useState('')
  const [focusAmount, setFocusAmount] = useState(false)
  const [cardHolderValue, setCardHolderValue] = useState<UserCardHolder>({} as UserCardHolder)
  const [error, setError] = useState('')
  const [cardHolderError, setCardHolderError] = useState('')
  const sheetRef = useRef<BottomSheetModal>(null)

  const {keyboardHeight} = useAnimatedKeyboard(0)
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value - 12,
  }))

  useEffect(() => {
    if (isReset === 'true') {
      setEnterAmount('')
      setError('')
      Keyboard.dismiss()
    }
  }, [isReset])

  useLayoutEffect(() => {
    fetchListCardHolder()
  }, [])

  const formatPointValue = new Intl.NumberFormat('en-US').format(Number(userData?.pointsBalance ?? 0))

  const formatAmount = (value: string): string => {
    let numericValue = value.toString().replace(/,/g, '').replace(/\D/g, '')
    let formattedValue = new Intl.NumberFormat('en-US').format(Number(numericValue))
    return formattedValue
  }

  const parseAmount = (value: string): number => {
    const numericValue = value.replace(/,/g, '').trim()
    return Number(numericValue)
  }

  useEffect(() => {
    const amount = parseAmount(enterAmount)

    if ((amount < 1 || amount > userData?.pointsBalance) && !!enterAmount) {
      setError(amount < 1 ? 'The minimum amount to send is 1 point' : 'Amount exceeds your balance')
    } else {
      setError('')
    }
  }, [enterAmount, userData])

  const handleContinue = () => {
    const amount = parseAmount(enterAmount)

    if (isEmpty(cardHolderValue)) {
      setCardHolderError('You must select a cardholder')
    }

    if (cardHolderValue?.status === 0) {
      setCardHolderError('Cardholder must verify account to receive points')
    }

    if ((amount < 1 || amount > userData?.pointsBalance) && !!enterAmount) {
      setError(amount < 1 ? 'The minimum amount to send is 1 point' : 'Amount exceeds your balance')
    }

    if (amount >= 1 && amount <= userData?.pointsBalance && !isEmpty(cardHolderValue) && cardHolderValue?.status !== 0) {
      Keyboard.dismiss()
      router.push({
        pathname: '/pin-verification',
        params: {
          type: 'send-points',
          amount: amount,
          cardHolderName: isEmptyString(cardHolderValue?.name ?? '') ? cardHolderValue?.email : cardHolderValue?.name,
          cardHolderId: cardHolderValue?.id,
        },
      })
    }
  }

  const isEmptyString = (str: string) => !str.trim()

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw`flex-1 bg-white`}>
        <View style={tw`flex-1`}>
          <Header onBack={router.back} title="Send points" />
          <ProgressBar completeAnimation />

          <View style={tw`flex-1`}>
            {/* point balance */}
            <View style={tw`p-sp12 gap-sp8`}>
              <Typography type="bd" weight="medium" textColor="#404040">
                {`Points balance`}
              </Typography>
              <TextInput
                editable={false}
                value={formatPointValue}
                style={tw`bg-neutral-100  rounded-br8 h-h48 border-bw1 border-border2 px-sp12 text-bl font-semibold`}
              />
            </View>
            {/* card holder */}
            <View style={tw`p-sp12 gap-sp8`}>
              <Typography type="bd" weight="medium" textColor="#404040">
                {`Cardholder`}
              </Typography>
              <Touch
                disabled={loading}
                onPress={() => {
                  sheetRef?.current?.present()
                  Keyboard.dismiss()
                }}
                style={tw.style(`flex-row justify-between items-center rounded-br8 z-10 border-bw1 border-border2 px-sp12`, {
                  'border-errormessage': !!cardHolderError,
                  'border-bw2': !!cardHolderError,
                })}>
                <View style={tw`bg-white h-h48 justify-center`}>
                  <Typography>{isEmptyString(cardHolderValue?.name ?? '') ? cardHolderValue?.email : cardHolderValue?.name}</Typography>
                </View>
                <Image source={require('@/assets/images/caret-down.png')} style={tw`w-w24 h-h24`} />
              </Touch>
              {(cardHolderValue?.status === 0 || isEmpty(cardHolderValue)) && cardHolderError && (
                <View style={tw`flex flex-row items-center`}>
                  <CircleAlert style={tw`mr-sp4`} />
                  <Typography type="bs" weight="medium" textColor="#D9323D">
                    {cardHolderError}
                  </Typography>
                </View>
              )}
            </View>
            {/* Enter amount */}
            <View style={tw`p-sp12 gap-sp8`}>
              <Typography type="bd" weight="medium" textColor="#404040">
                {`Enter amount`}
              </Typography>
              <View
                style={tw.style(`flex-row justify-between items-center rounded-br8 border-bw1 border-border2 px-sp16 gap-sp24`, {
                  'border-black': !!focusAmount,
                  'border-errormessage': !!error,
                  'border-bw2': !!error || !!focusAmount,
                })}>
                <TextInput
                  value={!!enterAmount ? formatAmount(enterAmount) : ''}
                  style={tw.style(`flex-1 bg-white h-h72 text-hm font-medium`, {
                    fontFamily: 'NeueMontreal-Medium',
                  })}
                  onFocus={() => setFocusAmount(true)}
                  onEndEditing={() => setFocusAmount(false)}
                  keyboardType="number-pad"
                  onChangeText={text => {
                    setError('')
                    setEnterAmount(text)
                  }}
                  selectionColor={'#525252'}
                />
                <Typography type="bl" weight="medium" textColor="#737373">
                  {`points`}
                </Typography>
              </View>
              {!!error && (
                <View style={tw`flex flex-row items-center`}>
                  <CircleAlert style={tw`mr-sp4`} />
                  <Typography type="bs" weight="medium" textColor="#D9323D">
                    {error}
                  </Typography>
                </View>
              )}
            </View>
          </View>
          {/* Bottom */}
          <View key={1} style={tw`justify-end px-sp16 py-sp12`}>
            <Button.Primary title={`Continue`} disabled={!enterAmount} onPress={handleContinue} />

            <BottomIndicatorAvoidingView />
          </View>
          <Animated.View style={translateStyle} />

          <BottomSheet ref={sheetRef} index={0} snapPoints={['50%']}>
            <View style={tw`flex-row justify-between gap-sp12 p-sp12 items-center`}>
              <View style={tw`h-h24 w-w24`} />
              <Typography type="bl" weight="semibold">
                {`Select a cardholder`}
              </Typography>
              <TouchableOpacity style={tw`flex-shrink items-center`} onPress={() => sheetRef.current?.close()}>
                <XIcon style={tw`h-h24 w-w24 text-black`} />
              </TouchableOpacity>
            </View>
            <View style={tw`mb-sp12`} />
            <BottomSheetScrollView style={tw`min-h-[100%]`} showsVerticalScrollIndicator={false}>
              <View style={tw`p-sp12 mb-sp16`}>
                {listCardHolder?.map((item, index) => (
                  <View key={`${index}`}>
                    <MenuItem
                      label={!isEmptyString(item?.name) ? item?.name : item?.email}
                      showUserAvatar
                      onPress={() => {
                        setCardHolderValue(item)
                        setCardHolderError('')
                        sheetRef.current?.close()
                      }}
                      style={tw`py-sp12`}
                    />
                    {index < listCardHolder.length - 1 && <View style={tw`h-h1 my-sp8 bg-[#E5E5E5]`} />}
                  </View>
                ))}
              </View>
              <BottomIndicatorAvoidingView />
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default SendCardScreen
