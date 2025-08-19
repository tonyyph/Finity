import {View} from 'react-native'
import UpdateIllustration from '../svg-assets/update-illustration'
import {Text} from '../ui/text'
import {tw} from '@/utils'

export function UpdateLoader() {
  return (
    <View style={tw`flex-1 items-center justify-center gap-sp16 bg-white`}>
      <UpdateIllustration style={tw`h-72 text-primary mb-8`} />
      <Text style={tw`text-black text-center`}>{`Finity Rewards is updating, please wait...`}</Text>
      <Text
        style={tw`text-black mx-sp16 text-center`}>{`NOTE: this mechanism is intended for checking in the development environment, as we are using OTA (over-the-air) updates. If there are any UI bugs, I can make the necessary adjustments immediately without requiring a new app build.`}</Text>
      <Text style={tw`text-black mx-sp16 text-center`}>{`This screen is temporary and will be removed after UAT testing is completed.`}</Text>
    </View>
  )
}
