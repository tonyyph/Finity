import {Button, CircleAlertX, Typography} from '@/components'
import {useNetwork} from '@/stores'
import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {router} from 'expo-router'
import {View} from 'react-native'

export default function OfflineScreen() {
  const {isConnected} = useNetwork()

  return (
    <View style={tw`flex-1 bg-white px-sp16`}>
      <View style={tw`flex-1 bg-white items-center mt-sp128`}>
        <CircleAlertX />
        <Typography type="hs" weight="semibold" style={tw`mt-sp12`}>
          Something went wrong
        </Typography>
        <Typography weight="regular" style={tw`text-center mt-sp12`}>
          An unexpected error occurred while processing your request. Please try again.
        </Typography>
      </View>

      <Button.Primary
        title={`Try again`}
        onPress={() => {
          isConnected && router.navigate('/(app)/(tabs)')
        }}
      />

      <BottomIndicatorAvoidingView />
    </View>
  )
}
