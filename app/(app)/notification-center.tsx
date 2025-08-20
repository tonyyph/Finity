import {LogoMark} from '@/assets'
import {Typography} from '@/components/common/text-typography'
import {Header} from '@/components/ui/header'
import {ProgressBar} from '@/components/ui/progress'
import {NotificationItem, useNotification} from '@/hooks/notifications/useNotification'
import {tw} from '@/utils'
import {FlashList} from '@shopify/flash-list'
import {router} from 'expo-router'
import {Image, TouchableOpacity, View} from 'react-native'

function NotificationScreen() {
  const {notifications} = useNotification()

  const onPressNotification = (item: NotificationItem) => {
    router.push({
      pathname: '/transaction-point-detail',
      params: {
        item: JSON.stringify(item),
      },
    })
  }

  const renderItem = ({item}: {item: NotificationItem}) => (
    <TouchableOpacity
      onPress={() => {
        onPressNotification(item)
      }}
      activeOpacity={0.2}
      style={tw.style('flex-row items-start p-sp8 mt-sp8 rounded-br8', !item.read && 'bg-white')}>
      <View style={tw`mx-1`}>
        <View style={tw.style('w-w9 h-h9 bg-border2 rounded-full mt-sp6 mr-sp8', !item.read && 'bg-[#FF885D]')} />
      </View>
      <View style={tw`flex-1 gap-sp4`}>
        <View style={tw`flex flex-row items-center justify-between`}>
          <Typography weight="semibold" type="bd" textColor={!item?.read ? '#0A0A0A' : '#737373'}>
            Points received
          </Typography>
          <Typography weight="regular" type="bs" textColor="#737373">
            {item.date}
          </Typography>
        </View>
        <Typography weight="regular" type="bs" textColor={!item?.read ? '#404040' : '#737373'}>
          Hello! You have received {item.points.toLocaleString()} points from {item.sender}.
        </Typography>
      </View>
    </TouchableOpacity>
  )

  const EmptyList = () => {
    return (
      <View style={tw`pt-[50%] justify-center items-center`}>
        <Image source={LogoMark} style={tw`w-w100 h-h100`} />
        <Typography weight="regular" type="bd" textColor="#737373">
          No notifications yet.
        </Typography>
      </View>
    )
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onBack={router.back} title="Notifications" />
      <ProgressBar completeAnimation />
      <FlashList
        data={notifications}
        style={tw`mx-sp16`}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        keyExtractor={item => item.id}
        estimatedItemSize={80}
      />
    </View>
  )
}
export default NotificationScreen
