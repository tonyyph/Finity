import {Button, Typography} from '@/components'
import {useUserAuthenticateStore} from '@/stores'
import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {router} from 'expo-router'
import {isEmpty} from 'lodash-es'
import {useCallback} from 'react'
import {Image, View} from 'react-native'

function TwoFactorAuthenticationSuccess() {
  const {setIsLoggedIn, verificationPin, isForgotPin} = useUserAuthenticateStore()

  const handleSetupPin = useCallback(() => {
    router.push({
      pathname: '/pin-verify',
      params: {isResetPin: isForgotPin ? '1' : '0', type: 'setup'},
    })
  }, [isForgotPin])

  const handleContinue = useCallback(() => {
    router.replace('/(app)/(tabs)')
    setIsLoggedIn(true)
  }, [setIsLoggedIn])

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`px-sp16 gap-sp8 items-center mt-sp128`}>
          <Image style={tw`w-w64 h-h64`} resizeMode="contain" source={require('@/assets/images/success-filled.png')} />
          <Typography type="hs" weight="semibold">
            Verification success
          </Typography>
          <Typography weight="regular" style={tw`text-center`}>
            {isForgotPin ? `Two-factor authentication verified. Tap ‘Continue’ to set up your new PIN.` : `Two-factor authentication verified. `}
          </Typography>
        </View>
        <View style={tw`px-sp16 py-sp12`}>
          <Button.Primary
            title={isForgotPin || !isEmpty(verificationPin) ? `Continue` : `Set up PIN`}
            onPress={!isEmpty(verificationPin) ? handleContinue : handleSetupPin}
          />
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  )
}
export default TwoFactorAuthenticationSuccess
