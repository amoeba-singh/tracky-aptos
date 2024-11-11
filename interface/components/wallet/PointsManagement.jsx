// src/components/PointsManagement.jsx
"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AptosClient, Types } from "aptos";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const MODULE_NAME = process.env.NEXT_PUBLIC_MODULE_NAME;
const NODE_URL = "https://fullnode.testnet.aptoslabs.com";

export const PointsManagement = () => {
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(0);
  const walletAddress = useSelector((state) => state.wallet.address);
  const client = new AptosClient(NODE_URL);

  useEffect(() => {
    if (walletAddress) {
      fetchPoints();
    }
  }, [walletAddress]);

  const fetchPoints = async () => {
    try {
      const resource = await client.getAccountResource(
        walletAddress,
        `${CONTRACT_ADDRESS}::${MODULE_NAME}::UserInfo`
      );
      setPoints(resource.data.points);
    } catch (error) {
      console.error("Failed to fetch points:", error);
    }
  };

  const handleInitialize = async () => {
    try {
      setLoading(true);
      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::initialize_user`,
        type_arguments: [],
        arguments: [Array.from(new TextEncoder().encode(walletAddress))],
      };

      const transaction = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(transaction.hash);
      await fetchPoints();
      alert("User initialized successfully!");
    } catch (error) {
      console.error("Failed to initialize:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPoints = async () => {
    try {
      setLoading(true);
      const payload = {
        type: "entry_function_payload",
        function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::increment_points`,
        type_arguments: [],
        arguments: [10],
      };

      const transaction = await window.aptos.signAndSubmitTransaction(payload);
      await client.waitForTransaction(transaction.hash);
      await fetchPoints();
      alert("Points added successfully!");
    } catch (error) {
      console.error("Failed to add points:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Rest of the UI code remains the same
  return (
    <div className="p-4 border rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Points Management</h2>

      {!walletAddress ? (
        <div className="text-center text-gray-600">
          Please connect your wallet first
        </div>
      ) : (
        <div className="space-y-6">
          {/* Points Display */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium">
                Current Points: {points}
              </div>
              <button
                onClick={fetchPoints}
                className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                ↻ Refresh
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleInitialize}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md
                     hover:bg-blue-600 disabled:bg-gray-400 
                     disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Initializing...
                </span>
              ) : (
                "Initialize User"
              )}
            </button>

            <button
              onClick={handleAddPoints}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md
                     hover:bg-green-600 disabled:bg-gray-400 
                     disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Adding Points...
                </span>
              ) : (
                "Add 10 Points"
              )}
            </button>
          </div>

          {/* Transaction Status */}
          {loading && (
            <div className="text-center text-gray-600 animate-pulse">
              Processing transaction... Please wait
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PointsManagement;
