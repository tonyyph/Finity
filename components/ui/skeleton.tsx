import {tw} from '@/utils'
import {useEffect} from 'react'
import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming} from 'react-native-reanimated'
import {Style} from 'twrnc'

const duration = 1000

function Skeleton({customStyle, ...props}: Omit<React.ComponentPropsWithoutRef<typeof Animated.View>, 'customStyle'> & {customStyle?: Style}) {
  const sv = useSharedValue(1)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    sv.value = withRepeat(withSequence(withTiming(0.6, {duration}), withTiming(1, {duration})), -1)
  }, [sv])

  const style = useAnimatedStyle(() => ({
    opacity: sv.value,
  }))

  return <Animated.View style={tw.style(`rounded-md bg-neutral dark:bg-slate-200`, style, customStyle)} {...props} />
}

export {Skeleton}
