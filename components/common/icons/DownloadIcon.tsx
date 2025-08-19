import {memoFC, scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const DownloadIcon = memoFC(({size = scale(32), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width="100%" height="100%" fill="none" viewBox="0 0 32 32" {...props}>
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M26.002 29.2h-20a1.2 1.2 0 1 1 0-2.4h20a1.2 1.2 0 0 1 0 2.4Zm-9.164-4.607a1.2 1.2 0 0 1-1.673 0l-8-7.778a1.2 1.2 0 1 1 1.673-1.72l5.964 5.797V3.999a1.2 1.2 0 1 1 2.4 0v16.893l5.963-5.798a1.2 1.2 0 1 1 1.673 1.72l-8 7.779Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
})
