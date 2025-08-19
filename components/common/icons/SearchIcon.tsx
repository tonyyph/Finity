import {memoFC, scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const SearchIcon = memoFC(({size = scale(24), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width="100%" height="100%" fill="none" {...props} viewBox="0 0 24 24">
        <Path
          fill="#525252"
          fillRule="evenodd"
          d="M11.468 4.9a6.567 6.567 0 1 0 4.594 11.26l.005-.005A6.567 6.567 0 0 0 11.468 4.9Zm6.48 11.86a8.367 8.367 0 1 0-1.283 1.264l2.711 2.623a.9.9 0 1 0 1.252-1.293l-2.68-2.593Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
})
