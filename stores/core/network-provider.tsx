import NetInfo from "@react-native-community/netinfo";
import React, { createContext, useContext, useEffect, useState } from "react";

const NetworkContext = createContext<{ isConnected: boolean }>({
  isConnected: true
});

export const useNetwork = () => useContext(NetworkContext);

export const NetworkProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};
