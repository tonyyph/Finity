import {ProfileItem, Header, ProgressBar} from '@/components'
import {formatDateString} from '@/lib'
import {router, useFocusEffect} from 'expo-router'
import {useCallback} from 'react'
import {ScrollView, View} from 'react-native'
import {useSettingProfile} from '@/hooks'
import {tw} from '@/utils'

export default function EditProfileScreen() {
  const {settingProfile: userProfile, loading, fetchSettingProfile} = useSettingProfile()

  useFocusEffect(
    useCallback(() => {
      fetchSettingProfile()
    }, [fetchSettingProfile]),
  )
  const onPressEditMobileNumber = () => {
    router.push('/(app)/edit-phonenumber')
  }
  const onEditHomeAddress = () => {
    router.push('/(app)/edit-homeaddress')
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onBack={router.back} title="Personal information" />
      <ProgressBar completeAnimation={!loading} />
      <ScrollView style={tw`bg-white`} contentContainerStyle={tw`p-sp24`}>
        <ProfileItem title={'Full Name'} loading={loading} value={userProfile?.firstName + ' ' + userProfile?.lastName} />
        <ProfileItem title={'Email address'} loading={loading} value={userProfile?.email} />
        <ProfileItem
          title={'Phone number'}
          value={`+44 ${userProfile?.mobileNumber}`}
          loading={loading}
          onPress={onPressEditMobileNumber}
          canEdit={true}
        />
        <ProfileItem title={'Date of birth'} loading={loading} value={formatDateString(userProfile?.dateOfBirth)} />
        <ProfileItem
          title={'Home address'}
          loadingMultiple={loading}
          value={userProfile?.addressLine1}
          value0={userProfile?.addressLine2}
          value1={userProfile?.city}
          value2={userProfile?.postcode}
          onPress={onEditHomeAddress}
          canEdit={true}
        />

        <View style={tw`mt-sp16`} />
        <ProfileItem
          title={''}
          topicTitle={'Business information'}
          loading={loading}
          value={userProfile?.business?.name ?? 'TOMATO LIMITED'}
          showDivider={false}
        />
      </ScrollView>
    </View>
  )
}
