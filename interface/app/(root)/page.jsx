// src/app/page.js or your main page
"use client";

import { PointsManagement } from "@/components/wallet/PointsManagement";
import { setWalletAddress } from "@/lib/redux/slices/wallet";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FeatureCard = ({ label, description }) => {
  return (
    <div className="bg-primary/50 p-4 rounded-lg ">
      <h2 className="text-white">{label}</h2>
      <p>{description}</p>
    </div>
  );
};
export default function Home() {
  const walletObj = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  const features = [
    {
      label: "Track your habits",
      description: "Monitor and improve your daily habits. 📊",
    },
    {
      label: "Track your Nutritional intake",
      description: "Keep a log of your meals and stay healthy. 🍎",
    },
    {
      label: "Leaderboard",
      description: "Compete with others and stay motivated. 🏆",
    },
    {
      label: "Recipes",
      description: "Discover and try new healthy recipes. 🍳",
    },
  ];

  useEffect(() => {
    checkConnection();
  }, []);

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
  return (
    <main className="body px-20">
      <div className="min-h-[300px] w-full flex items-center justify-center flex-col gap-4">
        <h1 className="text-6xl text-primary">Tracky</h1>
        <h2 className="text-center">
          Track your habit and Nutritional intake and <br />
          take control of you life
        </h2>
      </div>

      <div className="">
        <h1 className="text-center text-primary/50">Features Offered</h1>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </main>
  );
}
