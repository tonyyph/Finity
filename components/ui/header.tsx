import {commonStore} from '@/stores'
import {TopIndicatorAvoidingView, tw} from '@/utils'
import {XIcon} from 'lucide-react-native'
import {ReactNode} from 'react'
import {TouchableOpacity, View} from 'react-native'
import {ArrowBackIcon, Typography} from '../common'
import {Button} from './button'

type Props = {
  title?: string
  spacing?: boolean
  onLeftFunction?: (params?: any) => void
  renderLeftView?: ReactNode
  renderCenterView?: ReactNode
  onBack?: (params?: any) => void
  onRightFunction?: (params?: any) => void
  children?: ReactNode
  icon?: any
  renderRightView?: ReactNode
}

export const Header = ({
  title,
  onBack,
  spacing = true,
  onLeftFunction,
  onRightFunction,
  icon: Icon,
  renderLeftView,
  renderCenterView,
  renderRightView,
}: Props) => {
  const isLoading = commonStore.getState().isLoading
  return (
    <View>
      {spacing && <TopIndicatorAvoidingView />}
      <View style={tw`flex-row justify-between items-center px-sp12 gap-sp8 py-sp4 h-h56`}>
        {renderLeftView ??
          (!!onBack || !!onLeftFunction ? (
            <TouchableOpacity
              onPress={value => {
                onBack?.(value)
                onLeftFunction?.(value)
              }}
              style={tw`flex-shrink w-w32 h-h32 items-center justify-center`}
              disabled={isLoading}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ) : (
            <View style={tw`flex-shrink`}>
              <View style={tw`w-w32 h-h32`} />
            </View>
          ))}
        {renderCenterView ?? (
          <Typography weight="semibold" type="bl">
            {title}
          </Typography>
        )}
        {renderRightView ??
          (!!onRightFunction ? (
            <Button.Icon style={tw`flex-shrink items-center`} onPress={onRightFunction}>
              {Icon ? <Icon style={tw`w-w32 h-h32 text-black`} /> : <XIcon style={tw`w-w32 h-h32 text-black`} />}
            </Button.Icon>
          ) : (
            <View style={tw`flex-shrink`}>
              <XIcon style={tw`w-w32 h-h32 text-transparent`} />
            </View>
          ))}
      </View>
    </View>
  )
}
