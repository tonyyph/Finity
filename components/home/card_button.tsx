import {tw} from '@/utils'
import {View} from 'react-native'
import {Button} from '../ui/button'

type Props = {
  onLoadCard?: (params?: any) => void
  onSendPoints?: (params?: any) => void
  hasIssuedCard?: boolean
}

export const CardButtonGroup = ({onLoadCard, onSendPoints, hasIssuedCard}: Props) => {
  return (
    <View style={tw`flex-row gap-sp8 px-sp16`}>
      <Button.Primary style={tw`justify-center items-center border border-border2 flex-1`} title={'Load card'} onPress={onLoadCard} />
      <Button.Secondary style={tw`justify-center items-center border border-border2 flex-1`} title={'Send points'} onPress={onSendPoints} />
    </View>
  )
}

export default CardButtonGroup
