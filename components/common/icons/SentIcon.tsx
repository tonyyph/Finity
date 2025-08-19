import {memoFC, scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const SentIcon = memoFC(({size = scale(20), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width="100%" height="100%" fill="none" {...props} viewBox="0 0 20 20">
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M10 2.584a.75.75 0 0 1 .75.75v11.583l4.566-4.348a.75.75 0 0 1 1.034 1.086l-5.833 5.555a.75.75 0 0 1-1.034 0l-5.834-5.555a.75.75 0 0 1 1.035-1.086l4.566 4.348V3.334a.75.75 0 0 1 .75-.75Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
})
