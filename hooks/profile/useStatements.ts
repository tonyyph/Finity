import { generateCardStatements, generatePointStatements } from "@/api";
import { convertMonth } from "@/utils";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useState } from "react";

export const useStatements = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GenerateFileResponse>();
  const [error, setError] = useState("");
  const handleGeneratePointPDF = async ({ month, year }: StatementProps) => {
    setLoading(true);

    try {
      const { data: session } = await generatePointStatements({
        month: convertMonth(month),
        year: year
      });

      setData(session);

      router.navigate({
        pathname: "./preview-statements",
        params: {
          title: `${month} ${year}`,
          fileContent: session?.fileContents,
          fileDownloadName: session?.fileDownloadName
        }
      });
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCardPDF = async ({ month, year }: StatementProps) => {
    setLoading(true);

    try {
      const { data: session } = await generateCardStatements({
        month: convertMonth(month),
        year: year
      });

      router.navigate({
        pathname: "./preview-statements",
        params: {
          title: `${month} ${year}`,
          fileContent: session.fileContents,
          fileDownloadName: session.fileDownloadName
        }
      });
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToPreview = ({ month, year, type }: StatementProps) => {
    router.navigate({
      pathname: "./preview-statements",
      params: {
        title: `${month} ${year}`,
        month: month,
        year: year,
        type
      }
    });
  };

  return {
    loading: loading,
    handleGeneratePointPDF,
    handleGenerateCardPDF,
    error,
    data,
    navigateToPreview
  };
};
