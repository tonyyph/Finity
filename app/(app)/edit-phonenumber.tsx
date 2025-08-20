import {CircleAlert} from '@/components/common'
import {Typography} from '@/components/common/text-typography'
import {Button} from '@/components/ui/button'
import {Header} from '@/components/ui/header'
import {useAnimatedKeyboard} from '@/hooks'
import {IS_IOS} from '@/lib'
import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {router} from 'expo-router'
import {useCallback, useState} from 'react'
import {TextInput, View} from 'react-native'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'

const EditPhoneNumberScreen = () => {
  const [loading, setLoading] = useState<boolean>()
  const [isShowError, setIsShowError] = useState<boolean>(false)
  const [isFirstTry, setIsFirstTry] = useState<boolean>(false)

  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [focusMobileNumber, setFocusMobileNumber] = useState<boolean>(false)

  const {keyboardHeight} = useAnimatedKeyboard(0)
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value,
  }))

  const handleConfirm = useCallback(() => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setIsShowError(true)
      setIsFirstTry(true)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push({
        pathname: '/(app)/verify-phonenumber',
        params: {
          phoneNumber: `+44${phoneNumber}`,
          rawPhoneNumber: phoneNumber,
        },
      })
    }, 2000)
  }, [phoneNumber])

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onBack={router.back} title="" />
      <View style={tw`flex-1`}>
        <View style={tw`flex-1 px-sp16 gap-sp12 pt-sp24`}>
          <Typography type="hm" weight="semibold">
            Edit mobile number
          </Typography>
          <Typography type="bd" weight="regular" style={tw`mr-sp16 my-sp8`}>
            Enter your updated mobile number, and we’ll send a verification code to verify your identity.
          </Typography>
          <Typography textColor="#404040">New mobile number</Typography>
          <View style={tw`flex-row gap-sp12`}>
            <View style={tw`w-w56 h-h48 bg-neutral-100 items-center border border-border2 justify-center rounded-br8`}>
              <Typography weight="regular" textColor="#404040">
                +44
              </Typography>
            </View>
            <TextInput
              style={tw.style('px-sp12 rounded-br8 bg-white flex-1 border border-border2 h-h48', {
                'border-black border-bw2': !!focusMobileNumber,
              })}
              onFocus={() => setFocusMobileNumber(true)}
              onEndEditing={() => setFocusMobileNumber(false)}
              placeholder={`Enter your new mobile number.`}
              placeholderTextColor={'#A3A3A3'}
              keyboardType="number-pad"
              maxLength={12}
              autoCapitalize="none"
              value={phoneNumber}
              onChangeText={text => {
                setIsShowError(text?.length !== 10)
                setPhoneNumber(text)
              }}
            />
            <View style={tw`w-w4`} />
          </View>
          {isFirstTry && isShowError && (
            <View style={tw`flex-row items-center`}>
              <CircleAlert style={tw`mr-sp4`} />
              <Typography type="bs" weight="medium" textColor="#D9323D">
                {`Please enter a valid 10-digit phone number`}
              </Typography>
            </View>
          )}
        </View>
        <View key={1} style={tw`justify-end flex-1 px-sp16 py-sp12`}>
          <Button.Primary
            title={`Send code`}
            disabled={phoneNumber?.length === 0}
            loadingTitle="Sending..."
            isLoading={loading}
            onPress={handleConfirm}
          />
        </View>
        <BottomIndicatorAvoidingView />
      </View>
      <Animated.View style={translateStyle} />
    </View>
  )
}

export default EditPhoneNumberScreen
