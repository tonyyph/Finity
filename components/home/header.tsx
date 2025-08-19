import {useUserProfile} from '@/hooks/profile/useUserProfile'
import {TopIndicatorAvoidingView, tw} from '@/utils'
import {Image, View} from 'react-native'
import {Typography} from '../common/text-typography'
import {Touch} from '../ui/touch'

type HomeHeaderProps = {
  haveNotification?: boolean
  onNotification?: (params?: any) => void
}

export function HomeHeader({haveNotification, onNotification}: HomeHeaderProps) {
  const {userProfile} = useUserProfile()

  return (
    <View>
      <TopIndicatorAvoidingView />
      <View style={tw`flex flex-row items-center justify-between gap-sp16 px-sp16 py-sp12 h-h56`}>
        <View style={tw`flex flex-1 flex-row items-center gap-sp12`}>
          <View style={tw`flex-1 px-sp4`}>
            <Typography weight="bold" type="hs">
              {`${`Hi`} ${userProfile?.firstName ? userProfile?.firstName : ''}!`}
            </Typography>
          </View>
        </View>
        <Touch onPress={onNotification} style={tw`relative right-sp8`}>
          <Image source={require('@/assets/images/bellIcon.png')} style={tw`w-w28 h-h28`} resizeMode="contain" />
          {haveNotification && <View style={tw`rounded-full w-w10 h-h10 bg-[#FF885D] absolute right-0 top-sp2`} />}
        </Touch>
      </View>
    </View>
  )
}
