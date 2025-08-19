import {Button, CircleAlertX, Typography} from '@/components'
import {BottomIndicatorAvoidingView, TopIndicatorAvoidingView, tw} from '@/utils'
import {router} from 'expo-router'
import {View} from 'react-native'

export default function SomethingWentWrong() {
  return (
    <View style={tw`flex-1 bg-white px-sp16`}>
      <TopIndicatorAvoidingView />
      <View style={tw` flex-1 bg-white items-center`}>
        <CircleAlertX />
        <Typography type="hs" weight="semibold" style={tw`mt-sp16`}>
          Something went wrong
        </Typography>
        <Typography weight="regular" style={tw`text-center mt-sp16`}>
          An unexpected error occurred while processing your request. Please try again.
        </Typography>
      </View>

      <Button.Primary
        title={'Try again'}
        onPress={() => {
          router.back()
        }}
      />

      <BottomIndicatorAvoidingView />
    </View>
  )
}
