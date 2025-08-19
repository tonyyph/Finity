import {tw} from '@/utils'
import {forwardRef} from 'react'
import {Pressable, View} from 'react-native'
import {Style} from 'twrnc'
import {Typography} from './text-typography'
import {UserAvatar} from './user-avatar'

type MenuItemProps = {
  label: string
  subLabel?: string
  icon?: any
  rightSection?: React.ReactNode
  onPress?: () => void
  style?: Style
  disabled?: boolean
  showUserAvatar?: boolean
}

export const MenuItem = forwardRef(function (
  {label, subLabel, icon: Icon, rightSection, onPress, style, disabled, showUserAvatar}: MenuItemProps,
  ref: React.ForwardedRef<React.ElementRef<typeof Pressable>>,
) {
  return (
    <Pressable
      onPress={onPress}
      ref={ref}
      disabled={disabled}
      style={tw.style(
        `flex min-h-h48 flex-row items-center justify-between rounded-br8 px-sp12 py-[10px] active:bg-subtitle`,
        disabled && 'opacity-50',
        style,
      )}>
      <View style={tw`flex flex-row items-center gap-sp12`}>
        {Icon && (
          <View style={tw`flex items-center justify-center bg-neutral-100 w-w40 h-h40 rounded-full`}>
            <Icon style={tw`w-w24 h-h24 self-center text-[#525252]`} />
          </View>
        )}
        {showUserAvatar && <UserAvatar fullName={label} style={tw`w-w40 h-h40 rounded-full`} textType="bd" />}
        <View style={tw`gap-sp4`}>
          <Typography type="bd">{label}</Typography>
          {!!subLabel && (
            <Typography type="bs" weight="regular" textColor="#737373">
              {subLabel}
            </Typography>
          )}
        </View>
      </View>
      {rightSection}
    </Pressable>
  )
})

MenuItem.displayName = 'MenuItem'
