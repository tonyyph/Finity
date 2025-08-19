import {tw} from '@/utils'
import {Image, View} from 'react-native'
import {Typography} from '../common/text-typography'
import {Touch} from '../ui/touch'

type Props = {
  title?: string
  subTitle?: string
  textButtonLabel?: string
  onPress?: (params?: any) => void
  requested?: boolean
}

export function RequestCardNotification({
  title = 'Finity Rewards card',
  subTitle = `Convert points, start spending anywhere\nyou like.`,
  requested = false,
  onPress,
}: Props) {
  return (
    <Touch onPress={onPress} style={tw`mx-sp16 my-sp8 rounded-br12 p-sp12 flex-row bg-teal-200`}>
      <Image source={require('@/assets/images/card.png')} style={tw`w-w64 h-h100`} />
      <View style={tw`pl-sp12 gap-sp4 flex-auto`}>
        <View>
          <Typography weight="semibold" type="bd">
            {title}
          </Typography>
          <Typography weight="regular" type="bs">
            {subTitle}
          </Typography>
        </View>
        <Typography type="bs" style={tw`mt-sp6 self-start border-b`}>
          {requested ? 'Request card' : 'Activate card'}
        </Typography>
      </View>
    </Touch>
  )
}
export default RequestCardNotification
