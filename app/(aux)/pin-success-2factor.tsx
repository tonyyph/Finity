import {Button, Typography} from '@/components'
import {useUserAuthenticateStore} from '@/stores'
import {BottomIndicatorAvoidingView, TopIndicatorAvoidingView, tw} from '@/utils'
import {useAuth} from '@clerk/clerk-expo'
import {router} from 'expo-router'
import {useCallback, useEffect} from 'react'
import {Image, View} from 'react-native'

function PINTwoFactorAuthenticationSuccess() {
  const {setStoreUserId} = useUserAuthenticateStore()
  const {userId} = useAuth()

  useEffect(() => {
    if (userId) {
      !!userId && setStoreUserId(userId)
    }
  }, [userId])

  const handleSetupPin = useCallback(() => {
    router.push({
      pathname: '/pin-verify',
      params: {isResetPin: '1', type: 'setup'},
    })
  }, [])

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`px-sp16 gap-sp12 items-center`}>
          <TopIndicatorAvoidingView number={3} />
          <Image style={tw`w-w64 h-h64`} resizeMode="contain" source={require('@/assets/images/success-filled.png')} />
          <Typography type="hs" weight="semibold">
            Verification success
          </Typography>
          <Typography weight="regular" style={tw`text-center`}>
            {`Two-factor authentication verified. Tap ‘Continue’ to set up your new PIN.`}
          </Typography>
        </View>
        <View style={tw`px-sp16`}>
          <Button.Primary title={`Continue`} onPress={handleSetupPin} />
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  )
}
export default PINTwoFactorAuthenticationSuccess
