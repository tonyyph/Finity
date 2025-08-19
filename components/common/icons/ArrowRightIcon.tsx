import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const ArrowRightIcon = ({size = scale(24), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width={'100%'} height={'100%'} fill="none" viewBox="0 0 24 24" {...props}>
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M17.148 12a.9.9 0 0 1-.263.636l-7.5 7.5a.9.9 0 1 1-1.273-1.273L14.976 12 8.112 5.136a.9.9 0 0 1 1.273-1.273l7.5 7.5a.9.9 0 0 1 .263.637Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
}
