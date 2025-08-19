import {Image, View} from 'react-native'
import {Typography} from '../common/text-typography'
import {Touch} from '../ui/touch'
import {FrozenCard} from '@/assets'
import {tw} from '@/utils'

type Props = {
  title?: string
  subTitle?: string
  onPress?: (params?: any) => void
}

export function FrozenBanner({title = 'Card is frozen', subTitle = 'You cannot load your card while it is frozen.', onPress}: Props) {
  return (
    <Touch onPress={onPress} style={tw`mx-sp16 my-sp8 rounded-br12 p-sp12 flex-row bg-teal-200`}>
      <Image source={FrozenCard} style={tw`w-w64 h-h100`} />
      <View style={tw`pl-sp16 gap-sp4 flex-auto`}>
        <View style={tw`mr-sp16`}>
          <Typography weight="semibold" type="bd">
            {title}
          </Typography>
          <Typography weight="regular" type="bs">
            {subTitle}
          </Typography>
        </View>
        <Typography type="bs" style={tw`mt-sp8 self-start border-b`}>
          {'Unfreeze card'}
        </Typography>
      </View>
    </Touch>
  )
}
export default FrozenBanner
