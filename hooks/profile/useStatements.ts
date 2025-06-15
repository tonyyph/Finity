import { generateCardStatements, generatePointStatements } from "@/api";
import { useLoading } from "@/stores";
import { convertMonth } from "@/utils";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useState } from "react";

export const useStatements = () => {
  const [loading, setLoading] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const [error, setError] = useState("");
  const handleGeneratePointPDF = async ({ month, year }: StatementProps) => {
    setLoading(true);
    startLoading();

    try {
      const { data: session } = await generatePointStatements({
        month: convertMonth(month),
        year: year
      });

      if (session) {
        stopLoading(() => {
          router.navigate({
            pathname: "./preview_statements",
            params: {
              title: `${month} ${year}`,
              fileContent: session?.fileContents,
              fileDownloadName: session?.fileDownloadName
            }
          });
        });
      } else {
        stopLoading();
      }
    } catch (error) {
      setError((error as AxiosError).message);
      stopLoading();
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCardPDF = async ({ month, year }: StatementProps) => {
    setLoading(true);
    startLoading();

    try {
      const { data: session } = await generateCardStatements({
        month: convertMonth(month),
        year: year
      });

      if (session) {
        stopLoading(() => {
          router.navigate({
            pathname: "./preview_statements",
            params: {
              title: `${month} ${year}`,
              fileContent: session.fileContents,
              fileDownloadName: session.fileDownloadName
            }
          });
        });
      } else {
        stopLoading();
      }
    } catch (error) {
      setError((error as AxiosError).message);
      stopLoading();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading: loading,
    handleGeneratePointPDF,
    handleGenerateCardPDF,
    error
  };
};
