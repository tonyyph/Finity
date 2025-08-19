import {Header, ProgressBar} from '@/components'
import {tw} from '@/utils'
import {router, useLocalSearchParams} from 'expo-router'
import {View} from 'react-native'
import {WebView} from 'react-native-webview'

export default function UnAuthenticatedWebViewScreen() {
  const {title, webLink} = useLocalSearchParams()

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onBack={router.back} title={String(title)} />

      <ProgressBar completeAnimation={true} />

      <WebView source={{uri: String(webLink)}} style={{flex: 1}} javaScriptEnabled={true} domStorageEnabled={true} startInLoadingState />
    </View>
  )
}
