import {formatNumber, tw} from '@/utils'
import {Image, View} from 'react-native'
import {Typography} from '../common/text-typography'
import Tooltip from '../ui/tooltip'
import {Touch} from '../ui/touch'

type Props = {
  title?: string
  value?: number | string
  onTouch?: (params?: any) => void
}

export function PointsBalanceCom({title = 'Points balance', value = 0, onTouch}: Props) {
  return (
    <Touch onPress={onTouch} style={tw`flex-row mx-sp16 bg-white p-sp12 border-subtitle border rounded-br12 justify-between`}>
      <View style={tw`gap-sp12`}>
        <Typography textColor="#404040">{title}</Typography>

        <Typography weight="bold" type="hm">
          {`${formatNumber({value, decimalCount: 0})}`}
        </Typography>
      </View>
      <View style={tw`items-start`}>
        <Tooltip content="1 point = £0.10">
          <Image source={require('@/assets/images/info-filled.png')} style={tw`w-w24 h-h24`} />
        </Tooltip>
      </View>
    </Touch>
  )
}
export default PointsBalanceCom
