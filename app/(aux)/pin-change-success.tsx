import {Button, Typography} from '@/components'
import {BottomIndicatorAvoidingView, TopIndicatorAvoidingView, tw} from '@/utils'
import {router} from 'expo-router'
import {useCallback} from 'react'
import {Image, View} from 'react-native'

function ChangePinSuccess() {
  const handleContinue = useCallback(() => {
    router.replace({
      pathname: '/(app)/(tabs)',
    })
  }, [])

  return (
    <View style={tw`flex-1 bg-white`}>
      <TopIndicatorAvoidingView />
      <View style={tw`flex-1`}>
        <View style={tw`flex-1 px-sp16 gap-sp12 items-center mt-40`}>
          <Image style={tw`w-w64 h-h64`} resizeMode="contain" source={require('@/assets/images/success-filled.png')} />
          <Typography type="hs" weight="semibold">
            {`PIN changed`}
          </Typography>
          <Typography weight="regular" style={tw`text-center px-sp16`}>
            {`Remember to keep your new PIN private and update it regularly.`}
          </Typography>
        </View>
        <View style={tw`px-sp16`}>
          <Button.Primary title={`Continue`} onPress={handleContinue} />
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  )
}
export default ChangePinSuccess
