import {Typography} from '@/components/common/text-typography'
import {Button} from '@/components/ui/button'
import {BottomIndicatorAvoidingView, TopIndicatorAvoidingView, tw} from '@/utils'
import {AuthenticationType} from 'expo-local-authentication'
import {router, useLocalSearchParams} from 'expo-router'
import {find} from 'lodash-es'
import {useCallback, useEffect, useState} from 'react'
import {Image, Platform, View} from 'react-native'

interface AuthenticationProps {
  authenticationType: AuthenticationType
  title: string
  subTitle: string
}

const authentication: AuthenticationProps[] = [
  {
    authenticationType: AuthenticationType.FACIAL_RECOGNITION,
    title: `Face ID enabled`,
    subTitle: `Face ID successfully enabled. You can now sign in faster and more securely.`,
  },
  {
    authenticationType: AuthenticationType.FINGERPRINT,
    title: `Touch ID enabled`,
    subTitle: `Touch ID successfully enabled. You can now sign in faster and more securely.`,
  },
]

const authenticationAndroid: AuthenticationProps[] = [
  {
    authenticationType: AuthenticationType.FACIAL_RECOGNITION,
    title: `Biometrics enabled`,
    subTitle: `Biometrics successfully enabled. You can now sign in faster and more securely.`,
  },
  {
    authenticationType: AuthenticationType.FINGERPRINT,
    title: `Biometrics enabled`,
    subTitle: `Biometrics successfully enabled. You can now sign in faster and more securely.`,
  },
]

function BiometricsSuccess() {
  const {typeAuthentication, firstFA = '0', ...res} = useLocalSearchParams()
  const [authenticationType, setAuthenticationType] = useState<AuthenticationProps>()
  useEffect(() => {
    setAuthenticationType(
      find(Platform.OS === 'ios' ? authentication : authenticationAndroid, au => String(au.authenticationType) === String(typeAuthentication)),
    )
  }, [typeAuthentication, res])

  const handleContinue = useCallback(() => {
    if (firstFA === '1') {
      router.replace('/(app)/(tabs)')
    } else {
      router.dismissAll()
    }
  }, [firstFA])

  return (
    <View style={tw`flex-1 bg-white`}>
      <TopIndicatorAvoidingView />
      <View style={tw`flex-1`}>
        <View style={tw`flex-1 px-sp16 gap-sp12 items-center mt-sp128`}>
          <Image style={tw`w-w64 h-h64`} resizeMode="contain" source={require('@/assets/images/success-filled.png')} />
          <Typography type="hs" weight="semibold">
            {`${authenticationType?.title}`}
          </Typography>
          <Typography weight="regular" style={tw`text-center px-sp16`}>
            {`${authenticationType?.subTitle}`}
          </Typography>
        </View>
        <View style={tw`justify-end px-sp16 py-sp12`}>
          <Button.Primary title={`Continue`} onPress={handleContinue} />
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  )
}
export default BiometricsSuccess
