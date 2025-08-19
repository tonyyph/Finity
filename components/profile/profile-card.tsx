import {userStore} from '@/stores'
import {tw} from '@/utils'
import {useUser} from '@clerk/clerk-expo'
import {View} from 'react-native'
import {Typography, UserAvatar} from '../common'

export function ProfileCard() {
  const userProfile = userStore.getState().userProfile
  const {user} = useUser()

  return (
    <View style={tw`p-sp12 bg-neutral-100 mt-sp8 flex-row items-center justify-center overflow-hidden rounded-br12`}>
      <View style={tw`flex flex-1 flex-row items-center justify-center gap-sp12`}>
        <UserAvatar user={user!} fullName={userProfile?.firstName + ' ' + userProfile?.lastName} textType={'bl'} />
        <View style={tw`flex-1 justify-center gap-sp2`}>
          <Typography type="bl">{userProfile?.firstName + ' ' + userProfile?.lastName}</Typography>
          <Typography weight="regular" textColor="#737373">
            {userProfile?.email}
          </Typography>
        </View>
      </View>
    </View>
  )
}
