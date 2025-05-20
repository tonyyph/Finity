import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export type NotificationItem = {
  id: string;
  date: string;
  points: number;
  sender: string;
  read: boolean;
  emailAddress: string;
  phoneNumber: string;
};

const mockData: NotificationItem[] = [
  {
    id: "1",
    date: "Jan 30, 2025",
    points: 120,
    sender: "Katelyn Jocson",
    emailAddress: "katelyn.jocson@business.co.uk",
    phoneNumber: "0123456789",
    read: false
  },
  {
    id: "2",
    date: "Jan 15, 2025",
    points: 150,
    sender: "Katelyn Jocson",
    emailAddress: "katelyn.jocson@business.co.uk",
    phoneNumber: "0123456788",
    read: false
  },
  {
    id: "3",
    date: "Dec 23, 2025",
    points: 110,
    sender: "Katelyn Jocson",
    emailAddress: "katelyn.jocson@business.co.uk",
    phoneNumber: "0123456787",
    read: false
  },
  {
    id: "4",
    date: "Nov 01, 2024",
    points: 1000,
    sender: "Katelyn Jocson",
    emailAddress: "katelyn.jocson@business.co.uk",
    phoneNumber: "0123456786",
    read: true
  },
  {
    id: "5",
    date: "Oct 16, 2024",
    points: 50,
    sender: "Lauren Uy",
    emailAddress: "lauren.uy@business.co.uk",
    phoneNumber: "0123456785",
    read: true
  }
];

export const useNotification = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<NotificationItem[]>([]);

  const fetchNotifications = async () => {
    try {
      //   const { data: session } = await getCardHolderCurrent();
      //   if (session) {
      //     setData(session);
      //     setIsFreezeCard(session?.cardStatus === 3);
      //     setCardStatus(session?.cardStatus);
      //   }
    } catch (error) {
      setLoading(false);
      setError((error as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loading && fetchNotifications();
  }, [loading]);

  return {
    notifications: data,
    loading,
    error
  };
};
