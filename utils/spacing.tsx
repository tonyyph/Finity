import {memoFC} from './commons'
import {Platform, StatusBar, View} from 'react-native'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'
import {isSmallScreen} from './scales'

type Props = {
  number?: number
}

export const BottomIndicatorAvoidingView = memoFC(({number = 1.5}: Props) => {
  const {bottom} = useSafeAreaInsets()

  if (isSmallScreen) {
    return <SafeAreaView />
  } else {
    return <View style={[{height: Platform.OS === 'ios' ? bottom * number : 12 * number}]} />
  }
})

export const TopIndicatorAvoidingView = memoFC(({number = 1}) => {
  const {top} = useSafeAreaInsets()
  const STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? 0
  if (isSmallScreen) {
    return <SafeAreaView />
  } else {
    return (
      <View
        style={[
          {
            height: Platform.OS === 'android' ? STATUS_BAR_HEIGHT * number : top * number,
          },
        ]}
      />
    )
  }
})
