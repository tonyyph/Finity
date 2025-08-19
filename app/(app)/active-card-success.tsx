import {LoadingScreen} from '@/components/common/loading'
import {Typography} from '@/components/common/text-typography'
import {Button} from '@/components/ui/button'
import {BottomIndicatorAvoidingView, TopIndicatorAvoidingView, tw} from '@/utils'
import {router, useLocalSearchParams} from 'expo-router'
import {useCallback, useEffect, useState} from 'react'
import {Image, View} from 'react-native'

interface propsLocal {
  title: string
  sub: string
  icon: any
  button: string
}

const type = [
  {
    title: `Something went wrong`,
    sub: `An unexpected error occurred while processing your request. Please try again.`,
    icon: require('@/assets/images/error-filled.png'),
    button: `Try again`,
  },
  {
    title: `Card activated successfully!`,
    sub: `Your card has been activated and is ready for use. Enjoy your transactions!`,
    icon: require('@/assets/images/success-filled.png'),
    button: `Return to home`,
  },
]

function ActiveCardSuccessScreen() {
  const {success} = useLocalSearchParams()
  const [localType, setLocalType] = useState<propsLocal>()
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (success !== 'false') {
      setLocalType(type[1])
    } else {
      setLocalType(type[0])
    }
  }, [success])

  const handleReturnHome = useCallback(() => {
    if (success !== 'false') {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        router.back()
      }, 3000)
    } else {
      router.back()
    }
  }, [success])

  return (
    <View style={tw`flex-1 bg-white px-sp16 pt-sp24`}>
      <TopIndicatorAvoidingView />
      <LoadingScreen loading={loading} />

      <View style={tw` flex-1 bg-white items-center mt-28`}>
        <Image style={tw`w-16 h-16`} resizeMode="contain" source={localType?.icon} />
        <Typography type="hs" weight="semibold" style={tw`mt-sp16`}>
          {localType?.title}
        </Typography>
        <Typography weight="regular" style={tw`text-center mt-sp16`}>
          {localType?.sub}
        </Typography>
      </View>
      <View style={tw`px-sp16 py-sp12`}>
        <Button.Primary title={localType?.button} onPress={handleReturnHome} />
      </View>

      <BottomIndicatorAvoidingView />
    </View>
  )
}
export default ActiveCardSuccessScreen
