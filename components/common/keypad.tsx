import {useUserAuthenticateStore, useUserSettingsStore} from '@/stores'
import {tw} from '@/utils'
import {useAuth} from '@clerk/clerk-expo'
import {router} from 'expo-router'
import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Style} from 'twrnc'
import {BiometricIcon, RemoveNumpad} from './icons'
import {Typography} from './text-typography'

/**
 * Props for the Keypad component.
 * @property {(key: string) => void} onKeyPress - Callback function triggered when a key is pressed.
 */
type KeypadProps = {
  onKeyPress: (key: string) => void
  showForgotPin?: boolean
  style?: Style
  allowBiometric?: boolean
}

/**
 * Layout definition for the numeric keypad.
 * Each sub-array represents a row of keys.
 */
const keys = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'back'],
]

/**
 * Keypad Component
 *
 * A custom numeric keypad UI component that emits pressed key values to a parent via a callback.
 *
 * @component
 * @param {KeypadProps} props - The props for the component.
 * @returns {JSX.Element} The rendered Keypad component.
 *
 * @example
 * <Keypad onKeyPress={(key) => console.log(key)} />
 */

export const Keypad: React.FC<KeypadProps> = ({onKeyPress, showForgotPin = false, style, allowBiometric = false}) => {
  const {signOut} = useAuth()
  const {setVerificationPin} = useUserAuthenticateStore()
  const {setEnabledLocalAuth} = useUserSettingsStore()

  const onPressForgotPin = async () => {
    await signOut()
    setVerificationPin('')
    setEnabledLocalAuth(false)
    router.replace({
      pathname: '/pin-forgot',
    })
  }

  return (
    <View style={tw`flex-col items-center justify-end gap-sp8 flex-1 pb-sp16`}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={tw`flex-row items-center justify-around w-full`}>
          {row.map(key => (
            <TouchableOpacity
              key={key}
              style={tw.style(
                'h-h72 w-w72 p-sp16 bg-[#FAFAFA] rounded-full justify-center items-center',
                (key === 'back' || key === '.') && 'bg-white',
              )}
              onPress={() => onKeyPress(key)}
              disabled={!allowBiometric && key === '.'}>
              {key === 'back' ? (
                <RemoveNumpad />
              ) : key === '.' ? (
                allowBiometric ? (
                  <BiometricIcon />
                ) : (
                  <View style={tw`w-w36 h-h36 rounded-full bg-white`} />
                )
              ) : (
                key !== '' && (
                  <Typography type="hm" weight="medium">
                    {key}
                  </Typography>
                )
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
      {/* Forgot PIN */}
      {showForgotPin && (
        <View style={tw.style('px-sp16 pt-sp40', style)}>
          <Typography style={tw`text-center`} onPress={onPressForgotPin}>
            {`Forgot PIN?`}
          </Typography>
        </View>
      )}
    </View>
  )
}
