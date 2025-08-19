import {Button, Header, Typography} from '@/components'
import {useCardHolder, useUserProfile} from '@/hooks'
import {IS_IOS} from '@/lib'
import {BottomIndicatorAvoidingView, exactDesign, tw} from '@/utils'
import {router} from 'expo-router'
import {Image, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

const content = [
  {
    title: 'Free card',
    sub: 'Request a physical card at no cost.',
    icons: require('@/assets/images/free-card.png'),
  },
  {
    title: 'Convert points',
    sub: 'Convert your points into card balance effortlessly.',
    icons: require('@/assets/images/convert-icon.png'),
  },
  {
    title: 'Spend anywhere',
    sub: 'Pay in any store where Mastercard® is accepted, locally and overseas.',
    icons: require('@/assets/images/spend-icon.png'),
  },
]

function RequestCard() {
  const {handleRequestCardHolder, loading} = useCardHolder()
  const {userProfile} = useUserProfile()
  const insets = useSafeAreaInsets()

  const handleConfirm = () => {
    handleRequestCardHolder({
      addressLine1: userProfile?.address?.addressLine1,
      addressLine2: userProfile?.address?.addressLine2,
      city: userProfile?.address?.city,
      postcode: userProfile?.address?.postCode,
    })
  }

  return (
    <View style={tw`flex-1 bg-subtle`}>
      <Header onLeftFunction={router.back} />
      gap-sp8
      <ScrollView style={tw`pb-[120px] mt-6`}>
        <View style={tw`px-sp16 pt-sp24 `}>
          <Typography type="hs" weight="semibold">
            {'Request a physical card'}
          </Typography>
          <Typography weight="regular" style={tw`mr-6`}>
            Convert your points into real value and start enjoying the rewards.
          </Typography>
        </View>

        <View style={tw`items-center py-6`}>
          <Image
            resizeMode="contain"
            source={require('@/assets/images/OnboardCard.png')}
            style={{width: exactDesign(124), height: exactDesign(192)}}
          />
        </View>

        <View style={tw`p-sp12 gap-sp20`}>
          {content.map((e, i) => (
            <View key={`${i}`} style={tw`flex-row gap-sp12`}>
              <View style={tw`items-start`}>
                <Image source={e.icons} resizeMode="contain" style={tw`h-h24 w-w24`} />
              </View>
              <View style={tw`flex-1 gap-sp4`}>
                <Typography weight="semibold">{e.title}</Typography>
                <Typography weight="regular">{e.sub}</Typography>
              </View>
            </View>
          ))}
        </View>

        <View style={tw`p-sp12 pt-sp20`}>
          <Typography weight="regular" textColor="#404040">
            {`By proceeding, you agree to bank’s `}
            <Typography
              onPress={() =>
                router.push({
                  pathname: '/web-view',
                  params: {
                    title: 'Terms and conditions',
                    webLink: 'https://www.finity.co.uk/terms-conditions/',
                  },
                })
              }
              weight="medium"
              style={tw`underline`}>
              {`Terms and Conditions`}
            </Typography>
          </Typography>
        </View>
      </ScrollView>
      {/* Sticky bottom button */}
      <View
        style={tw.style(`bg-white p-sp12 shadow-md shadow-slate-100`, {
          position: 'absolute',
          bottom: insets.bottom - (IS_IOS ? 32 : 0),
          left: 0,
          right: 0,
        })}>
        <Button.Primary loadingTitle="Confirming..." isLoading={loading} title={'Confirm and request card'} onPress={handleConfirm} />

        <BottomIndicatorAvoidingView number={0.8} />
      </View>
    </View>
  )
}
export default RequestCard
