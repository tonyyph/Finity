import {
  AlertIcon,
  CardAndPointTab,
  CardBalanceCom,
  CardButtonGroup,
  FrozenBanner,
  HomeHeader,
  PointsBalanceCom,
  RequestCardNotification,
  toast,
} from '@/components'
import {useCardHolder, useNotification} from '@/hooks'
import {SCREEN_WIDTH, tw} from '@/utils'
import * as Haptics from 'expo-haptics'
import {router, useFocusEffect} from 'expo-router'
import {isEmpty} from 'lodash-es'
import {useCallback, useRef, useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'

function HomeScreen() {
  const {userData, handleFreezeCard, fetchCardHolderCurrent} = useCardHolder()
  const {notifications} = useNotification()
  const {cardholderId, cardStatus, hasIssuedCard} = userData || {}
  const toastShownRef = useRef(false)
  const [refreshing, setRefreshing] = useState(false)

  useFocusEffect(
    useCallback(() => {
      fetchCardHolderCurrent()
    }, []),
  )

  async function handleShowToastError() {
    if (toastShownRef.current) return

    toastShownRef.current = true
    toast.error(
      hasIssuedCard || !cardholderId ? `You must activate your new card before you can load it` : `You cannot load your card while it is frozen`,
      {
        icon: <AlertIcon />,
        duration: 3000,
        width: SCREEN_WIDTH - 28,
      },
    )

    setTimeout(() => {
      toastShownRef.current = false
    }, 3000)
  }

  const onLoadCard = () => {
    Haptics.selectionAsync()
    if (cardStatus === 4 || cardStatus === 1) {
      router.navigate({pathname: '/(app)/load-card'})
    } else {
      handleShowToastError()
    }
  }

  const onSendPoints = () => {
    router.navigate({pathname: '/(app)/send-point'})
  }

  const onPressCard = () => {
    if (!cardholderId) {
      router.navigate({pathname: '/request_card'})
    } else if (cardStatus === 0) {
      router.navigate({pathname: '/active-card'})
    }
  }

  const handleToNotificationCenter = () => {
    router.navigate({pathname: '/notification-center'})
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchCardHolderCurrent()
    setRefreshing(false)
  }

  return (
    <View style={tw`flex-1 bg-subtle`}>
      <ScrollView
        style={tw`bg-subtle`}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} tintColor={'#FF885D'} onRefresh={onRefresh} />}>
        <HomeHeader haveNotification={notifications?.length > 0} onNotification={handleToNotificationCenter} />
        <View>
          {(!cardholderId || cardStatus === 0) && !isEmpty(userData) && <RequestCardNotification onPress={onPressCard} requested={!cardholderId} />}
          {cardStatus === 3 && !isEmpty(userData) && <FrozenBanner onPress={handleFreezeCard} />}
          <View style={tw`gap-sp8 mt-sp8`}>
            <CardBalanceCom value={userData?.cardBalance ?? 0} />
            <PointsBalanceCom value={userData?.pointsBalance ?? 0} />
          </View>
          <View style={tw`h-h16`} />
          <CardButtonGroup onLoadCard={onLoadCard} onSendPoints={onSendPoints} />
          <View style={tw`h-h16`} key={'Transaction Bar'} />
          <View style={tw`flex-1 opacity-100`}>
            <CardAndPointTab />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen
