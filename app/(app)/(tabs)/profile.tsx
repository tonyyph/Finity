import {LogoMark} from '@/assets'
import {
  AlertIcon,
  ArrowRightIcon,
  BellIcon,
  BottomSheet,
  Button,
  CashOutIcon,
  HelpIcon,
  LogOutIcon,
  MenuItem,
  OneUserIcon,
  OurAgreementIcon,
  ProfileCard,
  ProtectIcon,
  Separator,
  SetLocalAuth,
  Switch,
  TermIcon,
  Text,
  toast,
  Typography,
} from '@/components'
import {useUserSettingsStore} from '@/stores'
import {scale, SCREEN_WIDTH, TopIndicatorAvoidingView, tw} from '@/utils'
import {useAuth} from '@clerk/clerk-expo'
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet'
import * as Application from 'expo-application'
import * as Haptics from 'expo-haptics'
import * as Notifications from 'expo-notifications'
import {Link, router} from 'expo-router'
import * as Updates from 'expo-updates'
import LottieView from 'lottie-react-native'
import {XIcon} from 'lucide-react-native'
import {useRef} from 'react'
import {Image, ScrollView, TouchableOpacity, View} from 'react-native'

export default function ProfileScreen() {
  const {signOut} = useAuth()
  const sheetRef = useRef<BottomSheetModal>(null)
  const sheetSignOutRef = useRef<BottomSheetModal>(null)
  const toastShownRef = useRef(false)

  const {setEnabledPushNotifications, enabledPushNotifications} = useUserSettingsStore()

  async function handleCopyVersion() {
    if (toastShownRef.current) return

    toastShownRef.current = true
    toast.success(`Copied version to clipboard ${Application.nativeApplicationVersion} - ${Updates.updateId ?? 'Embedded'}`, {
      icon: <AlertIcon />,
      duration: 3000,
      width: SCREEN_WIDTH - scale(28),
    })
    setTimeout(() => {
      toastShownRef.current = false
    }, 3000)
  }

  async function handleLogout() {
    await signOut()
    sheetSignOutRef.current?.close()
  }

  const handleToHelpCentre = () => {
    router.push({
      pathname: '/web-view',
      params: {
        title: 'Help centre',
        webLink: 'https://support.finity.co.uk/en/',
      },
    })
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <TopIndicatorAvoidingView />
      <Typography type="hs" weight="semibold" style={tw`p-sp12`}>
        {'Profile'}
      </Typography>
      <ScrollView contentContainerStyle={tw`pb-sp16 px-sp16 gap-sp12`} showsVerticalScrollIndicator={false} style={tw`bg-white`}>
        <ProfileCard />
        <View style={tw`gap-sp4`}>
          <Link href="/profile-edit" asChild>
            <MenuItem label={`Personal information`} icon={OneUserIcon} rightSection={<ArrowRightIcon />} />
          </Link>
          <View style={tw`h-h1 bg-[#E5E5E5] mt-sp8`} />
        </View>
        <View style={tw`gap-sp4`}>
          <MenuItem
            label={`Statements`}
            icon={TermIcon}
            onPress={() => {
              sheetRef?.current?.present()
            }}
            rightSection={<ArrowRightIcon />}
          />
          <Link href="/pin-current" asChild>
            <MenuItem label={`Change PIN`} icon={ProtectIcon} rightSection={<ArrowRightIcon />} />
          </Link>
          {/* Biometrics enabled ?? */}
          <SetLocalAuth />

          <MenuItem
            label={`Push notification`}
            subLabel="Notification for points received"
            icon={BellIcon}
            rightSection={
              <Switch
                checked={enabledPushNotifications}
                onCheckedChange={async checked => {
                  Haptics.selectionAsync()

                  if (checked) {
                    const {status: existingStatus} = await Notifications.getPermissionsAsync()
                    let finalStatus = existingStatus
                    if (existingStatus !== 'granted') {
                      const {status} = await Notifications.requestPermissionsAsync()
                      finalStatus = status
                    }
                    if (finalStatus !== 'granted') {
                      setEnabledPushNotifications(false)
                      return
                    }
                  }
                  setEnabledPushNotifications(checked)
                }}
              />
            }
          />
          <View style={tw`h-h1 bg-[#E5E5E5] mt-sp8`} />
        </View>
        <View style={tw`gap-sp4`}>
          <Link href="/cash-out-point" asChild>
            <MenuItem label={`Cash out points`} icon={CashOutIcon} rightSection={<ArrowRightIcon />} />
          </Link>
          <MenuItem label={`Help centre`} icon={HelpIcon} onPress={handleToHelpCentre} rightSection={<ArrowRightIcon />} />
          <MenuItem
            label={`Our agreements`}
            icon={OurAgreementIcon}
            rightSection={<ArrowRightIcon />}
            onPress={() => {
              router.push({
                pathname: '/our-agreement',
              })
            }}
          />
          <MenuItem
            label={`Sign out`}
            icon={LogOutIcon}
            onPress={() => {
              sheetSignOutRef.current?.present()
            }}
          />
        </View>
        <TouchableOpacity activeOpacity={0.8} style={tw`items-center gap-sp12`} onLongPress={handleCopyVersion}>
          <Image source={LogoMark} style={tw`mx-auto h-h64 w-w64 rounded-full`} />
          <Text style={tw`text-black text-bs`}>
            {`App version - `}
            {Application.nativeApplicationVersion}
            {` - will be remove soon`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomSheet ref={sheetSignOutRef} index={0} snapPoints={['41%']}>
        <BottomSheetView style={tw`bg-white rounded-t-br16`}>
          <View style={tw`p-sp12`}>
            <View style={tw`items-center mb-sp20 px-sp16 pb-sp16`}>
              <LottieView style={tw`w-w120 h-h120`} source={require('@/assets/json/logout.json')} autoPlay loop />
              <Typography type="hs" weight="semibold">
                Ready to Leave?
              </Typography>
              <Typography textColor="#404040" weight="regular" style={tw`text-center mt-sp16`}>
                Are you sure you want to log out? You will need to log in again to access your account.
              </Typography>
            </View>
            <Button.Primary title={`Logout`} onPress={handleLogout} style={tw`my-sp16`} />
          </View>
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet ref={sheetRef} index={0} snapPoints={['30%']}>
        <BottomSheetView style={tw`min-h-[50%] bg-white rounded-t-br16`}>
          <View style={tw`flex-row justify-between gap-sp12 p-sp12 items-center`}>
            <View style={tw`h-h24 w-w24`} />
            <Typography type="bl" weight="semibold">
              {`Statements`}
            </Typography>
            <TouchableOpacity style={tw`flex-shrink items-center`} onPress={() => sheetRef.current?.close()}>
              <XIcon style={tw`h-h24 w-w24 text-black`} />
            </TouchableOpacity>
          </View>

          <View style={tw`p-sp12`}>
            <MenuItem
              label={`Card statements`}
              onPress={() => {
                sheetRef.current?.close()
                router.push({
                  pathname: '/statements',
                  params: {title: 'Card statements', type: 'card'},
                })
              }}
              style={tw`py-sp12`}
            />
            <Separator style={tw`my-sp12`} />

            <MenuItem
              label={`Point statements`}
              onPress={() => {
                sheetRef.current?.close()
                router.push({
                  pathname: '/statements',
                  params: {title: 'Point statements', type: 'points'},
                })
              }}
              style={tw`py-sp12`}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}
