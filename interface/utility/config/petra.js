"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);

  const checkConnection = async () => {
    try {
      if (typeof window.aptos !== "undefined") {
        const isConnected = await window.aptos.isConnected();
        if (isConnected) {
          const acc = await window.aptos.account();
          setAccount(acc.address);
          setWalletConnected(true);
        }
      }
    } catch (error) {
      console.error("Connection check failed:", error);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const connectWallet = async () => {
    try {
      setLoading(true);
      if (typeof window.aptos !== "undefined") {
        const response = await window.aptos.connect();
        setAccount(response.address);
        setWalletConnected(true);
      } else {
        alert("Please install Petra Wallet");
        window.open("https://petra.app/", "_blank");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const disconnectWallet = async () => {
    try {
      setLoading(true);
      if (typeof window.aptos !== "undefined") {
        await window.aptos.disconnect();
        setAccount("");
        setWalletConnected(false);
      }
    } catch (error) {
      console.error("Failed to disconnect:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mb-4">
        <span
          className={`inline-block w-3 h-3 rounded-full mr-2 ${
            walletConnected ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        Status: {walletConnected ? "Connected" : "Disconnected"}
      </div>

      {!walletConnected ? (
        <button
          onClick={connectWallet}
          disabled={loading}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex items-center`}
        >
          {loading ? (
            <>
              <span className="animate-spin mr-2">⌛</span>
              Connecting...
            </>
          ) : (
            "Connect Petra Wallet"
          )}
        </button>
      ) : (
        <div className="text-center">
          <p className="mb-4">Connected Address: {account}</p>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      )}
    </main>
  );
}
