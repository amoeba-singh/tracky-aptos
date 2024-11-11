"use client";
import { getAllChallenges } from "@/lib/api/challenge";
import React, { useEffect, useState } from "react";
import OneChallengeDisplay from "./one-challenge-display";
import { useDispatch, useSelector } from "react-redux";
import { setWalletAddress } from "@/lib/redux/slices/wallet";

const ChallengeContainer = ({ session }) => {
  const walletObj = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const [activeChallengeId, setActiveChallengeId] = useState("");

  const [challengeList, setChallengeList] = useState([]);

  useEffect(() => {
    getAllChallenges(session.user.id).then((res) => {
      setChallengeList(res?.data);
      // setActiveChallengeId(res?.data[0]?._id);
    });

    checkConnection();
  }, [session.user.id]);

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
    <div className="min-h-[400px] grid md:grid-cols-2 gap-2 ">
      <div className="flex flex-col gap-2 col-span-1 border-r border-primary">
        {challengeList.map((challenge) => {
          return (
            <p
              className="px-4 py-2 hover:border hover:shadow-md smooth-animation rounded-md"
              onClick={() => {
                setActiveChallengeId(challenge._id);
              }}
              key={challenge._id}
            >
              {challenge.challenge_name}
            </p>
          );
        })}
      </div>
      <OneChallengeDisplay
        session={session}
        activeChallengeId={activeChallengeId}
      />
    </div>
  );
};

export default ChallengeContainer;
