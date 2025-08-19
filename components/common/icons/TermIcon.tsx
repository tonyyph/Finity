import {memoFC, scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'

export const TermIcon = memoFC(({size = scale(24), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width="100%" height="100%" fill="none" {...props} viewBox="0 0 24 24">
        <Path
          fill="#525252"
          fillRule="evenodd"
          d="M4 5.1C4 3.423 5.31 2 7.004 2h9.692C18.39 2 19.7 3.423 19.7 5.1v13.5c0 1.677-1.31 3.1-3.004 3.1H7.004C5.31 21.7 4 20.277 4 18.6V5.1Zm3.004-1.4c-.686 0-1.304.591-1.304 1.4v13.5c0 .808.618 1.4 1.304 1.4h9.692C17.38 20 18 19.409 18 18.6V5.1c0-.809-.618-1.4-1.304-1.4H7.004Zm.765 3.65c0-.47.381-.85.85-.85h6.462a.85.85 0 0 1 0 1.7H8.619a.85.85 0 0 1-.85-.85Zm0 3.375c0-.47.381-.85.85-.85h6.462a.85.85 0 0 1 0 1.7H8.619a.85.85 0 0 1-.85-.85Zm0 3.375c0-.47.381-.85.85-.85h3.231a.85.85 0 0 1 0 1.7H8.62a.85.85 0 0 1-.85-.85Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  )
})
