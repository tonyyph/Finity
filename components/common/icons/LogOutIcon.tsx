import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const LogOutIcon = ({size = scale(24), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width={'100%'} height={'100%'} fill="none" viewBox="0 0 24 24" {...props}>
        <Path
          fill="#525252"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.916 4.475a2.781 2.781 0 0 1 1.958-.805h3.278a.9.9 0 0 1 0 1.8H5.874a.981.981 0 0 0-.691.283.95.95 0 0 0-.282.675v11.145c0 .252.1.495.282.675.182.18.43.283.69.283h3.279a.9.9 0 0 1 0 1.8H5.874a2.781 2.781 0 0 1-1.958-.805 2.75 2.75 0 0 1-.815-1.953V6.428c0-.734.294-1.436.815-1.953Zm11.406 2.629a.9.9 0 0 1 1.273.029l4.056 4.246a.9.9 0 0 1 0 1.243l-4.056 4.246a.9.9 0 1 1-1.302-1.243l2.602-2.725h-8.51a.9.9 0 1 1 0-1.8h8.51l-2.602-2.724a.9.9 0 0 1 .03-1.272Z"
        />
      </Svg>
    </View>
  )
}
