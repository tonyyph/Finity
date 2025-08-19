import {tw} from '@/utils'
import {View} from 'react-native'
import {Style} from 'twrnc'
import {TextType, Typography} from './text-typography'

type UserAvatarProps = {
  user?: {
    id: string
    fullName?: string | null
    imageUrl?: string
  } | null
  style?: Style
  textType: TextType
  fullName?: string
  fallbackLabelClassName?: string
}

export function UserAvatar({user, fullName, style, textType = 'hsm'}: UserAvatarProps) {
  const getInitials = (name: string) => {
    const parts = name
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
    return parts
  }
  const shortName = getInitials(fullName || user?.fullName || 'N/A')

  return (
    <View style={tw.style(`h-h56 w-w56 bg-[#A3A3A3] rounded-full items-center justify-center`, style)}>
      <Typography type={textType ? textType : 'hsm'} textColor="white">
        {shortName}
      </Typography>
    </View>
  )
}
