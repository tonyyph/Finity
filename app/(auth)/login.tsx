import {Button, CircleAlert, Typography} from '@/components'
import {useLogin} from '@/hooks'
import {FORGOT_PASSWORD_URL} from '@/lib'
import {TopIndicatorAvoidingView, tw} from '@/utils'
import {router} from 'expo-router'
import {EyeIcon, EyeOffIcon} from 'lucide-react-native'
import {useState} from 'react'
import {Image, Keyboard, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'

export default function LoginScreen() {
  const [securePassword, setSecurePassword] = useState(true)
  const [focusUsername, setFocusUsername] = useState(false)
  const [focusPassword, setFocusPassword] = useState(false)
  const {onLogin, usernameState, passwordState, isLoading} = useLogin()

  const onPressSecurePassword = () => {
    setSecurePassword(prev => !prev)
  }

  const onPressForgotPassword = () => {
    router.push({
      pathname: '/un-auth-web-view',
      params: {
        title: 'Forgot password',
        webLink: FORGOT_PASSWORD_URL,
      },
    })
  }

  return (
    <View style={tw`flex-1`}>
      {/* Welcome */}
      <View style={tw`bg-black justify-end`}>
        <TopIndicatorAvoidingView />
        <Image source={require('@/assets/images/logo-stack.png')} style={tw`w-full h-h70 my-sp40`} resizeMode="contain" />
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={tw`bg-black z-10 flex-1 justify-center`}>
          {/* Input Field */}
          <View style={tw`flex-1 z-20 bg-orange-primary rounded-t-br24`}>
            <View style={tw`flex-1 flex-col gap-sp20 bg-white top-sp8 p-sp16 pt-sp24 rounded-t-br24`}>
              {/* Username Field */}
              <View>
                <Typography type="bd" weight="medium" textColor="#404040">
                  Email
                </Typography>
                <View style={tw`rounded-br8 relative mt-sp2 mb-sp8`}>
                  <TextInput
                    style={tw.style(
                      `px-sp12 rounded-br8 bg-white text-bd leading-bs font-rg border-bw1 border-border2 h-h48`,
                      !!focusUsername && `border-bw2 border-black`,
                      (!!passwordState.error || !!usernameState.error) && `border-errormessage border-bw2`,
                    )}
                    onFocus={() => setFocusUsername(true)}
                    onEndEditing={() => setFocusUsername(false)}
                    placeholder={`Enter email address`}
                    placeholderTextColor={'gray'}
                    autoCapitalize="none"
                    value={usernameState.value}
                    onChangeText={usernameState.onChangeText}
                  />
                </View>
                {!!usernameState.error && (
                  <View style={tw`flex flex-row items-center`}>
                    <CircleAlert style={tw`mr-sp4`} />
                    <Typography type="bs" weight="medium" textColor="#D9323D">
                      {usernameState.error?.charAt(0).toUpperCase() + usernameState.error?.slice(1)}{' '}
                    </Typography>
                  </View>
                )}
              </View>
              {/* Password Field */}
              <View>
                <Typography textColor="#404040">Password</Typography>
                <View style={tw`rounded-br8 relative mt-sp2 mb-sp8`}>
                  <TextInput
                    style={tw.style(
                      `px-sp12 rounded-br8 bg-white border-bw1 text-bd leading-bs font-rg border-border2 h-h48`,
                      !!focusPassword && `border-bw2 border-black`,
                      (!!passwordState.error || !!usernameState.error) && `border-errormessage border-bw2`,
                    )}
                    onFocus={() => setFocusPassword(true)}
                    onEndEditing={() => setFocusPassword(false)}
                    placeholder={`Enter password`}
                    placeholderTextColor={'gray'}
                    secureTextEntry={securePassword}
                    value={passwordState.value}
                    onChangeText={passwordState.onChangeText}
                  />
                  <TouchableOpacity onPress={onPressSecurePassword} style={tw`absolute top-sp12 right-sp16`}>
                    {securePassword ? <EyeOffIcon style={tw`h-h24 w-w24 text-[#525252]`} /> : <EyeIcon style={tw`h-h24 w-w24 text-[#525252]`} />}
                  </TouchableOpacity>
                </View>
                {!!passwordState.error && (
                  <View style={tw.style(`flex flex-row items-center`, !usernameState.error && 'mt-sp12')}>
                    <CircleAlert style={tw`mr-sp4`} />
                    <Typography type="bs" weight="medium" textColor="#D9323D">
                      {passwordState.error}
                    </Typography>
                  </View>
                )}
              </View>
              {/* Login Button */}
              <Button.Primary title="Sign in" loadingTitle="Signing in..." isLoading={isLoading} onPress={onLogin} style={tw`mt-sp16`} />
              {/* Forgot password */}
              <TouchableOpacity style={tw`px-sp16`} onPress={onPressForgotPassword}>
                <Typography type="bd" weight="medium" style={tw`text-center my-sp4`}>
                  Forgot password?
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
