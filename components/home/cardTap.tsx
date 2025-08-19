import {BottomIndicatorAvoidingView, scale, tw} from '@/utils'
import {FlashList} from '@shopify/flash-list'
import {router} from 'expo-router'
import {View} from 'react-native'
import {Typography} from '../common/text-typography'
import {CardItem} from '../transaction'
import {Button} from '../ui/button'
export function CardTab({showAll = false, cardList}: {showAll?: boolean; cardList: Transaction[]}) {
  const handleSeeMore = () => {
    router.push({
      pathname: '/transactions',
      params: {initTab: '0'},
    })
  }

  const EmptyList = () => {
    return (
      <View style={tw`pt-sp16 justify-center items-center gap-sp8`}>
        <Typography weight="regular" type="bd" textColor="#737373">
          {`No transactions yet.`}
        </Typography>
      </View>
    )
  }

  const Footer = () => {
    if (showAll) return <BottomIndicatorAvoidingView />
    if (cardList.length < 10 || cardList.length === 0) return null
    if (cardList.length >= 10) {
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
        data={showAll ? cardList : cardList.slice(0, 10)}
        contentContainerStyle={tw`pt-sp12`}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={scale(86)}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        style={tw`flex-1`}
        onEndReachedThreshold={0.1}
        renderItem={({item, index}) => <CardItem item={item} />}
        nestedScrollEnabled={true}
        scrollEnabled={showAll}
        ListFooterComponent={Footer}
        ListEmptyComponent={EmptyList}
      />
    </View>
  )
}
export default CardTab
