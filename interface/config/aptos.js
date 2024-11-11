"use client";
import { AptosClient } from "aptos";
import { createPoints } from "@/lib/api/points";
import { toast } from "react-hot-toast";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const MODULE_NAME = "user_points_v3"; // Updated to match contract
const NODE_URL = "https://fullnode.testnet.aptoslabs.com";

const client = new AptosClient(NODE_URL);

const fetchPoints = async (walletAddress) => {
  try {
    const resource = await client.getAccountResource(
      walletAddress,
      `${CONTRACT_ADDRESS}::${MODULE_NAME}::UserInfo`
    );
    return resource.data.points;
  } catch (error) {
    console.error("Failed to fetch points:", error);
    return 0;
  }
};

const handleInitialize = async (walletAddress, user_id) => {
  try {
    if (!walletAddress || !user_id) {
      throw new Error("Missing required parameters");
    }

    const payload = {
      type: "entry_function_payload",
      function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::initialize_user`,
      type_arguments: [],
      arguments: [Array.from(new TextEncoder().encode(user_id))],
    };

    const transaction = await window.aptos
      .signAndSubmitTransaction(payload)
      .catch((error) => {
        console.log(error);
        if (error.code === 4002) {
          toast.error("Transaction rejected by user");
          return null;
        }
        throw error;
      });

    if (!transaction) return -1;
    await client.waitForTransaction(transaction.hash);
    // const points = await fetchPoints(walletAddress);
    // await createPoints(user_id, points);
    toast.success("User initialized successfully!");
    // return points;
  } catch (error) {
    console.error("Failed to initialize user:", error);
    toast.error("Failed to initialize user");
    throw error;
  }
};

const increasePoints = async (walletAddress, amount, user_id) => {
  try {
    if (!walletAddress || !amount || amount <= 0) {
      throw new Error("Invalid parameters for increasing points");
    }

    const payload = {
      type: "entry_function_payload",
      function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::increase_points`,
      type_arguments: [],
      arguments: [Number(amount)], // Ensure amount is a number
    };

    const transaction = await window.aptos
      .signAndSubmitTransaction(payload)
      .catch((error) => {
        if (error.code === 4001) {
          toast.error("Transaction rejected by user");
          return null;
        }
        throw error;
      });

    if (!transaction) return -1;
    await client.waitForTransaction(transaction.hash);
    const points = await fetchPoints(walletAddress);
    if (user_id) {
      await createPoints(user_id, points);
    }
    toast.success("Points increased successfully!");
    return points;
  } catch (error) {
    console.error("Failed to increase points:", error);
    toast.error("Failed to increase points");
    throw error;
  }
};

const decreasePoints = async (walletAddress, amount, user_id) => {
  try {
    console.log("walletAddress", walletAddress);
    console.log("amount", amount);
    console.log("user_id", user_id);

    const points = await fetchPoints(walletAddress);
    if (points < amount) {
      toast.error("Insufficient points");
      return -1;
    }

    if (!walletAddress || !amount || amount <= 0) {
      toast.error("Go to Profile and connect your wallet");
      return -1;
    }

    const payload = {
      type: "entry_function_payload",
      function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::decrease_points`,
      type_arguments: [],
      arguments: [Number(amount)], // Ensure amount is a number
    };

    const transaction = await window.aptos
      .signAndSubmitTransaction(payload)
      .catch((error) => {
        if (error.code === 4001) {
          return null;
        }
        throw error;
      });

    if (!transaction) return -1;

    await client.waitForTransaction(transaction.hash);
    const updated_points = await fetchPoints(walletAddress);

    if (user_id) {
      console.log("user_id", user_id);
      await createPoints(user_id, updated_points);
    }

    toast.success("Points deducted successfully!");
    return updated_points;
  } catch (error) {
    console.error("Failed to decrease points:", error);
    toast.error("Failed to decrease points");
    throw error;
  }
};

export { fetchPoints, handleInitialize, increasePoints, decreasePoints };
