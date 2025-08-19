import {CircleAlert} from '@/components/common/icons'
import {Typography} from '@/components/common/text-typography'
import {Button} from '@/components/ui/button'
import {Header} from '@/components/ui/header'
import {ProgressBar} from '@/components/ui/progress'
import Tooltip from '@/components/ui/tooltip'
import {useAnimatedKeyboard} from '@/hooks'
import {useCardHolder} from '@/hooks/cardholders/useCardHolder'
import {IS_IOS} from '@/lib'
import {BottomIndicatorAvoidingView, formatNumber, tw} from '@/utils'
import {router, useLocalSearchParams} from 'expo-router'
import {useEffect, useState} from 'react'
import {Image, Keyboard, TextInput, TouchableWithoutFeedback, View} from 'react-native'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'

function LoadCardScreen() {
  const {isReset} = useLocalSearchParams()
  const [enterAmount, setEnterAmount] = useState('')
  const [error, setError] = useState('')
  const [focusAmount, setFocusAmount] = useState(false)
  const {userData} = useCardHolder()

  useEffect(() => {
    if (isReset === 'true') {
      setEnterAmount('')
      setError('')
      Keyboard.dismiss()
    }
  }, [isReset])

  const {keyboardHeight} = useAnimatedKeyboard(0)
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value - 12,
  }))

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

    if ((amount < 100 || amount > userData?.pointsBalance) && !!enterAmount) {
      setError(amount < 100 ? 'The minimum amount to load is 100 points' : 'Amount exceeds your balance')
    } else {
      setError('')
    }
  }, [enterAmount, userData])

  const handleContinue = () => {
    const amount = parseAmount(enterAmount)

    if ((amount < 100 || amount > userData?.pointsBalance) && !!enterAmount) {
      setError(amount < 100 ? 'The minimum amount to load is 100 points' : 'Amount exceeds your balance')
    } else {
      Keyboard.dismiss()
      router.push({
        pathname: '/pin-verification',
        params: {
          type: 'load-card',
          amount: amount,
          pointsBalance: userData?.pointsBalance,
          cardHolderName: '',
          cardBalance: userData?.cardBalance,
        },
      })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw`flex-1 bg-white`}>
        <View style={tw`flex-1`}>
          <Header onBack={router.back} title="Load points to card" />
          <ProgressBar completeAnimation />

          <View style={tw`flex-1`}>
            <View style={tw`p-sp12 gap-sp8`}>
              <Typography type="bd" weight="medium" textColor="#404040">
                {`Points balance`}
              </Typography>
              <TextInput
                editable={false}
                value={formatPointValue}
                style={tw`bg-neutral-100 rounded-br8 h-h48 border-bw1 border-subtitle px-sp12 text-bl font-bold text-[#404040]`}
              />
              {/* point balance */}
              <View style={tw`flex-row gap-sp4 items-center`}>
                <View style={tw`items-start`}>
                  <Tooltip content="1 point = £0.10">
                    <Image source={require('@/assets/images/info-filled.png')} style={tw`w-w16 h-h16`} />
                  </Tooltip>
                </View>
                <Typography type="bs" weight="medium" textColor="#525252">
                  {`Conversion rate: 1 point = £0.10`}
                </Typography>
              </View>
            </View>
            {/* Enter amount */}
            <View style={tw`p-sp12 gap-sp8`}>
              <Typography type="bd" weight="medium" textColor="#404040">
                {`Enter amount`}
              </Typography>
              <View
                style={tw.style('flex-row justify-between items-center rounded-br8 border-bw1 border-subtitle px-sp16 gap-sp24', {
                  'border-black': !!focusAmount,
                  'border-errormessage': !!error,
                  'border-bw2': !!error || !!focusAmount,
                })}>
                <TextInput
                  value={!!enterAmount ? formatAmount(enterAmount) : ''}
                  style={tw.style(`flex-1 bg-white h-h72 text-hm font-medium`, {
                    fontFamily: 'NeueMontreal-Medium',
                  })}
                  keyboardType="number-pad"
                  onFocus={() => setFocusAmount(true)}
                  onBlur={() => setFocusAmount(false)}
                  onEndEditing={() => setFocusAmount(false)}
                  onChangeText={text => {
                    setEnterAmount(text)
                  }}
                  selectionColor={'#525252'}
                />
                <Typography type="bl" weight="medium" textColor="#737373">
                  {`points`}
                </Typography>
              </View>
              {!!error ? (
                <View style={tw`flex flex-row items-center`}>
                  <CircleAlert style={tw`mr-sp4`} />
                  <Typography type="bs" weight="medium" textColor="#D9323D">
                    {error}
                  </Typography>
                </View>
              ) : (
                (!!Number(enterAmount.replace(/,/g, '')) || focusAmount) && (
                  <Typography type="bs" weight="medium" textColor="#525252">
                    {`You’ll receive: £${formatNumber({
                      value: (parseFloat(enterAmount.replace(',', '.')) / 10).toFixed(2),
                    })}`}
                  </Typography>
                )
              )}
            </View>
          </View>
          {/* Bottom */}
          <View key={1} style={tw`justify-end px-sp16 py-sp12`}>
            <Button.Primary title={`Continue`} disabled={!enterAmount} onPress={handleContinue} />
          </View>
          <BottomIndicatorAvoidingView />
          <Animated.View style={translateStyle} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default LoadCardScreen
