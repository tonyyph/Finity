import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const ArrowBackIcon = ({size = scale(32), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width={'100%'} height={'100%'} fill="none" viewBox="0 0 32 32" {...props}>
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M27.869 16a1.2 1.2 0 0 1-1.2 1.2H8.135l6.958 7.305a1.2 1.2 0 0 1-1.738 1.655l-8.889-9.333a1.2 1.2 0 0 1 0-1.655l8.89-9.334a1.2 1.2 0 0 1 1.737 1.655L8.135 14.8H26.67a1.2 1.2 0 0 1 1.2 1.2Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
}
