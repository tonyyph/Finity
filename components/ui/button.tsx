import {useMemoFunc} from '@/hooks'
import {memoFC, scale, tw} from '@/utils'
import {GestureResponderEvent, Pressable, PressableProps} from 'react-native'
import {Style} from 'twrnc'
import {Typography} from '../common'
import AnimatedSpinnerV2 from './spinnerIndicator'

interface ButtonBase extends Omit<PressableProps, 'style' | 'children'> {
  title?: string
  outline?: boolean
  size?: 'XS' | 'SM' | 'Base' | 'L'
  borderWidth?: number
  borderColor?: ColorName
  style?: Style
  fullWidth?: boolean
  children?: React.ReactNode
  isLoading?: boolean
  loadingTitle?: string | React.ReactNode
  doNothing?: boolean
  applyNetworkShowing?: boolean
}

type Props = ButtonBase & ButtonStyle

export const ButtonComponent = memoFC(
  ({
    borderWidth = scale(1),
    borderColor,
    fullWidth = true,
    disabled,
    children,
    doNothing,
    isLoading,
    title,
    loadingTitle = title,
    backgroundColor,
    textColor,
    size = 'L',
    disableBackgroundColor,
    applyNetworkShowing = true,
    disableTextColor,
    isPrimary = false,
    loadingBackgroundColor,
    ...rest
  }: Props) => {
    const onPress = useMemoFunc((e: GestureResponderEvent) => {
      // if (!isConnected && applyNetworkShowing) {
      //   return EventRegister.emit('screen_set_error_message', {
      //     title: 'Connection failed',
      //     message: `A network error occurred. Please check\n your network settings.`,
      //     singleButton: true,
      //     confirmText: 'OK',
      //     onConfirm: () => {
      //       EventRegister.emit('clear_error_message', {})
      //       isConnected && rest.onPress?.(e)
      //     },
      //   })
      // }

      if (doNothing || isLoading) {
        return
      }

      // isConnected && rest.onPress?.(e)
      rest.onPress?.(e)
    })

    return (
      <Pressable
        {...rest}
        onPress={onPress}
        disabled={disabled}
        style={tw.style(
          'flex-row justify-center items-center gap-sp4 h-h48 rounded-full',
          {
            backgroundColor: tw.color(disabled && isPrimary ? disableBackgroundColor : isLoading ? loadingBackgroundColor : backgroundColor),
            color: tw.color(textColor),
            borderColor: tw.color(disabled ? disableBackgroundColor : backgroundColor),
          },
          rest.style,
        )}>
        {title ? (
          <>
            {isLoading && <AnimatedSpinnerV2 size={scale(16)} color={'#FF885D'} />}
            <Typography type="bd" textColor={tw.color(disabled && isPrimary ? disableTextColor : textColor)} weight="medium">
              {isLoading ? loadingTitle : title}
            </Typography>
          </>
        ) : (
          children
        )}
      </Pressable>
    )
  },
)

export const Button = {
  Primary: (props: Partial<ButtonStyle> & ButtonBase) => (
    <ButtonComponent
      {...props}
      backgroundColor="primary"
      disableBackgroundColor="border2"
      loadingBackgroundColor="neutral"
      disableTextColor="disabled"
      textColor="white"
      isPrimary
    />
  ),
  Secondary: (props: Partial<ButtonStyle> & ButtonBase) => (
    <ButtonComponent
      {...props}
      backgroundColor="white"
      style={tw`border border-subtitle flex-1`}
      disableBackgroundColor="border2"
      loadingBackgroundColor="neutral"
      disableTextColor="disabled"
      textColor="black"
      isPrimary
    />
  ),

  Icon: (props: Partial<ButtonStyle> & ButtonBase) => (
    <ButtonComponent
      {...props}
      backgroundColor="white"
      loadingBackgroundColor="neutral"
      disableBackgroundColor="transparent"
      textColor="white"
      disableTextColor="neutral-300"
    />
  ),
} as const
