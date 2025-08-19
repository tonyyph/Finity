import {memoFC, scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const ReceivedIcon = memoFC(({size = scale(20), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width="100%" height="100%" fill="none" {...props} viewBox="0 0 20 20">
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M10 17.417a.75.75 0 0 0 .75-.75V5.084l4.566 4.349a.75.75 0 0 0 1.034-1.087l-5.833-5.555a.75.75 0 0 0-1.034 0L3.649 8.346a.75.75 0 0 0 1.035 1.087L9.25 5.084v11.583c0 .414.336.75.75.75Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
})
