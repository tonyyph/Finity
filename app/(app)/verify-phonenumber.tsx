import {CircleAlert, Button, ResendVerificationDowntime, Typography, Header} from '@/components'
import {colors} from '@/constants'
import {useAnimatedKeyboard, useVerification} from '@/hooks'
import {IS_IOS} from '@/lib'
import {exactDesign, BottomIndicatorAvoidingView, tw} from '@/utils'
import {router, useLocalSearchParams} from 'expo-router'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Keyboard, TextInput, View} from 'react-native'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'

export default function VerifyPhoneNumberCodeScreen() {
  const {phoneNumber, rawPhoneNumber} = useLocalSearchParams()

  const {verificationCode, loading, error, handleVerifyOTP} = useVerification(rawPhoneNumber as string)

  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const inputsRef = useRef<(TextInput | null)[]>([])
  const [indexCursor, setIndexCursor] = useState<number>(0)

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0]?.focus()
    }
  }, [])

  const {keyboardHeight} = useAnimatedKeyboard(0)
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value,
  }))

  const otpString = otp.join('')

  const handleVerifyChangePNOTP = useCallback(() => {
    Keyboard.dismiss()
    if (loading) return
    handleVerifyOTP &&
      handleVerifyOTP({
        verificationCode: otpString,
      })
  }, [otpString])

  useEffect(() => {
    if (otpString.length === 6) {
      handleVerifyChangePNOTP()
    }
  }, [otpString, handleVerifyChangePNOTP])

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
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
      <View style={tw`flex-1 gap-sp12 mt-6 px-sp16`}>
        <View style={tw`z-10 my-sp12 gap-sp8`}>
          <Typography type="hs" weight="semibold">
            Verify mobile number
          </Typography>
          <Typography weight="regular">
            {`To continue, verify your number by entering the verification code sent to ${phoneNumber
              .toString()
              ?.replace(/^\+44(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3')}.`}
          </Typography>
        </View>
        <View style={tw`flex flex-row justify-between items-center mt-sp16 gap-sp8`}>
          {otp.map((digit, index) => (
            <View style={tw` flex flex-row items-center mt-sp12 gap-sp16`} key={index}>
              {index === 3 && <View style={tw`w-[8px] h-h1 bg-[#A3A3A3]`} />}
              <TextInput
                editable={!loading}
                autoFocus={index === 0}
                style={tw.style(
                  `text-[20px] text-black text-center w-14 h-14 rounded-br8 bg-white border`,
                  {borderColor: colors.border},
                  indexCursor === index && {
                    borderWidth: exactDesign(2),
                    borderColor: colors.black,
                  },
                  !!error && {
                    borderWidth: exactDesign(2),
                    borderColor: colors.errormessage,
                  },
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
          <View style={tw`flex flex-row items-center`}>
            <CircleAlert style={tw`mr-sp4`} />
            <Typography type="bs" weight="medium" textColor="#D9323D" style={tw`flex-1`}>
              {`Incorrect verification code. Try again.`}
            </Typography>
          </View>
        )}
        <ResendVerificationDowntime />
        {verificationCode && __DEV__ && (
          <Typography type="bs" textColor="#737373" style={tw`self-center mt-6`}>
            {`(Testing Verification code: ${verificationCode})`}
          </Typography>
        )}
      </View>
      <View key={1} style={tw`justify-end flex-1 px-sp16`}>
        <Button.Primary
          title={`Verify`}
          loadingTitle="Verifying..."
          disabled={otpString.length !== 6}
          isLoading={loading}
          onPress={handleVerifyChangePNOTP}
        />
      </View>
      <BottomIndicatorAvoidingView />
      <Animated.View style={translateStyle} />
    </View>
  )
}
