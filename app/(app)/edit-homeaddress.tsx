import {Button, CircleAlert, Header, Typography} from '@/components'
import {useAnimatedKeyboard} from '@/hooks'
import {IS_IOS} from '@/lib'
import {userStore} from '@/stores'
import {BottomIndicatorAvoidingView, tw, validateUKPostcode} from '@/utils'
import {router} from 'expo-router'
import {useCallback, useState} from 'react'
import {TextInput, View} from 'react-native'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'

const EditHomeAddressScreen = () => {
  const userProfile = userStore?.getState().userProfile

  const [loading, setLoading] = useState<boolean>()
  const [addressLine1, setAddressLine1] = useState<string>(userProfile?.address?.addressLine1 ?? '')
  const [addressLine2, setAddressLine2] = useState<string>(userProfile?.address?.addressLine2 ?? '')
  const [townOrCity, setTownOrCity] = useState<string>(userProfile?.address?.city ?? '')
  const [postCode, setPostCode] = useState<string>(userProfile?.address?.postCode ?? '')
  const [focusAddressLine1, setFocusAddressLine1] = useState<boolean>(false)
  const [focusAddressLine2, setFocusAddressLine2] = useState<boolean>(false)
  const [focusTownOrCity, setFocusTownOrCity] = useState<boolean>(false)
  const [focusPostCode, setFocusPostCode] = useState<boolean>(false)

  const {keyboardHeight} = useAnimatedKeyboard(0)
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value,
  }))

  const handleSave = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.replace({
        pathname: '/pin-verification',
        params: {
          type: 'edit-home-address',
          userProfile: JSON.stringify(userProfile),
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          city: townOrCity,
          postCode: postCode,
        },
      })
    }, 2000)
  }, [addressLine1, addressLine2, postCode, townOrCity, userProfile])

  const isDisabled = !validateUKPostcode(postCode) || addressLine1?.length > 50 || addressLine2?.length > 50 || townOrCity?.length > 20

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onBack={router.back} title="" />
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`px-sp16 gap-sp16 pt-sp24`}>
          <Typography type="hm" weight="semibold">
            Edit home address
          </Typography>
          <View style={tw`justify-start gap-sp16`}>
            <View style={tw`gap-sp4`}>
              <Typography textColor="#404040">Address line 1</Typography>
              <View style={tw`flex-row gap-sp12`}>
                <TextInput
                  style={tw.style('px-sp12 rounded-br8 bg-white flex-1 border border-border2 h-h48', {
                    'border-black border-bw2': !!focusAddressLine1,
                    'border-errormessage border-bw2': addressLine1?.length > 50,
                  })}
                  onFocus={() => setFocusAddressLine1(true)}
                  onEndEditing={() => setFocusAddressLine1(false)}
                  placeholder={`Enter your new mobile number.`}
                  placeholderTextColor={'#A3A3A3'}
                  autoCapitalize="none"
                  value={addressLine1}
                  onChangeText={text => {
                    setAddressLine1(text)
                  }}
                />
              </View>
              {addressLine1?.length > 50 && (
                <View style={tw`flex flex-row items-center`}>
                  <CircleAlert style={tw`mr-sp4`} />
                  <Typography type="bs" weight="medium" textColor="#D9323D">
                    {`Cannot exceed 50 characters`}
                  </Typography>
                </View>
              )}
            </View>
            <View style={tw`gap-sp4`}>
              <Typography textColor="#404040">{`Address line 2 (optional)`}</Typography>
              <View style={tw`flex-row gap-sp12`}>
                <TextInput
                  style={tw.style('px-sp12 rounded-br8 bg-white flex-1 border border-border2 h-h48', {
                    'border-black border-bw2': !!focusAddressLine2,
                    'border-errormessage border-bw2': addressLine2?.length > 50,
                  })}
                  onFocus={() => setFocusAddressLine2(true)}
                  onEndEditing={() => setFocusAddressLine2(false)}
                  placeholder={`Enter your new mobile number.`}
                  placeholderTextColor={'#A3A3A3'}
                  autoCapitalize="none"
                  value={addressLine2}
                  onChangeText={text => {
                    setAddressLine2(text)
                  }}
                />
              </View>
              {addressLine2?.length > 50 && (
                <View style={tw`flex flex-row items-center`}>
                  <CircleAlert style={tw`mr-sp4`} />
                  <Typography type="bs" weight="medium" textColor="#D9323D">
                    {`Cannot exceed 50 characters`}
                  </Typography>
                </View>
              )}
            </View>
            <View style={tw`flex-row gap-sp16`}>
              <View style={tw`gap-sp4 flex-[0.65]`}>
                <Typography textColor="#404040">{`Town or city`}</Typography>
                <View style={tw`flex-row gap-sp12`}>
                  <TextInput
                    style={tw.style('px-sp12 rounded-br8 bg-white flex-1 border border-border2 h-h48', {
                      'border-black border-bw2': !!focusTownOrCity,
                    })}
                    onFocus={() => setFocusTownOrCity(true)}
                    onEndEditing={() => setFocusTownOrCity(false)}
                    placeholder={`Enter your new mobile number.`}
                    placeholderTextColor={'#A3A3A3'}
                    autoCapitalize="none"
                    value={townOrCity}
                    onChangeText={text => {
                      setTownOrCity(text)
                    }}
                  />
                </View>
                {townOrCity?.length > 20 && (
                  <View style={tw`flex flex-row items-center`}>
                    <CircleAlert style={tw`mr-sp4`} />
                    <Typography type="bs" weight="medium" textColor="#D9323D">
                      {`Cannot exceed 20 characters`}
                    </Typography>
                  </View>
                )}
              </View>
              <View style={tw`gap-sp4 flex-[0.35]`}>
                <Typography textColor="#404040">{`Postcode`}</Typography>
                <View style={tw`flex-row gap-sp12`}>
                  <TextInput
                    style={tw.style('px-sp12 rounded-br8 bg-white flex-1 border border-border2 h-h48', {
                      'border-black border-bw2': !!focusPostCode,
                      'border-errormessage border-bw2': !validateUKPostcode(postCode),
                    })}
                    onFocus={() => setFocusPostCode(true)}
                    onEndEditing={() => setFocusPostCode(false)}
                    placeholder={`Enter your new mobile number.`}
                    placeholderTextColor={'#A3A3A3'}
                    autoCapitalize="none"
                    value={postCode}
                    onChangeText={text => {
                      setPostCode(text)
                    }}
                  />
                </View>
                {!validateUKPostcode(postCode) && (
                  <View style={tw`flex flex-row items-start`}>
                    <CircleAlert style={tw`mr-sp4`} />
                    <Typography type="bs" weight="medium" textColor="#D9323D">
                      {`Enter a valid UK postcode`}
                    </Typography>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        <View key={1} style={tw`justify-end px-sp16 py-sp12`}>
          <Button.Primary title={`Save`} disabled={isDisabled} loadingTitle="Saving..." isLoading={loading} onPress={handleSave} />

          <BottomIndicatorAvoidingView />
        </View>
      </View>
      <Animated.View style={translateStyle} />
    </View>
  )
}

export default EditHomeAddressScreen
