import {tw} from '@/utils'
import React, {ReactNode} from 'react'
import {GestureResponderEvent, Text as RNText, TextStyle} from 'react-native'
import {Style} from 'twrnc'

export type TextType = 'hl' | 'hm' | 'hs' | 'hsm' | 'bl' | 'bd' | 'bs' | 'bsm'
type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold'

interface TextProps {
  type?: TextType
  weight?: FontWeight
  children: ReactNode
  textColor?: string
  className?: Style
  style?: TextStyle
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

const FONT_FAMILY: Record<FontWeight, TextStyle['fontFamily']> = {
  regular: 'NeueMontreal-Regular',
  medium: 'NeueMontreal-Medium',
  semibold: 'NeueMontreal-Bold',
  bold: 'NeueMontreal-Bold',
}

export const Typography: React.FC<TextProps> = ({type = 'bd', weight = 'medium', children, textColor = '#0A0A0A', style, className, onPress}) => {
  return (
    <RNText
      allowFontScaling
      style={tw.style(
        `text-${type} leading-${type}`,
        {
          fontFamily: FONT_FAMILY[weight] || 'NeueMontreal-Medium',
          letterSpacing: 0.4,
          color: textColor,
        },
        style,
        className,
      )}
      onPress={onPress}>
      {children}
    </RNText>
  )
}
