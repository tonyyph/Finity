import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const CheckBoxIcon = ({size = scale(24), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width="100%" height="100%" fill="none" viewBox="0 0 24 24" {...props}>
        <Path fill="#FF885D" d="M0 4a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z" />
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M18.361 7.44a1.5 1.5 0 0 1 0 2.12l-7.603 7.604a1.5 1.5 0 0 1-2.232-.123L5.63 13.42a1.5 1.5 0 1 1 2.342-1.874l1.85 2.312 6.418-6.419a1.5 1.5 0 0 1 2.122 0Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
}
