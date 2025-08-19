import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

type IconProps = {
  size?: number
}

export const HeartIcon = ({size = scale(24), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width="100%" height="100%" fill="none" viewBox="0 0 24 24" {...props}>
        <Path
          fill="#000"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.177 5.005a6.29 6.29 0 0 0-8.162-.64 6.27 6.27 0 0 0-10.01 5.28 6.276 6.276 0 0 0 1.847 4.207l6.212 6.224a2.78 2.78 0 0 0 3.901 0l6.212-6.225a6.276 6.276 0 0 0 0-8.846Zm-1.41 7.466-6.212 6.214a.759.759 0 0 1-1.08 0L5.262 12.44a4.294 4.294 0 0 1 0-6.005 4.27 4.27 0 0 1 6.001 0 1 1 0 0 0 1.42 0 4.27 4.27 0 0 1 6.002 0 4.294 4.294 0 0 1 .08 6.005v.03Z"
        />
      </Svg>
    </View>
  )
}
