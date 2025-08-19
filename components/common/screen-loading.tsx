import {commonStore} from '@/stores'
import {memoFC, tw} from '@/utils'
import {useIsFocused} from '@react-navigation/native'
import {ActivityIndicator} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'

/**
 * `ScreenLoading` displays a full-screen overlay with a loading spinner when `commonStore.isLoading` is `true`
 * and the screen is currently focused.
 *
 * This component uses `react-native-reanimated` to animate the overlay's entrance and exit via `FadeIn` and `FadeOut`.
 * It is typically placed inside a screen container to indicate global loading states during navigation or data fetching.
 *
 * The background uses the `bg-overlay` Tailwind utility, which should be a semi-transparent dark layer (e.g., `rgba(0,0,0,0.1)`).
 *
 * @component
 * @example
 * ```tsx
 * <ScreenContainer>
 *   <ScreenLoading />
 *   <Text>My Screen Content</Text>
 * </ScreenContainer>
 * ```
 *
 * @returns {JSX.Element} An animated overlay spinner or an empty view if not active.
 */

export const ScreenLoading = memoFC(() => {
  const isFocused = useIsFocused()
  const isLoading = commonStore(store => store.isLoading)

  return isLoading && isFocused ? (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={tw`absolute z-1000 inset-0 justify-center items-center bg-[rgba(0,0,0,0.1)]`}>
      <ActivityIndicator size="large" color={'white'} />
    </Animated.View>
  ) : (
    <Animated.View />
  )
})
