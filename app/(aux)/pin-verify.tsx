import {Header} from '@/components'
import {Keypad} from '@/components/common/keypad'
import {Typography} from '@/components/common/text-typography'
import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {router, useLocalSearchParams} from 'expo-router'
import {useEffect, useState} from 'react'
import {View} from 'react-native'

export default function VerifyPINScreen() {
  const {isResetPin} = useLocalSearchParams()

  const [pin, setPin] = useState<string>('')

  const handleKeyPress = (key: string) => {
    if (key === 'back') {
      setPin(prev => prev.slice(0, -1))
    } else if (key === '.') {
      setPin(prev => prev.slice(0, -1))
    } else {
      if (pin.length < 4) {
        setPin(prev => prev + key)
      }
    }
  }

  useEffect(() => {
    if (pin.length === 4) {
      router.push({
        pathname: '/pin-confirm',
        params: {
          pin: pin,
          isResetPin,
        },
      })
    }
  }, [pin, isResetPin])

  return (
    <View style={tw`bg-white flex-1`}>
      <Header onBack={router.back} title="" />

      <View style={tw`flex-1 p-sp16`}>
        {/* Welcome */}
        <View style={tw`z-10`}>
          <View style={tw`gap-sp8`}>
            <Typography type="hs" weight="semibold">
              Set up your PIN code
            </Typography>
            <Typography weight="regular">Create a 4-digit PIN to sign in faster next time.</Typography>
          </View>
        </View>

        {/* PIN container */}
        <View style={tw`flex-row h-h28 flex justify-center items-center gap-sp32 mt-sp32`}>
          {[...Array(4)].map((_, i) => (
            <View key={i} style={tw`h-h28 w-w28 items-center justify-center p-sp8 `}>
              <View style={tw.style('w-w12 h-h12 bg-neutral-300 rounded-full', pin.length > i && 'bg-black')} />
            </View>
          ))}
        </View>
      </View>
      <View style={tw`flex-1 px-sp16 pb-sp12`}>
        <Keypad onKeyPress={handleKeyPress} />
      </View>
      <BottomIndicatorAvoidingView number={2.5} />
    </View>
  )
}
