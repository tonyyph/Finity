import {memoFC, scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Mask, Path, SvgProps} from 'react-native-svg'

export const RadioNonSelectedIcon = memoFC(({size = scale(20), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width={'100%'} height={'100%'} fill="none" viewBox="0 0 20 20" {...props}>
        <Mask id="a" fill="#fff">
          <Path d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10Z" />
        </Mask>
        <Path fill="#fff" d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10Z" />
        <Path
          fill="#A3A3A3"
          mask="url(#a)"
          d="M10 19a9 9 0 0 1-9-9h-2c0 6.075 4.925 11 11 11v-2Zm9-9a9 9 0 0 1-9 9v2c6.075 0 11-4.925 11-11h-2Zm-9-9a9 9 0 0 1 9 9h2c0-6.075-4.925-11-11-11v2Zm0-2C3.925-1-1 3.925-1 10h2a9 9 0 0 1 9-9v-2Z"
        />
      </Svg>
    </View>
  )
})
