import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'
export const FillHomeIcon = ({size = scale(32), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width={'100%'} height={'100%'} fill="none" {...props} viewBox="0 0 32 32">
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M23.91 27c1.653 0 3.09-1.288 3.09-2.993V13.161c0-.79-.402-1.51-1.044-1.943l-8.569-5.795a2.486 2.486 0 0 0-2.774 0l-8.57 5.795A2.349 2.349 0 0 0 5 13.161v10.846C5 25.712 6.437 27 8.09 27h15.82Zm-5.727-2.225v-6.41c0-.02-.006-.048-.04-.08a.238.238 0 0 0-.166-.061h-3.954a.238.238 0 0 0-.166.06c-.034.033-.04.06-.04.081v6.41h4.366Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
}
