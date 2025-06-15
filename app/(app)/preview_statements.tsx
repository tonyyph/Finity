import { DownloadIcon } from "@/assets/icons/DownloadIcon";
import Header from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import { copyFileToDownloadFolder, IS_IOS } from "@/lib/utils";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, StyleSheet, View } from "react-native";
import RNFS from "react-native-fs";
import Pdf from "react-native-pdf";
import Share from "react-native-share";

function PreviewStatementScreen() {
  const { title, fileContent, fileDownloadName } = useLocalSearchParams();
  const base64String: string = fileContent as string;

  const source = {
    uri: `data:application/pdf;base64,${base64String}`,
    cache: true
  };

  const onDownload = async () => {
    try {
      if (source.uri) {
        const fileName = fileDownloadName as string;
        const tempPath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
        const downloadOptions = {
          fromUrl: source.uri,
          toFile: tempPath
        };
        await RNFS.downloadFile(downloadOptions).promise;
        const filePath = IS_IOS ? tempPath : `file://${tempPath}`;
        if (!IS_IOS) {
          await copyFileToDownloadFolder(filePath);
        }
        const shareOptions = {
          title: "download pdf",
          url: filePath
        };
        await Share.open(shareOptions);
      } else {
        // console.log('error');
      }
    } catch (error) {
      console.log("Download error", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        onBack={router.back}
        title={title as string}
        icon={DownloadIcon}
        onRightFunction={onDownload}
      />
      <ProgressBar completeAnimation />
      {/* PDF Preview */}
      <Pdf
        source={source}
        trustAllCerts={false}
        enablePaging={true}
        enableAnnotationRendering={true}
        enableDoubleTapZoom={true}
        onError={(error: any) => {
          console.log(error);
        }}
        style={styles.pdf}
      />
      <View className="flex-[0.15]" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pdf: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1
  }
});

export default PreviewStatementScreen;
