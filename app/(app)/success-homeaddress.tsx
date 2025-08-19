import {getUserProfile} from '@/api'
import {Button, Typography} from '@/components'
import {userStore} from '@/stores'
import {BottomIndicatorAvoidingView, TopIndicatorAvoidingView, tw} from '@/utils'
import {router} from 'expo-router'
import {useCallback, useEffect, useState} from 'react'
import {Image, View} from 'react-native'

function SuccessHomeAddressScreen() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const {data: session} = await getUserProfile()
        userStore.setState({userProfile: session as UserProfile})
      } catch (error) {
        console.log('error', error)
      } finally {
        setLoading(false)
      }
    }
    loading && fetchUserProfile()
  }, [loading])

  const handleContinue = useCallback(() => {
    router.back()
  }, [])

  return (
    <View style={tw`flex-1 bg-white`}>
      <TopIndicatorAvoidingView />
      <View style={tw`flex-1`}>
        <View style={tw`flex-1 px-sp16 gap-sp12 items-center mt-40`}>
          <Image style={tw`w-16 h-16`} resizeMode="contain" source={require('@/assets/images/success-filled.png')} />
          <Typography type="hs" weight="semibold">
            Home address changed
          </Typography>
          <Typography weight="regular" style={tw`text-center mx-sp16`}>
            Your home address has been updated successfully.
          </Typography>
        </View>
        <View style={tw`px-sp16`}>
          <Button.Primary title={`Continue`} isLoading={loading} onPress={handleContinue} />
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  )
}
export default SuccessHomeAddressScreen
