import {Button, ClockIcon, Header, HouseIcon, Typography} from '@/components'
import {useCardHolder, useSettingProfile} from '@/hooks'
import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {router, useFocusEffect} from 'expo-router'
import {useCallback, useState} from 'react'
import {TouchableOpacity, View} from 'react-native'

const DamagedScreen = () => {
  const [loading, setLoading] = useState<boolean>()
  const {handleReportOrDamaged} = useCardHolder()
  const {settingProfile: userProfile, fetchSettingProfile} = useSettingProfile()

  useFocusEffect(
    useCallback(() => {
      fetchSettingProfile()
    }, [fetchSettingProfile]),
  )
  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      handleReportOrDamaged(true)
    }, 2000)
  }

  const onEditHomeAddress = () => {
    router.push('/(app)/edit-homeaddress')
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onBack={router.back} title="" />
      <View style={tw`flex-1`}>
        <View style={tw`flex-1 p-sp16 gap-sp12`}>
          <Typography type="hs" weight="semibold">
            Confirm your address
          </Typography>
          <View style={tw`flex-row gap-sp12 pt-sp24`}>
            <HouseIcon />
            <View>
              <Typography type="bd" weight="semibold">
                Will be delivered to
              </Typography>
              {userProfile?.addressLine1 && <Typography weight="regular">{userProfile?.addressLine1}</Typography>}
              {userProfile?.addressLine2 && <Typography weight="regular">{userProfile?.addressLine2}</Typography>}
              {userProfile?.city && <Typography weight="regular">{userProfile?.city}</Typography>}
              {userProfile?.postcode && <Typography weight="regular">{userProfile?.postcode}</Typography>}
              <TouchableOpacity onPress={onEditHomeAddress}>
                <Typography weight="regular" style={tw`mt-sp8 underline`}>
                  Change address?
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`flex-1 flex-row gap-sp12 pt-sp24`}>
            <ClockIcon />
            <View>
              <Typography type="bd" weight="semibold">
                Expected delivery time
              </Typography>
              <Typography weight="regular">Should arrive within 5-7 business days</Typography>
            </View>
          </View>
        </View>
        <View style={tw`justify-end px-sp16 py-sp12`}>
          <Button.Primary title={`Confirm and request card`} loadingTitle="Confirming..." isLoading={loading} onPress={handleConfirm} />
        </View>
      </View>
      <BottomIndicatorAvoidingView />
    </View>
  )
}

export default DamagedScreen
