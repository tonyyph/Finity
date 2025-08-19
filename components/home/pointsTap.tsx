import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {FlashList} from '@shopify/flash-list'
import {router} from 'expo-router'
import {View} from 'react-native'
import {Typography} from '../common/text-typography'
import {PointItem} from '../transaction'
import {Button} from '../ui/button'

export function PointsTap({showAll = false, pointList}: {showAll?: boolean; pointList: Transaction[]}) {
  const handleSeeMore = () => {
    router.push({
      pathname: '/transactions',
      params: {initTab: '1'},
    })
  }

  const EmptyList = () => {
    return (
      <View style={tw`pt-sp16 justify-center items-center`}>
        <Typography weight="regular" type="bd" textColor="#737373">
          No transactions yet.
        </Typography>
      </View>
    )
  }

  const Footer = () => {
    if (showAll) return <BottomIndicatorAvoidingView />
    if (pointList.length < 10 && pointList.length > 0) return null
    if (pointList.length >= 10) {
      return (
        <View style={tw`mt-sp16`}>
          <Button.Secondary title={`See more`} onPress={handleSeeMore} />
        </View>
      )
    }
  }
  return (
    <View style={tw`flex-1 px-sp16`}>
      <FlashList
        data={showAll ? pointList : pointList.slice(0, 10)}
        contentContainerStyle={tw`pt-sp12`}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={86}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        style={tw`flex-1`}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => <PointItem item={item} />}
        nestedScrollEnabled={true}
        scrollEnabled={showAll}
        ListFooterComponent={Footer}
        ListEmptyComponent={EmptyList}
      />
    </View>
  )
}
export default PointsTap
