import {scale, tw} from '@/utils'
import LottieView from 'lottie-react-native'
import {Modal, View} from 'react-native'

export function LoadingScreen({loading = false}: {loading: boolean}) {
  return (
    <Modal visible={loading} animationType="fade" transparent>
      <View style={tw`flex-1 justify-center bg-white items-center`}>
        <LottieView
          style={{width: scale(300), height: scale(300)}}
          source={require('@/assets/json/loader.json')}
          resizeMode="contain"
          speed={1}
          autoPlay
          loop
        />
      </View>
    </Modal>
  )
}
