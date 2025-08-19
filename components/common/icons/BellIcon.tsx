import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const BellIcon = ({size = scale(24), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width={'100%'} height={'100%'} fill="none" viewBox="0 0 24 24" {...props}>
        <Path
          fill="#525252"
          fillRule="evenodd"
          d="M12 5.486c-2.815 0-5.22 2.577-5.22 5.92v.008l-.022 2a6.727 6.727 0 0 1-.966 3.432h12.42a6.948 6.948 0 0 1-.925-3.436v-.01l.022-1.9C17.306 8.105 14.862 5.486 12 5.486ZM5.162 11.4C5.164 7.295 8.157 3.835 12 3.835c3.894 0 6.927 3.507 6.927 7.67v.01l-.022 1.9a5.312 5.312 0 0 0 .87 2.87c.292.448.263.976.12 1.348-.136.36-.506.864-1.16.864H5.266c-.664 0-1.033-.52-1.166-.88-.138-.375-.165-.912.14-1.361l.665.47.01.008m-.01-.008-.665-.47c.465-.685.901-1.673.901-2.846v-.01l.022-2m3.809 8.425a.798.798 0 0 1 1.137-.13c.49.4 1.152.654 1.892.654s1.401-.254 1.892-.654a.798.798 0 0 1 1.137.13.837.837 0 0 1-.127 1.16A4.585 4.585 0 0 1 12 22a4.585 4.585 0 0 1-2.902-1.015.837.837 0 0 1-.127-1.16Z"
          clipRule="evenodd"
        />
        <Path
          fill="#525252"
          fillRule="evenodd"
          d="M12 2c.447 0 .809.37.809.826V4.66a.817.817 0 0 1-.809.825.817.817 0 0 1-.809-.825V2.826c0-.456.362-.826.809-.826Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
}
