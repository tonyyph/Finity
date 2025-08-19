import {useListTransaction} from '@/hooks'
import {BottomIndicatorAvoidingView, scale, tw} from '@/utils'
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet'
import {XIcon} from 'lucide-react-native'
import {useEffect, useRef, useState} from 'react'
import {Animated, Keyboard, TextInput, TouchableOpacity, View} from 'react-native'
import {BottomSheet, FilterTransactionIcon, SearchIcon, Typography} from '../common'
import {PointItem} from '../transaction'
import {FilterPointList} from './filter-point-list'

export function TransactionPointTap() {
  const {pointList, fetchPaginatedPointTransactions} = useListTransaction()

  const scrollY = useRef(new Animated.Value(0)).current
  const sheetRef = useRef<BottomSheetModal>(null)
  const [selectedFilterTypes, setSelectedFilterTypes] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const [listHeight, setListHeight] = useState(1)
  const [contentHeight, setContentHeight] = useState(1)

  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState(pointList)
  useEffect(() => {
    setPage(0)

    fetchPaginatedPointTransactions({
      searchText,
      types: selectedFilterTypes,
      cursor: 0,
      take: 20,
    })
  }, [fetchPaginatedPointTransactions, searchText, selectedFilterTypes])
  useEffect(() => {
    let newData = [...pointList]

    setFilteredData(newData)
  }, [searchText, pointList, selectedFilterTypes])

  const handleLoadMore = () => {
    if (isFetchingMore) return

    setIsFetchingMore(true)
    const nextPage = page + 1

    fetchPaginatedPointTransactions({
      searchText,
      types: selectedFilterTypes,
      cursor: 0,
      take: 20 + nextPage * 20,
    }).finally(() => {
      setPage(nextPage)
      setIsFetchingMore(false)
    })
  }

  const HeaderTab = () => (
    <View>
      <View style={tw`flex-row items-center gap-sp12 pt-sp24 pb-sp8 bg-white`}>
        <View style={tw`border flex-1 border-subtitle rounded-br8 relative`}>
          <TextInput
            style={tw`flex-1 h-h48 px-sp16 rounded-br8 bg-subtle border border-subtitle pl-sp40 pr-sp16`}
            placeholder="Search transaction"
            placeholderTextColor="#737373"
            autoCorrect={false}
            autoCapitalize="none"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType="search"
          />
          <View style={tw`absolute top-3.5 left-2`}>
            <SearchIcon />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            sheetRef?.current?.present()
            Keyboard.dismiss()
          }}
          style={tw.style('p-[10px] rounded-full', selectedFilterTypes.length > 0 && 'bg-[#E5E5E5]')}>
          <FilterTransactionIcon />
          {selectedFilterTypes.length > 0 && (
            <View style={tw`rounded-full justify-center w-w20 h-h20 items-center bg-[#000000] absolute left-[34px] top-[-6px]`}>
              <Typography type="bsm" weight="medium" textColor="white">
                {selectedFilterTypes.length}
              </Typography>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {selectedFilterTypes.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            setSelectedFilterTypes([])
          }}
          style={tw`px-sp16 py-sp12 bg-[#525252] self-start items-center mb-sp16 mt-sp8 rounded-full flex-row gap-sp2`}>
          <Typography type="bs" weight="regular" textColor="white">
            Clear filter
          </Typography>
          <XIcon color={'white'} size={scale(16)} />
        </TouchableOpacity>
      )}
    </View>
  )

  const EmptyList = () => (
    <View style={tw`pt-sp16 justify-center items-center`}>
      <Typography weight="regular" type="bd" textColor="#737373" style={tw`text-center`}>
        {selectedFilterTypes.length > 0
          ? `No results found.
Try changing your filter.`
          : `No transactions yet.`}
      </Typography>
    </View>
  )

  const Footer = () => {
    return <BottomIndicatorAvoidingView number={4} />
  }

  const indicatorHeight = 100
  const maxScroll = contentHeight - listHeight
  const indicatorTranslateY = scrollY.interpolate({
    inputRange: [0, maxScroll > 0 ? maxScroll : 1],
    outputRange: [0, listHeight - indicatorHeight],
    extrapolate: 'clamp',
  })

  return (
    <View style={tw`flex-1 relative px-sp16`}>
      {HeaderTab()}
      <Animated.FlatList
        data={filteredData}
        renderItem={({item, index}) => <PointItem item={item} />}
        contentContainerStyle={tw`pt-sp12 pr-sp10`}
        showsVerticalScrollIndicator={false}
        onLayout={e => setListHeight(e.nativeEvent.layout.height)}
        onContentSizeChange={(_, h) => setContentHeight(h)}
        scrollEventThrottle={16}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // Load more when 50% from bottom
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false})}
        ListFooterComponent={Footer}
        ListEmptyComponent={EmptyList}
      />

      {/* Custom Scroll Indicator */}

      {contentHeight > 960 && (
        <Animated.View
          style={{
            position: 'absolute',
            zIndex: 10,
            right: 4,
            top: 88,
            width: 8,
            borderRadius: 8,
            backgroundColor: '#D4D4D4',
            height: indicatorHeight,
            transform: [{translateY: indicatorTranslateY}],
          }}
        />
      )}
      <BottomSheet ref={sheetRef} index={0} snapPoints={['50%']}>
        <BottomSheetView style={tw`min-h-[100%]`}>
          <View style={tw`flex-row justify-between gap-sp12 p-sp12 items-center`}>
            <View style={tw`h-h24 w-w24`} />
            <Typography type="bl" weight="semibold">
              {`Filter transactions`}
            </Typography>
            <TouchableOpacity style={tw`flex-shrink items-center`} onPress={() => sheetRef.current?.close()}>
              <XIcon style={tw`h-h24 w-w24 text-black`} />
            </TouchableOpacity>
          </View>
          <FilterPointList onChange={selected => setSelectedFilterTypes(selected)} selectedFilterTypes={selectedFilterTypes} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

export default TransactionPointTap
