import {tw} from '@/utils'
import * as LocalAuthentication from 'expo-local-authentication'
import {LockKeyholeIcon} from 'lucide-react-native'
import {useCallback, useEffect} from 'react'
import {SafeAreaView, View} from 'react-native'
import {Typography} from '../common/text-typography'
import {Button} from '../ui/button'

type AuthBiometricsProps = {
  onAuthenticated?: () => void
}

export function AuthBiometrics({onAuthenticated}: AuthBiometricsProps) {
  const handleAuthenticate = useCallback(async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with biometrics',
      disableDeviceFallback: true, // This only works on Android
      cancelLabel: 'Cancel',
      fallbackLabel: '', // iOS only – setting empty label hides the fallback button
    })
    if (result.success) {
      onAuthenticated?.()
    }
  }, [onAuthenticated])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handleAuthenticate()
  }, [handleAuthenticate])

  return (
    <SafeAreaView style={tw`absolute inset-0 z-50 flex-1 bg-white pt-sp24 px-sp16`}>
      <View style={tw`space-y-6 flex-1 p-sp12`}>
        <View style={tw`z-10 mb-sp8 gap-sp16 items-center justify-center flex-1`}>
          <LockKeyholeIcon style={tw`size-12 self-center text-primary`} />
          <Typography type="hs" weight="semibold">
            App is locked.
          </Typography>
          <Typography weight="regular">Please authenticate to continue.</Typography>
        </View>
        <Button.Primary title={`Unlock`} onPress={handleAuthenticate} />
      </View>
    </SafeAreaView>
  )
}
