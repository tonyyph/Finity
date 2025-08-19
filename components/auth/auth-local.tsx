/* eslint-disable @typescript-eslint/no-unused-vars */
import {useBiometrics} from '@/hooks'
import {useUserAuthenticateStore, userStore} from '@/stores'
import {BottomIndicatorAvoidingView, TopIndicatorAvoidingView, tw} from '@/utils'
import {BlurView} from 'expo-blur'
import * as LocalAuthentication from 'expo-local-authentication'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Image, Platform, StyleSheet, View} from 'react-native'
import {CircleAlert, Keypad, LoadingScreen, Typography} from '../common'

type AuthLocalProps = {
  onAuthenticated?: () => void
}

export function AuthLocal({onAuthenticated}: AuthLocalProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const {bioStatus} = useBiometrics()
  const [authInProgress, setAuthInProgress] = useState(bioStatus)

  const [loading, setLoading] = useState(false)
  const [wrongPin, setWrongPin] = useState(false)
  const [confirmPin, setConfirmPin] = useState<string>('')
  const {verificationPin} = useUserAuthenticateStore()

  const userProfile = userStore.getState().userProfile
  const handleAuthenticate = useCallback(async () => {
    setAuthInProgress(true)
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with biometrics',
        disableDeviceFallback: true,
        cancelLabel: 'Cancel',
        fallbackLabel: '',
      })

      if (result.success) {
        setLoading(true)
        setAuthInProgress(false)
        timeoutRef.current = setTimeout(() => {
          setLoading(false)
          onAuthenticated?.()
        }, 3000)
      } else {
        if (!!result?.error && result?.error === 'user_cancel') {
          setAuthInProgress(false)
        }
      }
    } catch (_) {
      setAuthInProgress(false)
    }
  }, [onAuthenticated])

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
        setLoading(true)
        timeoutRef.current = setTimeout(() => {
          setLoading(false)
          onAuthenticated?.()
        }, 3000)
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
  }, [confirmPin, onAuthenticated, verificationPin])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (authInProgress) {
    return (
      <View style={tw`absolute top-0 right-0 bottom-0 left-0 z-50 flex-1 p-8 gap-sp16 bg-white`}>
        <BlurView intensity={Platform.OS === 'ios' ? 50 : 100} tint="dark" style={StyleSheet.absoluteFill} />
      </View>
    )
  }

  if (loading) return <LoadingScreen loading={loading} />

  return (
    <View style={tw`absolute top-0 right-0 bottom-0 left-0 z-50 flex-1 gap-sp16 bg-white`}>
      <TopIndicatorAvoidingView />
      <View style={tw`flex-1`}>
        {/* Welcome */}
        <View style={tw`z-10`}>
          <View style={tw`items-center`}>
            <Image source={require('@/assets/images/logo.png')} style={tw`w-w152 h-h40 my-sp56`} resizeMode="contain" />
            <Typography weight="regular">{`Welcome back, ${userProfile?.firstName}`}</Typography>
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
              {`Incorrect PIN. Try again.`}
            </Typography>
          </View>
        )}
      </View>

      <View style={tw`flex-1`}>
        <Keypad onKeyPress={handleKeyPress} showForgotPin allowBiometric={bioStatus} />
      </View>
      <BottomIndicatorAvoidingView number={2} />
    </View>
  )
}
