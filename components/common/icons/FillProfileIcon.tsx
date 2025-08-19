import {scale, tw} from '@/utils'
import {View} from 'react-native'
import Svg, {Path, SvgProps} from 'react-native-svg'
export const FillProfileIcon = ({size = scale(32), style, ...props}: SvgProps & IconProps = {}) => {
  return (
    <View style={[{width: size, height: size}, style]}>
      <Svg style={tw`aspect-square`} width={'100%'} height={'100%'} fill="none" {...props} viewBox="0 0 32 32">
        <Path
          fill="#000"
          fillRule="evenodd"
          d="M10.665 9.751C10.665 6.575 13.278 4 16.5 4s5.835 2.575 5.835 5.751c0 3.177-2.613 5.752-5.835 5.752s-5.835-2.575-5.835-5.752Zm-2.956 9.73a5.878 5.878 0 0 1 4.126-1.684h9.33c1.548 0 3.032.605 4.126 1.684A5.71 5.71 0 0 1 27 23.548v2.3c0 .636-.523 1.152-1.17 1.152-.645 0-1.169-.516-1.169-1.153v-2.299c0-.914-.368-1.79-1.024-2.437a3.522 3.522 0 0 0-2.472-1.01h-9.33c-.928 0-1.817.364-2.472 1.01a3.422 3.422 0 0 0-1.024 2.437v2.3c0 .636-.524 1.152-1.17 1.152C6.524 27 6 26.484 6 25.847v-2.299a5.71 5.71 0 0 1 1.709-4.067Z"
          clipRule="evenodd"
        />
        <Path fill="#000" d="M7 22.5a4.5 4.5 0 0 1 4.5-4.5h10a4.5 4.5 0 0 1 4.5 4.5V27H7v-4.5Z" />
      </Svg>
    </View>
  )
}
