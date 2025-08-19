import {changeHomeAddress} from '@/api'
import {CircleAlert, Header, Keypad, ProgressBar, Typography} from '@/components'
import {useBiometrics, useCardHolder} from '@/hooks'
import {useUserAuthenticateStore, userStore} from '@/stores'
import {BottomIndicatorAvoidingView, scale, TopIndicatorAvoidingView, tw} from '@/utils'
import {BlurView} from 'expo-blur'
import * as LocalAuthentication from 'expo-local-authentication'
import {router, useLocalSearchParams} from 'expo-router'
import LottieView from 'lottie-react-native'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Platform, StyleSheet, View} from 'react-native'

function PinVerificationScreen() {
  const {type, amount, addressLine1, addressLine2, city, postCode, cardHolderName, cardHolderId, pointsBalance, cardBalance} = useLocalSearchParams()

  const userProfileJson = userStore?.getState().userProfile

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [loading, setLoading] = useState(false)
  const [wrongPin, setWrongPin] = useState(false)
  const [confirmPin, setConfirmPin] = useState<string>('')
  const {getPINDetailInfo} = useCardHolder()
  const {verificationPin, setShowBottomSheetPin} = useUserAuthenticateStore()
  const {bioStatus} = useBiometrics()
  const [authInProgress, setAuthInProgress] = useState(bioStatus)

  const onAuthenticated = useCallback(() => {
    setLoading(true)
    timeoutRef.current = setTimeout(() => {
      setLoading(false)
      router.replace({
        pathname: '/review-transaction',
        params: {
          type: type,
          amount: amount,
          pointsBalance: pointsBalance,
          cardHolderName: cardHolderName,
          cardHolderId: cardHolderId,
          cardBalance: cardBalance,
        },
      })
    }, 3000)
  }, [amount, type, cardHolderName, cardHolderId, pointsBalance])

  const onVerifyEditHomeAddress = useCallback(() => {
    setLoading(true)
    timeoutRef.current = setTimeout(async () => {
      await changeHomeAddress({
        addressLine1: addressLine1 as string,
        addressLine2: addressLine2 as string,
        city: city as string,
        postcode: postCode as string,
        country: userProfileJson?.address?.country,
        dateOfBirth: userProfileJson?.dateOfBirth,
        firstName: userProfileJson?.firstName,
        lastName: userProfileJson?.lastName,
        business: {
          name: userProfileJson?.business?.name,
        },
        mobileNumber: userProfileJson?.mobileNumber,
        email: userProfileJson?.email,
      })
      router.replace('./success-homeaddress')
      setLoading(false)
    }, 2000)
  }, [addressLine1, addressLine2, city, postCode, userProfileJson])

  const onVerifyViewPIN = useCallback(async () => {
    setLoading(true)
    timeoutRef.current = setTimeout(async () => {
      await getPINDetailInfo()
      setShowBottomSheetPin(true)
      setLoading(false)
      router.dismiss()
    }, 2000)
  }, [setShowBottomSheetPin])

  const handleAuthenticate = useCallback(async () => {
    setAuthInProgress(true)
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with biometrics',
      disableDeviceFallback: true, // This only works on Android
      cancelLabel: 'Cancel',
      fallbackLabel: '', // iOS only – setting empty label hides the fallback button
    })
    if (result.success) {
      setAuthInProgress(false)
      type === 'edit-home-address' && onVerifyEditHomeAddress()
      type === 'view-pin' && onVerifyViewPIN()
      ;(type === 'load-card' || type === 'send-points') && onAuthenticated?.()
    } else {
      if (!!result?.error && result?.error === 'user_cancel') {
        setAuthInProgress(false)
      }
    }
  }, [onAuthenticated, onVerifyViewPIN, onVerifyEditHomeAddress, type])

  useEffect(() => {
    bioStatus && handleAuthenticate()
  }, [handleAuthenticate, bioStatus])

  const handleKeyPress = (key: string) => {
    if (key === 'back') {
      setConfirmPin(prev => prev.slice(0, -1))
    } else if (key === '.') {
      handleAuthenticate()
    } else {
      if (confirmPin.length < 4) {
        setConfirmPin(prev => prev + key)
      }
    }
  }
  useEffect(() => {
    if (confirmPin?.length === 4) {
      if (confirmPin === verificationPin) {
        type === 'edit-home-address' && onVerifyEditHomeAddress()
        type === 'view-pin' && onVerifyViewPIN()
        ;(type === 'load-card' || type === 'send-points') && onAuthenticated?.()
      } else {
        setWrongPin(true)
      }
    } else {
      setWrongPin(false)
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [confirmPin, verificationPin, onAuthenticated, type, onVerifyViewPIN, onVerifyEditHomeAddress])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (authInProgress) {
    return <BlurView intensity={Platform.OS === 'ios' ? 60 : 100} tint="dark" style={StyleSheet.absoluteFill} />
  }

  if (loading) {
    return (
      <View style={tw`flex-1 bg-white items-center justify-center`}>
        <LottieView
          style={{width: scale(300), height: scale(300)}}
          source={require('@/assets/json/loader.json')}
          resizeMode="contain"
          speed={1}
          autoPlay
          loop
        />
      </View>
    )
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onBack={router.back} title="Verification" />
      <ProgressBar completeAnimation={true} />
      <View style={tw`flex-1`}>
        <View style={tw`flex-1 flex-col justify-between mx-sp16`}>
          <TopIndicatorAvoidingView number={2.5} />
          <View style={tw` py-sp32`}>
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
                  {`Incorrect PIN. Try again.`}
                </Typography>
              </View>
            )}
          </View>

          <View style={tw`flex-1`}>
            <Keypad onKeyPress={handleKeyPress} showForgotPin allowBiometric={bioStatus} />
          </View>
        </View>
      </View>
      <BottomIndicatorAvoidingView number={2.5} />
    </View>
  )
}

export default PinVerificationScreen
