import {memoFC, scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const ClockIcon = memoFC(({size = scale(24), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width="100%" height="100%" fill="none" viewBox="0 0 24 24" {...props}>
        <Path
          fill="#525252"
          fillRule="evenodd"
          d="M12 3.9a8.1 8.1 0 1 0 0 16.2 8.1 8.1 0 0 0 0-16.2ZM2.1 12c0-5.468 4.432-9.9 9.9-9.9s9.9 4.432 9.9 9.9-4.432 9.9-9.9 9.9-9.9-4.432-9.9-9.9ZM12 7.52a.9.9 0 0 1 .9.9v4.056l2.76.92a.9.9 0 1 1-.57 1.708l-3.374-1.125a.9.9 0 0 1-.616-.854V8.421a.9.9 0 0 1 .9-.9Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
})
