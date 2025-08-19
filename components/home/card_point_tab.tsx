import {useListTransaction} from '@/hooks'
import {scale, SCREEN_HEIGHT, SCREEN_WIDTH, tw} from '@/utils'
import {useFocusEffect} from 'expo-router'
import {useCallback, useState} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {TabBar, TabBarItem, TabView} from 'react-native-tab-view'
import {Typography} from '../common/text-typography'
import CardTab from './cardTap'
import PointsTap from './pointsTap'

export function CardAndPointTab() {
  const {pointList, cardList, fetchPaginatedCardTransactions, fetchPaginatedPointTransactions} = useListTransaction()

  useFocusEffect(
    useCallback(() => {
      fetchPaginatedPointTransactions({})
      fetchPaginatedCardTransactions({})
    }, [fetchPaginatedPointTransactions, fetchPaginatedCardTransactions]),
  )

  const cardListHeight =
    cardList.length === 0
      ? SCREEN_HEIGHT / 2
      : cardList.length > 10
      ? scale(90) * 11.3
      : (cardList.length + 1) * scale(84) > SCREEN_HEIGHT / 2
      ? (cardList.length + 1) * scale(84)
      : SCREEN_HEIGHT / 2
  const pointTapHeight =
    pointList.length === 0
      ? SCREEN_HEIGHT / 2
      : pointList.length > 10
      ? scale(90) * 11.3
      : (pointList.length + 1) * scale(84) > SCREEN_HEIGHT / 2
      ? (pointList.length + 1) * scale(84)
      : SCREEN_HEIGHT / 2
  const [index, setIndex] = useState<number>(0)

  const tabViewHeight = index === 0 ? cardListHeight : pointTapHeight

  const [routes] = useState([
    {key: 'card', title: 'Card'},
    {key: 'points', title: 'Points'},
  ])

  const renderScene = ({route}: {route: {key: string}}) => {
    switch (route.key) {
      case 'card':
        return <CardTab cardList={cardList} />
      case 'points':
        return <PointsTap pointList={pointList} />
      default:
        return null
    }
  }

  return (
    <View style={tw`flex-1 bg-white shadow-md shadow-slate-200`}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: SCREEN_WIDTH}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicatorStyle}
            contentContainerStyle={styles.containerStyle}
            indicatorContainerStyle={styles.indicatorContainerStyle}
            renderTabBarItem={props => (
              <TabBarItem
                {...props}
                key={`${props.key}`}
                inactiveColor={'#404040'}
                labelAllowFontScaling
                label={({route, focused, color}) => (
                  <Typography weight={focused ? 'bold' : 'medium'} textColor={color} style={tw`px-sp24 w-w200 text-center`}>
                    {route.title}
                  </Typography>
                )}
                activeColor={'#0A0A0A'}
              />
            )}
          />
        )}
        style={{height: tabViewHeight, minHeight: tabViewHeight}}
      />
    </View>
  )
}

export default CardAndPointTab

const styles = StyleSheet.create({
  indicatorContainerStyle: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
  },
  indicatorStyle: {
    backgroundColor: 'black',
    width: Dimensions.get('window').width / 2 - scale(32),
    height: scale(4),
    borderRadius: 100,
    marginHorizontal: scale(16),
  },
  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
})
