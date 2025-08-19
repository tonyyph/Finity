import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Circle, Path, SvgProps} from 'react-native-svg'

export const AlertIcon = ({size = scale(24), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width={'100%'} height={'100%'} fill="none" {...props} viewBox="0 0 24 24">
        <Circle cx={12} cy={12} r={11} fill="#fff" />
        <Path fill="#525252" fillRule="evenodd" d="M12 4.5A1.5 1.5 0 0 1 13.5 6v6a1.5 1.5 0 0 1-3 0V6A1.5 1.5 0 0 1 12 4.5Z" clipRule="evenodd" />
        <Path fill="#525252" d="M14 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      </Svg>
    </View>
  )
}
