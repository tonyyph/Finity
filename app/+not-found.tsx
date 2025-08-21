import {Button, CircleAlertX, Typography} from '@/components'
import {SUPPORT_URL} from '@/lib'
import {BottomIndicatorAvoidingView, TopIndicatorAvoidingView, tw} from '@/utils'
import {router, Stack, useNavigation} from 'expo-router'
import {useEffect} from 'react'
import {View} from 'react-native'

export default function NotFoundScreen() {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <View />,
    })
  }, [navigation])

  return (
    <>
      <Stack.Screen options={{title: 'Oops!'}} />
      <View style={tw`flex-1 bg-white px-sp16`}>
        <TopIndicatorAvoidingView number={2.5} />
        <View style={tw` flex-1 bg-white items-center`}>
          <CircleAlertX />
          <Typography type="hs" weight="semibold" style={tw`mt-sp16`}>
            Page not found
          </Typography>
          <Typography weight="regular" style={tw`text-center mt-sp16`}>
            We can’t seem to find the page you’re looking for.
          </Typography>
          <Typography weight="regular" style={tw`text-center mt-sp16 mx-sp16`}>
            Try going back to the previous page or contact us at{' '}
            <Typography
              weight="regular"
              style={tw`text-center mt-sp16 underline`}
              onPress={() =>
                router.push({
                  pathname: '/un-auth-web-view',
                  params: {
                    title: '',
                    webLink: SUPPORT_URL,
                  },
                })
              }>
              support.finity.co.uk
            </Typography>
          </Typography>
        </View>

        <View style={tw`px-sp16 py-sp12`}>
          <Button.Primary
            title={`Return to home`}
            onPress={() => {
              router.back()
            }}
          />
        </View>
        <BottomIndicatorAvoidingView />
      </View>
    </>
  )
}
