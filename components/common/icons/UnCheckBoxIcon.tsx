import {memoFC, scale} from '@/utils'
import {View} from 'react-native'
import Svg, {Mask, Path, SvgProps} from 'react-native-svg'

export const UnCheckBoxIcon = memoFC(({size = scale(24), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg width="100%" height="100%" fill="none" {...props} viewBox="0 0 24 24">
        <Mask id="a" fill="#fff">
          <Path d="M0 4a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z" />
        </Mask>
        <Path
          fill="#A3A3A3"
          d="M4 0v1h16v-2H4v1Zm20 4h-1v16h2V4h-1Zm-4 20v-1H4v2h16v-1ZM0 20h1V4h-2v16h1Zm4 4v-1a3 3 0 0 1-3-3h-2a5 5 0 0 0 5 5v-1Zm20-4h-1a3 3 0 0 1-3 3v2a5 5 0 0 0 5-5h-1ZM20 0v1a3 3 0 0 1 3 3h2a5 5 0 0 0-5-5v1ZM4 0v-1a5 5 0 0 0-5 5h2a3 3 0 0 1 3-3V0Z"
          mask="url(#a)"
        />
      </Svg>
    </View>
  )
})
