import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const OneUserIcon = ({size = scale(24), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width={'100%'} height={'100%'} fill="none" viewBox="0 0 24 24" {...props}>
        <Path
          fill="#525252"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.181 4.9a2.69 2.69 0 1 0 0 5.381 2.69 2.69 0 0 0 0-5.381Zm-4.49 2.69a4.49 4.49 0 1 1 8.981 0 4.49 4.49 0 0 1-8.981 0Zm-2.276 7.598a4.491 4.491 0 0 1 3.176-1.316h7.181a4.491 4.491 0 0 1 4.491 4.491v1.796a.9.9 0 1 1-1.8 0v-1.796a2.691 2.691 0 0 0-2.69-2.69H8.59a2.69 2.69 0 0 0-2.691 2.69v1.796a.9.9 0 1 1-1.8 0v-1.796a4.49 4.49 0 0 1 1.315-3.175Z"
        />
      </Svg>
    </View>
  )
}
