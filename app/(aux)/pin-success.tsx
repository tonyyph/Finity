import {Button, Typography} from '@/components'
import {useBiometrics} from '@/hooks'
import {useUserAuthenticateStore} from '@/stores'
import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {router, useLocalSearchParams} from 'expo-router'
import {useCallback} from 'react'
import {Image, View} from 'react-native'

function SetupPinSuccess() {
  const {isResetPin} = useLocalSearchParams()
  const {setIsLoggedIn, setShouldPINLocal, setIsForgotPin} = useUserAuthenticateStore()
  const {bioStatus, isBiometricSupported, supportType} = useBiometrics()

  const handleContinue = useCallback(() => {
    setIsLoggedIn(true)
    setShouldPINLocal(false)
    setIsForgotPin(false)
    router.replace('/(app)/(tabs)')
  }, [setIsLoggedIn, setShouldPINLocal, setIsForgotPin])

  const handleSetupBiometrics = useCallback(() => {
    setIsLoggedIn(true)
    setShouldPINLocal(false)
    setIsForgotPin(false)
    router.replace({
      pathname: '/biometrics',
      params: {typeAuthentication: supportType, firstFA: '1'},
    })
  }, [setIsLoggedIn, supportType, setShouldPINLocal, setIsForgotPin])

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>
        <View style={tw`flex-1 px-sp16 gap-sp8 items-center mt-sp128`}>
          <Image style={tw`w-w64 h-h64`} resizeMode="contain" source={require('@/assets/images/success-filled.png')} />
          <Typography type="hs" weight="bold">
            {isResetPin === '1' ? `PIN changed` : `PIN successfully set`}
          </Typography>
          <Typography weight="regular" style={tw`text-center px-sp16`}>
            {isResetPin === '1'
              ? `Remember to keep your new PIN private and update it regularly.`
              : `Your PIN has been set. Tap 'Continue' to go to your Home page and get started.`}
          </Typography>
        </View>
        <View style={tw`px-sp16 py-sp12`}>
          <Button.Primary title="Continue" onPress={isBiometricSupported && !bioStatus ? handleSetupBiometrics : handleContinue} />
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  )
}
export default SetupPinSuccess
