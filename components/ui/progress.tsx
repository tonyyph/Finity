import {cn} from '@/lib'
import {scale} from '@/utils'
import * as ProgressPrimitive from '@rn-primitives/progress'
import * as React from 'react'
import {Platform, StyleSheet, View, Animated as RNAnimated} from 'react-native'
import Animated, {Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string
  }
>(({className, value, indicatorClassName, ...props}, ref) => {
  const isCompleted = value === 100

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className, !isCompleted && 'bg-neutral-100 h-h1')}
      {...props}>
      {!isCompleted && <Indicator value={value} className={indicatorClassName} />}
    </ProgressPrimitive.Root>
  )
})

Progress.displayName = ProgressPrimitive.Root.displayName

export {Progress}

function Indicator({value, className}: {value: number | undefined | null; className?: string}) {
  const animatedValue = useSharedValue(0)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      animatedValue.value = value ?? 0
    }, 3000) // Delay for 3 seconds

    return () => clearTimeout(timeout)
  }, [value, animatedValue])

  const indicator = useAnimatedStyle(() => {
    return {
      width: withSpring(`${interpolate(animatedValue.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`, {overshootClamping: true}),
    }
  })

  if (Platform.OS === 'web') {
    return (
      <View
        className={cn('h-full w-full flex-1 bg-primary web:transition-all', className)}
        style={{transform: `translateX(-${100 - (value ?? 0)}%)`}}>
        <ProgressPrimitive.Indicator className={cn('h-full w-full', className)} />
      </View>
    )
  }

  return (
    <ProgressPrimitive.Indicator asChild>
      <Animated.View style={indicator} className={cn('h-full bg-foreground', className)} />
    </ProgressPrimitive.Indicator>
  )
}

export const ProgressBar = ({completeAnimation = false}: {completeAnimation?: boolean}) => {
  const progress = React.useRef(new RNAnimated.Value(0)).current
  const [completed, setCompleted] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    setCompleted(completeAnimation)
  }, [completeAnimation])

  React.useEffect(() => {
    RNAnimated.timing(progress, {
      toValue: 1,
      duration: 2500, // 2.5 seconds
      useNativeDriver: false,
    }).start(() => {
      timeoutRef.current = setTimeout(() => {
        setCompleted(true) // Set state when animation is done
      }, 1000)
    })

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [completeAnimation, progress])

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={[styles.progressBarContainer, {height: completed ? 1 : scale(4)}]}>
      <RNAnimated.View
        style={[
          styles.progressBar,
          {
            width: widthInterpolated,
            height: completed ? 1 : scale(4),
            backgroundColor: completed ? '#F5F5F5' : '#FF885D', // Gray after complete
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  progressBarContainer: {
    height: scale(4),
    backgroundColor: '#F5F5F5',
    width: '100%',
  },
  progressBar: {
    height: scale(4), // This is overridden dynamically
    backgroundColor: '#FF885D',
  },
})
