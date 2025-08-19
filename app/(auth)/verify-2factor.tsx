import {Button, CircleAlert, Header, Typography} from '@/components'
import {useAnimatedKeyboard, useLocalPIN, useLogin} from '@/hooks'
import {IS_IOS} from '@/lib'
import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {router} from 'expo-router'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Keyboard, TextInput, View} from 'react-native'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'

export default function Verify2FactorScreen() {
  const {handleVerifyTOTP, error, isLoading, setError} = useLogin()

  const [isFirstTry, setIsFirstTry] = useState<boolean>(true)
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const inputsRef = useRef<(TextInput | null)[]>([])
  const [indexCursor, setIndexCursor] = useState<number>(0)
  const {setShouldPINLocal} = useLocalPIN()

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0]?.focus()
      setShouldPINLocal(false)
    }
  }, [])

  const {keyboardHeight} = useAnimatedKeyboard(0)
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value,
  }))

  const otpString = otp.join('')

  const handleVerifyOTP = useCallback(() => {
    Keyboard.dismiss()
    handleVerifyTOTP && handleVerifyTOTP({otp: otpString})
  }, [otpString])

  useEffect(() => {
    if (otpString.length === 6 && isFirstTry) {
      setIsFirstTry(false)
      handleVerifyOTP()
    }
  }, [otpString, isFirstTry])

  useEffect(() => {
    if (error) {
      otpString.length === 6 && setOtp(Array(6).fill(''))
    }
  }, [error, otpString])

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      setError('')
      if (index === 0) setIndexCursor(0)
      else setIndexCursor(index + 1)
      inputsRef.current?.[index]?.setNativeProps({
        selection: {start: text.length, end: text.length},
      })

      const newOtp = [...otp]
      newOtp[index] = text
      setOtp(newOtp)
      if (text && index < 5) {
        inputsRef.current?.[index + 1]?.focus()
      }
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp]
      newOtp[index] = ''
      setOtp(newOtp)
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <View style={tw`bg-white flex-1`}>
      <Header onBack={router.back} title="" />
      <View style={tw`flex-1 p-sp16`}>
        <View style={tw`z-10 gap-sp8`}>
          <Typography type="hs" weight="semibold">
            {`Two-factor authentication`}
          </Typography>
          <Typography weight="regular">{`Enter the 6-digit verification code generated from\nyour app.`}</Typography>
        </View>
        <View style={tw`flex flex-row items-center mt-sp32 gap-sp8 px-sp8`}>
          {otp.map((digit, index) => (
            <View style={tw`flex flex-row items-center gap-sp10`} key={index}>
              {index === 3 && <View style={tw`w-w8 h-h1 bg-neutral-500`} />}
              <TextInput
                editable={!isLoading}
                autoFocus={index === 0}
                style={tw.style(
                  `text-hsm leading-bl text-black text-center w-w48 h-h48 rounded-br8 bg-white border-bw1 border-subtitle`,
                  indexCursor === index && `border-bw2 border-black`,
                  !!error && `border-errormessage border-bw2`,
                )}
                keyboardType="number-pad"
                maxLength={1}
                ref={el => (inputsRef.current[index] = el)}
                value={digit}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                onFocus={() => setIndexCursor(index)}
              />
            </View>
          ))}
        </View>
        {!!error && (
          <View style={tw`flex flex-row items-center mt-sp12`}>
            <CircleAlert style={tw`mr-sp4`} />
            <Typography type="bs" weight="medium" textColor="#D9323D" style={tw`flex-1`}>
              {error}
            </Typography>
          </View>
        )}
      </View>
      <View key={1} style={tw`justify-start px-sp16 py-sp12`}>
        <View style={tw`justify-end`}>
          <Button.Primary
            title="Verify"
            loadingTitle="Verifying...."
            isLoading={isLoading}
            onPress={handleVerifyOTP}
            disabled={otpString.length !== 6}
          />
        </View>
      </View>
      <BottomIndicatorAvoidingView />
      <Animated.View style={translateStyle} />
    </View>
  )
}
