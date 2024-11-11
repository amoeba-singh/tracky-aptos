"use client";
import { fetchPoints, handleInitialize } from "@/config/aptos";
import { setWalletAddress } from "@/lib/redux/slices/wallet";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const MODULE_NAME = process.env.NEXT_PUBLIC_MODULE_NAME;

const WalletConnect = ({ session }) => {
  const router = useRouter();
  const walletObj = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(0);

  if (!session?.user) router.push("/");
  useEffect(() => {
    // Initial check
    checkConnection();
    if (walletObj.address) {
      fetchPoints(walletObj.address).then((points) => setPoints(points));
      setWalletConnected(true);
    }
  }, [session?.user?.id, walletObj]);

  const checkConnection = async () => {
    try {
      if (typeof window.aptos !== "undefined") {
        const isConnected = await window.aptos.isConnected();
        if (isConnected) {
          const acc = await window.aptos.account();
          dispatch(setWalletAddress(acc.address));
        }
      }
    } catch (error) {
      console.error("Connection check failed:", error);
    }
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      if (typeof window.aptos !== "undefined") {
        const response = await window.aptos.connect();
        if (walletObj.address) {
          const points = await handleInitialize(
            walletObj.address,
            session?.user?.id
          );
          setPoints(points);
          setWalletConnected(true);
          return;
        }
        handleInitialize(response.address, session?.user?.id).then((points) =>
          setPoints(points)
        );
        dispatch(setWalletAddress(response.address));
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
        setWalletConnected(false);
        dispatch(setWalletAddress(""));
      }
    } catch (error) {
      console.error("Failed to disconnect:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex  flex-col items-center justify-center ">
      <div className="mb-4">
        <span
          className={`inline-block w-3 h-3 rounded-full mr-2 ${
            walletConnected ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        Status: Wallet {walletConnected ? "Connected" : "Disconnected"}
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
          <p className="mb-4">Wallet Address: {walletObj.address}</p>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Disconnect
          </button>
          <p
            onClick={() => {
              fetchPoints(walletObj.address).then((points) =>
                setPoints(points)
              );
            }}
          >
            {points} 🪙
          </p>
        </div>
      )}
    </main>
  );
};

export default WalletConnect;
