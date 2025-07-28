/* eslint-disable react-hooks/exhaustive-deps */
import { DownloadIcon } from "@/assets/icons/DownloadIcon";
import { PDFSkeleton } from "@/components";
import { Header } from "@/components/ui/header";
import { ProgressBar } from "@/components/ui/progress";
import { useStatements } from "@/hooks";
import { copyFileToDownloadFolder, IS_IOS } from "@/lib/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import RNFS from "react-native-fs";
import Pdf from "react-native-pdf";
import Share from "react-native-share";

function PreviewStatementScreen() {
  const { title, type, year, month } = useLocalSearchParams();
  const { handleGenerateCardPDF, handleGeneratePointPDF, data } =
    useStatements();

  useEffect(() => {
    if (type === "card") {
      handleGenerateCardPDF({
        month: month?.toString(),
        year: year?.toString()
      });
    } else {
      handleGeneratePointPDF({
        month: month?.toString(),
        year: year?.toString()
      });
    }
  }, []);

  const { fileContents, fileDownloadName } = data || {};

  const base64String = fileContents as string;
  const source = {
    uri: `data:application/pdf;base64,${base64String}`,
    cache: true
  };

  const onDownload = async () => {
    if (!fileContents || !fileDownloadName) return;

    try {
      // Step 1: Define path to store the PDF
      const fileName = `${fileDownloadName}.pdf`;
      const filePath = `${RNFS.CachesDirectoryPath}/${fileName}`; // Use CachesDirectory for temporary files

      // Step 2: Write base64 content to a file
      await RNFS.writeFile(filePath, base64String, "base64");

      if (IS_IOS) {
        // Step 3 (iOS): Open share sheet
        await Share.open({
          url: `file://${filePath}`,
          type: "application/pdf",
          failOnCancel: false,
          title: "Chia sẻ file PDF"
        });
      } else {
        // Step 3 (Android): Copy to Download folder
        const destPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
        await RNFS.copyFile(filePath, destPath);

        // Optional: Show share sheet on Android too
        await Share.open({
          url: `file://${destPath}`,
          type: "application/pdf",
          failOnCancel: false
        });
      }
    } catch (error) {
      console.error("Failed to download or share PDF:", error);
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
      <ProgressBar completeAnimation={false} />
      {/* PDF Preview */}
      <Pdf
        source={source}
        trustAllCerts={false}
        enablePaging={true}
        enableAnnotationRendering={true}
        enableDoubleTapZoom={true}
        style={styles.pdf}
        renderActivityIndicator={() => <View />}
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
