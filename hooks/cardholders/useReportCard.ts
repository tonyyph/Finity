import { useState } from "react";

export const useReportCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleReportCard = async () => {
    setLoading(true);
    try {
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleReportCard,
    error
  };
};
