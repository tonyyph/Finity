import {Button, CircleAlert, Typography} from '@/components'
import {useAnimatedKeyboard, useForgotPin} from '@/hooks'
import {IS_IOS} from '@/lib'
import {BottomIndicatorAvoidingView, TopIndicatorAvoidingView, tw} from '@/utils'
import {EyeIcon, EyeOffIcon} from 'lucide-react-native'
import {useState} from 'react'
import {Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'

export default function ForgotPINScreen() {
  const [securePassword, setSecurePassword] = useState(true)
  const [focusUsername, setFocusUsername] = useState(false)
  const [focusPassword, setFocusPassword] = useState(false)
  const {keyboardHeight} = useAnimatedKeyboard(0)
  const translateStyle = useAnimatedStyle(() => ({
    height: IS_IOS ? (keyboardHeight.value * 13) / 14 : keyboardHeight.value,
  }))

  const {onSubmitForgotPIN, usernameState, passwordState, isLoading} = useForgotPin()

  const onPressSecurePassword = () => {
    setSecurePassword(prev => !prev)
  }

  return (
    <TouchableWithoutFeedback style={tw`flex-1`} onPress={Keyboard.dismiss}>
      <View style={tw`bg-white flex-1`}>
        <TopIndicatorAvoidingView />
        <View style={tw`flex-1 gap-sp16 px-sp16 pt-sp32`}>
          <View style={tw`flex-1`}>
            {/* Welcome */}
            <View style={tw`z-10 mb-sp8`}>
              <View style={tw`gap-sp8`}>
                <Typography type="hs" weight="semibold">
                  Forgot PIN
                </Typography>
                <Typography weight="regular">Enter your credentials to verify your identity and reset your</Typography>
              </View>
            </View>

            <View style={tw`flex-1 gap-sp12 bg-white pt-sp24`}>
              {/* Username Field */}
              <View style={tw`gap-sp4`}>
                <Typography type="bd" weight="medium" textColor="#404040">
                  Email
                </Typography>
                <View style={tw`rounded-br8 relative`}>
                  <TextInput
                    style={tw.style('px-sp12 rounded-br8 bg-white border-bw2 border-subtitle h-h48', {
                      'border-black': !!focusUsername,
                      'border-errormessage': !!passwordState.error,
                      'border-bw2': !!passwordState.error,
                    })}
                    onFocus={() => setFocusUsername(true)}
                    onEndEditing={() => setFocusUsername(false)}
                    placeholder={`Enter your email address`}
                    placeholderTextColor={'gray'}
                    autoCapitalize="none"
                    value={usernameState.value}
                    onChangeText={usernameState.onChangeText}
                  />
                </View>
                {!!usernameState.error && (
                  <View style={tw` flex flex-row items-center mt-sp8`}>
                    <CircleAlert style={tw`mr-sp4`} />
                    <Typography type="bs" weight="medium" textColor="#D9323D">
                      {usernameState.error?.charAt(0).toUpperCase() + usernameState.error?.slice(1)}{' '}
                    </Typography>
                  </View>
                )}
              </View>
              {/* Password Field */}
              <View style={tw`mt-sp16 gap-sp4`}>
                <Typography type="bd" weight="medium" textColor="#404040">
                  Password
                </Typography>
                <View style={tw`rounded-br8 relative`}>
                  <TextInput
                    style={tw.style('px-sp12 rounded-br8 bg-white border-bw2 border-subtitle h-h48', {
                      'border-black': !!focusPassword,
                      'border-errormessage': !!passwordState.error,
                      'border-bw2': !!passwordState.error,
                    })}
                    onFocus={() => setFocusPassword(true)}
                    onEndEditing={() => setFocusPassword(false)}
                    placeholder={`Enter your password`}
                    placeholderTextColor={'gray'}
                    secureTextEntry={securePassword}
                    value={passwordState.value}
                    onChangeText={passwordState.onChangeText}
                  />

                  <TouchableOpacity onPress={onPressSecurePassword} style={tw`absolute top-sp16 right-sp16`}>
                    {securePassword ? <EyeOffIcon style={tw`h-h24 w-w24 text-[#525252]`} /> : <EyeIcon style={tw`h-h24 w-w24 text-[#525252]`} />}
                  </TouchableOpacity>
                </View>
                {!!passwordState.error && (
                  <View style={tw.style('flex flex-row items-center mt-sp16', !!usernameState.error && 'mt-sp8')}>
                    <CircleAlert style={tw`mr-sp4`} />
                    <Typography type="bs" weight="medium" textColor="#D9323D">
                      {passwordState.error?.charAt(0).toUpperCase() + passwordState.error?.slice(1)}
                    </Typography>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={tw`justify-end mt-sp32`}>
            {/* Submit Button */}
            <Button.Primary
              title={`Continue`}
              loadingTitle="Continuing..."
              disabled={!usernameState.value || !passwordState.value}
              isLoading={isLoading}
              onPress={onSubmitForgotPIN}
            />
          </View>
        </View>
        <BottomIndicatorAvoidingView />
        <Animated.View style={translateStyle} />
      </View>
    </TouchableWithoutFeedback>
  )
}
