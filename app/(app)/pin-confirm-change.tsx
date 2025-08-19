import {CircleAlert} from '@/components/common/icons'
import {Keypad} from '@/components/common/keypad'
import {Typography} from '@/components/common/text-typography'
import {Header} from '@/components/ui/header'
import {useUserAuthenticateStore} from '@/stores'
import {BottomIndicatorAvoidingView, tw} from '@/utils'
import {router, useLocalSearchParams} from 'expo-router'
import {useEffect, useState} from 'react'
import {View} from 'react-native'

export default function ConfirmPINChangeScreen() {
  const {pin} = useLocalSearchParams()
  const {setVerificationPin} = useUserAuthenticateStore()
  const [wrongPin, setWrongPin] = useState(false)
  const [confirmPin, setConfirmPin] = useState<string>('')

  const handleKeyPress = (key: string) => {
    if (key === 'back') {
      setConfirmPin(prev => prev.slice(0, -1))
    } else if (key === '.') {
      setConfirmPin(prev => prev.slice(0, -1))
    } else {
      if (confirmPin.length < 4) {
        setConfirmPin(prev => prev + key)
      }
    }
  }

  useEffect(() => {
    if (confirmPin?.length === 4) {
      if (confirmPin === pin) {
        setVerificationPin(confirmPin)
        router.push({
          pathname: '/pin-success-change',
        })
      } else {
        setWrongPin(true)
      }
    } else {
      setWrongPin(false)
    }
  }, [confirmPin, pin, setVerificationPin])

  return (
    <View style={tw`bg-white flex-1`}>
      <Header onBack={router.back} title="" />
      <View style={tw`flex-1 p-sp16`}>
        {/* Welcome */}
        <View style={tw`z-10`}>
          <View style={tw`gap-sp8`}>
            <Typography type="hs" weight="semibold">
              {`Confirm your PIN code`}
            </Typography>
            <Typography weight="regular">{`Re-enter your PIN for confirmation.`}</Typography>
          </View>
        </View>

        {/* PIN container */}
        <View style={tw`flex-row h-h28 flex justify-center items-center gap-sp32 mt-sp32`}>
          {[...Array(4)].map((_, i) => (
            <View key={i} style={tw`h-h28 w-w28 items-center justify-center p-sp8 `}>
              <View style={tw.style('w-w12 h-h12 bg-neutral-300 rounded-full', confirmPin.length > i && 'bg-black')} />
            </View>
          ))}
        </View>

        {wrongPin && (
          <View style={tw`flex flex-row items-center justify-center mt-sp16`}>
            <CircleAlert style={tw`mr-sp4`} />
            <Typography type="bs" weight="medium" textColor="#D9323D">
              Incorrect PIN. Try again.
            </Typography>
          </View>
        )}
      </View>

      {/* Button */}
      <View style={tw`flex-1`}>
        <Keypad onKeyPress={handleKeyPress} />
      </View>
      <BottomIndicatorAvoidingView number={3.5} />
    </View>
  )
}
