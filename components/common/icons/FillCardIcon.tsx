import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'
export const FillCardIcon = ({size = scale(32), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width={'100%'} height={'100%'} fill="none" {...props} viewBox="0 0 32 32">
        <Path
          fill="#000"
          d="m29.335 11.487.001-.835c0-2.154-1.885-4.04-4.31-4.04H6.846c-2.29 0-4.175 1.75-4.175 4.04l-.002.835h26.666ZM2.67 13.916v7.195c0 2.155 1.886 4.04 4.176 4.04h18.18c2.29 0 4.31-1.75 4.31-4.04v-7.195H2.671Z"
        />
      </Svg>
    </View>
  )
}
