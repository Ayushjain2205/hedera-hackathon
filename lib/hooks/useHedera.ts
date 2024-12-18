import { useState, useCallback } from "react";
import { HashConnect } from "hashconnect";
import { client } from "../hedera-client";

export function useHedera() {
  const [isConnected, setIsConnected] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);

  const connect = useCallback(async () => {
    try {
      const hashconnect = new HashConnect();
      const initData = await hashconnect.init({
        name: "KYAgent",
        description: "A Trust System for AI Agents",
        icon: "/KYAgent.svg",
      });

      await hashconnect.connectToLocalWallet();

      hashconnect.pairingEvent.once((pairingData) => {
        setIsConnected(true);
        setAccountId(pairingData.accountIds[0]);
      });

      return true;
    } catch (error) {
      console.error("Failed to connect:", error);
      return false;
    }
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setAccountId(null);
  }, []);

  return {
    isConnected,
    accountId,
    connect,
    disconnect,
    client,
  };
}
