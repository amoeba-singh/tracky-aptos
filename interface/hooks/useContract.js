"use client";
// src/hooks/useContract.js
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Types } from "aptos";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const MODULE_NAME = process.env.NEXT_PUBLIC_MODULE_NAME;

export const useContract = () => {
  const { account, signAndSubmitTransaction } = useWallet();

  const initializeUser = async (mongoDbId) => {
    try {
      if (!account?.address) throw new Error("Wallet not connected");
      const payload = {
        type: "entry_function_payload",
        function: `${MODULE_ADDRESS}::${MODULE_NAME}::${functionName}`,
        type_arguments: [],
        arguments: [Array.from(new TextEncoder().encode(mongoDbId))],
      };

      const response = await signAndSubmitTransaction({ payload });
      return response;
    } catch (error) {
      console.error("Initialize user error:", error);
      throw error;
    }
  };

  const incrementPoints = async (pointsToAdd) => {
    try {
      if (!account?.address) throw new Error("Wallet not connected");

      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::increment_points`,
        type_arguments: [],
        arguments: [pointsToAdd],
      };

      const response = await signAndSubmitTransaction({ payload });
      return response;
    } catch (error) {
      console.error("Increment points error:", error);
      throw error;
    }
  };

  const getPoints = async (address) => {
    try {
      const response = await fetch(
        `https://fullnode.testnet.aptoslabs.com/v1/accounts/${address}/resource/${CONTRACT_ADDRESS}::${MODULE_NAME}::UserInfo`
      );
      const data = await response.json();
      return data.data.points;
    } catch (error) {
      console.error("Get points error:", error);
      throw error;
    }
  };

  return {
    initializeUser,
    incrementPoints,
    getPoints,
    isConnected: !!account?.address,
  };
};
