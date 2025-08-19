import {memoFC, scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const RefundIcon = memoFC(({size = scale(20), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width="100%" height="100%" fill="none" {...props} viewBox="0 0 20 20">
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M3.637 3.636a.75.75 0 0 1 1.06 0L14.972 13.91l.112-7.97a.75.75 0 0 1 1.5.02l-.138 9.746a.75.75 0 0 1-.739.74l-9.745.137a.75.75 0 0 1-.021-1.5l7.97-.113L3.637 4.697a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
})
