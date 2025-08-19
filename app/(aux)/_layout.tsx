import {BackButton} from '@/components'
import {useColorPalette} from '@/hooks'
import {tw} from '@/utils'
import {Stack} from 'expo-router'
import {View} from 'react-native'

export default function AuxiliaryLayout() {
  const {getColor} = useColorPalette()

  return (
    <View style={tw`flex-1`}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor: getColor('--foreground'),
          headerShadowVisible: false,
          headerTitle: '',
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            color: getColor('--foreground'),
          },
          headerStyle: {
            backgroundColor: getColor('--background'),
          },
          headerLeft: () => <BackButton />,
        }}>
        <Stack.Screen
          name="privacy-policy"
          options={{
            presentation: 'modal',
            headerTitle: `Privacy Policy`,
          }}
        />
        <Stack.Screen
          name="login-error"
          options={{
            presentation: 'modal',
            headerTitle: `Login Error`,
          }}
        />
        <Stack.Screen
          name="terms-of-service"
          options={{
            presentation: 'modal',
            headerTitle: `Terms & Conditions`,
          }}
        />
        <Stack.Screen
          name="pin-forgot"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="success-2factor"
          options={{
            headerLeft: () => <BackButton />,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="un-auth-web-view"
          options={{
            headerLeft: () => <BackButton />,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="pin-success-2factor"
          options={{
            headerLeft: () => <BackButton />,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="pin-verify-2factor"
          options={{
            headerLeft: () => <BackButton />,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="pin-success"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="pin-change-success"
          options={{
            headerLeft: () => <BackButton />,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="pin-verify"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="pin-confirm"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="offline"
          options={{
            headerLeft: () => <BackButton />,
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  )
}
