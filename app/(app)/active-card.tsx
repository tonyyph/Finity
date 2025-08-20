import {Button, CircleAlert, Header, Typography} from '@/components'
import {colors} from '@/constants'
import {useAnimatedKeyboard, useCardHolder} from '@/hooks'
import {IS_IOS} from '@/lib'
import {BottomIndicatorAvoidingView, scale, tw} from '@/utils'
import {router} from 'expo-router'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Alert, Keyboard, TextInput, View} from 'react-native'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'

function ActiveCardScreen() {
  const [loading, setLoading] = useState<boolean>()
  const {handleActivateCard, error, userData} = useCardHolder()
  const inputRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)]
  const {keyboardHeight} = useAnimatedKeyboard(0)
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value - 12,
  }))

  const [cardNumber, setCardNumber] = useState(['', '', '', ''])
  const [indexCursor, setIndexCursor] = useState<number>(0)

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      if (index === 0) setIndexCursor(0)
      else setIndexCursor(index + 1)
      inputRefs[index].current?.setNativeProps({
        selection: {start: text.length, end: text.length},
      })
      const newOtp = [...cardNumber]
      newOtp[index] = text
      setCardNumber(newOtp)
      if (text && index < 3) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      const newOtp = [...cardNumber]
      newOtp[index] = ''
      setCardNumber(newOtp)
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss()
    const enteredOtp = cardNumber.join('')
    if (enteredOtp.length === 4) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        handleActivateCard(enteredOtp)
      }, 2000)
    } else {
      Alert.alert('Error', 'Please enter all 4 numbers.')
    }
  }, [cardNumber])

  useEffect(() => {
    const enteredOtp = cardNumber.join('')
    if (enteredOtp.length === 4) {
      Keyboard.dismiss()
      handleSubmit()
    }
  }, [cardNumber, handleSubmit])

  return (
    <View style={tw`bg-white flex-1`}>
      <Header onRightFunction={router.back} />
      <View style={tw`flex-1 gap-8 mt-6 px-sp16 `}>
        <View style={tw`gap-sp8`}>
          <Typography type="hs" weight="semibold">
            Activate card
          </Typography>
          <Typography weight="regular">To activate your card, please enter the last 4-digits from your card.</Typography>
        </View>
        <View style={tw`flex-1 items-center gap-sp8`}>
          <View style={tw`flex-row gap-sp16 items-start justify-center`}>
            {cardNumber.map((_, index) => (
              <TextInput
                editable={!loading}
                autoFocus={index === 0}
                style={tw.style(
                  `border w-w56 h-h56 rounded-br8 items-center justify-center text-center text-[20px] font-semibold`,
                  {borderColor: colors.border},
                  indexCursor === index && {
                    borderWidth: scale(2),
                    borderColor: colors.black,
                  },
                  error && {
                    borderWidth: scale(2),
                    borderColor: colors.errormessage,
                  },
                )}
                key={index}
                ref={inputRefs[index]}
                keyboardType="number-pad"
                maxLength={1}
                value={cardNumber[index]}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                onFocus={() => setIndexCursor(index)}
                onSubmitEditing={handleSubmit}
              />
            ))}
          </View>
          {error && (
            <View style={tw`flex flex-row items-center justify-center mt-sp16`}>
              <CircleAlert style={tw`mr-sp4`} />
              <Typography type="bs" weight="medium" textColor="#D9323D">
                Incorrect last 4-digits. Try again.
              </Typography>
            </View>
          )}
          {userData?.publicToken && __DEV__ && (
            <View style={tw`bg-neutral-100 border border-[#E5E5E5] rounded-br12 p-sp12 m-sp16`}>
              <Typography textColor="black">{`Testing Public Token: ${userData?.publicToken}`}</Typography>
            </View>
          )}
        </View>
        <View style={tw`justify-end px-sp16 py-sp12`}>
          <Button.Primary title={`Activate card`} loadingTitle="Activating..." isLoading={loading} onPress={null} />
        </View>
      </View>
      <BottomIndicatorAvoidingView />
      <Animated.View style={translateStyle} />
    </View>
  )
}
export default ActiveCardScreen
