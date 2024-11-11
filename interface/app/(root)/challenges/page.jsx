import { auth } from "@/auth";
import ChallengeContainer from "@/components/challenges/challenge-container";
import CreateChallenge from "@/components/challenges/create-challenge";
import React from "react";

const ChallengePage = async () => {
  const session = await auth();
  return (
    <div className="px-16">
      <span className="w-full flex justify-between items-center my-4">
        <h2 className="w-full ">Your Challenges {session.user.name}</h2>
        <CreateChallenge session={session} />
      </span>

      <ChallengeContainer session={session} />
    </div>
  );
};

export default ChallengePage;
