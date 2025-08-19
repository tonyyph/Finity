import {memoFC, scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const CircleAlert = memoFC(({size = scale(16), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width="100%" height="100%" fill="none" viewBox="0 0 16 16" {...props}>
        <Path fill="#D9323D" d="M15.333 8A7.333 7.333 0 1 1 .667 8a7.333 7.333 0 0 1 14.666 0Z" />
        <Path fill="#fff" fillRule="evenodd" d="M8 3.333a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Z" clipRule="evenodd" />
        <Path fill="#fff" d="M9.333 11.666a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0Z" />
      </Svg>
    </View>
  )
})
