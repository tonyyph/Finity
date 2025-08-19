import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const ArrowDownIcon = ({size = scale(36), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width={'100%'} height={'100%'} fill="none" viewBox="0 0 36 36" {...props}>
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M18 4.65c.745 0 1.35.604 1.35 1.35v20.85l8.219-7.828a1.35 1.35 0 1 1 1.862 1.956l-10.5 10a1.35 1.35 0 0 1-1.862 0l-10.5-10a1.35 1.35 0 1 1 1.862-1.956l8.219 7.828V6c0-.746.604-1.35 1.35-1.35Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
}
