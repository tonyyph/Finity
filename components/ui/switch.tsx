import {tw} from '@/utils'
import {isSmallScreen} from '@/utils/scales'
import * as SwitchPrimitives from '@rn-primitives/switch'
import * as React from 'react'
import {Platform} from 'react-native'
import Animated, {useAnimatedStyle, useDerivedValue, withTiming} from 'react-native-reanimated'

const SwitchWeb = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>>(
  ({className, ...props}, ref) => (
    <SwitchPrimitives.Root
      style={tw.style(
        'peer h-h24 w-w44 shrink-0 cursor-pointer flex-row items-center rounded-full border-bw2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed',
        props.checked ? 'bg-primary' : 'bg-input',
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}
      ref={ref}>
      <SwitchPrimitives.Thumb
        style={tw.style(
          'pointer-events-none block h-h20 w-5 rounded-full bg-white shadow-black/5 shadow-md ring-0 transition-transform',
          props.checked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </SwitchPrimitives.Root>
  ),
)

SwitchWeb.displayName = 'SwitchWeb'

const SwitchNative = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>>(
  ({className, ...props}, ref) => {
    const translateX = useDerivedValue(() => (props.checked ? (isSmallScreen ? 14 : 20) : 0))
    const animatedThumbStyle = useAnimatedStyle(() => ({
      transform: [{translateX: withTiming(translateX.value, {duration: 200})}],
    }))
    return (
      <Animated.View style={tw.style('h-h24 w-w42 rounded-full', props.disabled && 'opacity-50')}>
        <SwitchPrimitives.Root
          style={tw.style(
            'h-h24 w-w42 shrink-0 flex-row items-center rounded-full bg-red-200 border-bw2 border-transparent',
            props.checked ? 'bg-[#FF885D]' : 'bg-[#D7DEDE]',
            className,
          )}
          {...props}
          ref={ref}>
          <Animated.View style={animatedThumbStyle}>
            <SwitchPrimitives.Thumb style={tw`h-h20 w-w20 rounded-full bg-white`} />
          </Animated.View>
        </SwitchPrimitives.Root>
      </Animated.View>
    )
  },
)
SwitchNative.displayName = 'SwitchNative'

const Switch = Platform.select({
  web: SwitchWeb,
  default: SwitchNative,
})

export {Switch}
