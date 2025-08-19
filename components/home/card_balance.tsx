import {formatNumber, tw} from '@/utils'
import {Image, View} from 'react-native'
import {Typography} from '../common/text-typography'
import {Touch} from '../ui/touch'

type Props = {
  title?: string
  value?: number | string
  currency?: string
  onTouch?: (params?: any) => void
}

export function CardBalanceCom({title = 'Card balance', value = 0, currency = '£', onTouch}: Props) {
  return (
    <Touch onPress={onTouch} style={tw`flex-row bg-white mx-sp16 p-sp12 border rounded-br12 border-subtitle justify-between`}>
      <View style={tw`gap-sp12`}>
        <Typography textColor="#404040">{title}</Typography>
        <Typography weight="medium" type="hm">
          {`${currency}`}
          <Typography weight="semibold" type="hm">
            {`${formatNumber({value})}`}
          </Typography>
        </Typography>
      </View>
      <View style={tw`items-start`}>
        <Image style={tw`w-w40 h-h28`} source={require(`@/assets/images/mastercard-icon.png`)} />
      </View>
    </Touch>
  )
}
export default CardBalanceCom
