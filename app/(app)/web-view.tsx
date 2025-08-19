import {Header, ProgressBar} from '@/components'
import {tw} from '@/utils'
import {router, useLocalSearchParams} from 'expo-router'
import {Dimensions, StyleSheet, View} from 'react-native'
import Pdf from 'react-native-pdf'
import {WebView} from 'react-native-webview'

export default function WebViewScreen() {
  const {title, webLink, pdfLink} = useLocalSearchParams()

  return (
    <View style={tw`flex-1 bg-white`}>
      <Header onBack={router.back} title={String(title)} />

      <ProgressBar />
      {pdfLink && (
        <Pdf
          source={{uri: String(pdfLink), cache: false}}
          trustAllCerts={false}
          enablePaging={true}
          enableAnnotationRendering={true}
          enableDoubleTapZoom={true}
          style={styles.pdf}
          renderActivityIndicator={() => <View />}
        />
      )}
      {webLink && <WebView source={{uri: String(webLink)}} style={{flex: 1}} javaScriptEnabled={true} domStorageEnabled={true} startInLoadingState />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
  },
})
