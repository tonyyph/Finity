import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const CardLoadIcon = ({size = scale(20), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width={'100%'} height={'100%'} fill="none" {...props} viewBox="0 0 20 20">
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M8.22 2.804a.75.75 0 0 1 1.06 0l1.667 1.666a.75.75 0 0 1 0 1.061L9.28 7.198a.75.75 0 0 1-1.06-1.061l.386-.386H5.834a1.75 1.75 0 0 0-1.75 1.75v5c0 .966.783 1.75 1.75 1.75a.75.75 0 0 1 0 1.5 3.25 3.25 0 0 1-3.25-3.25v-5a3.25 3.25 0 0 1 3.25-3.25h2.772l-.386-.387a.75.75 0 0 1 0-1.06Zm4.697 1.447h1.25a3.25 3.25 0 0 1 3.25 3.25v5a3.25 3.25 0 0 1-3.25 3.25H10.56l.386.386a.75.75 0 1 1-1.06 1.06L8.22 15.532a.75.75 0 0 1 0-1.06l1.666-1.667a.75.75 0 0 1 1.061 1.06l-.386.387h3.606a1.75 1.75 0 0 0 1.75-1.75v-5a1.75 1.75 0 0 0-1.75-1.75h-1.25a.75.75 0 0 1 0-1.5Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
}
