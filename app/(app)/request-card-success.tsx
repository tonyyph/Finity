import {Button, LoadingScreen, Typography} from '@/components'
import {BottomIndicatorAvoidingView, tw} from '@/utils'
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
    title: `Card request successful`,
    sub: `Your new card is on its way! It will arrive within 5–7 business days, and your balance will transfer automatically. `,
    icon: require('@/assets/images/success-filled.png'),
    button: `Return to home`,
  },
]

function RequestCardSuccessScreen() {
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
        router.dismissAll()
        setLoading(false)
      }, 3000)
    } else {
      router.back()
    }
  }, [success])

  if (loading) {
    return <LoadingScreen loading={true} />
  }
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw` flex-1 bg-white items-center mx-sp24 mt-sp128`}>
        <Image style={tw`w-w64 h-h64`} resizeMode="contain" source={localType?.icon} />
        <Typography type="hs" weight="semibold" style={tw`mt-sp16`}>
          {localType?.title}
        </Typography>
        <Typography weight="regular" style={tw`text-center mt-sp16`}>
          {localType?.sub}
        </Typography>
      </View>

      <Button.Primary isLoading={loading} style={tw`mx-sp16`} title={localType?.button} onPress={handleReturnHome} />

      <BottomIndicatorAvoidingView />
    </View>
  )
}
export default RequestCardSuccessScreen
