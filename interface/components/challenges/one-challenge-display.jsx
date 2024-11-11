"use client";
import React, { useEffect } from "react";
import {
  getOneChallenge,
  markCompletedTask,
  rewardChallenge,
} from "../../lib/api/challenge";
import { handleAddPoints, increasePoints } from "@/config/aptos";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const OneChallengeDisplay = ({ session, activeChallengeId = "" }) => {
  const walletObj = useSelector((state) => state.wallet);

  const [challenge, setChallenge] = React.useState(null);
  const [streak, setStreak] = React.useState(0);
  const [todayStreak, setTodayStreak] = React.useState(0);

  useEffect(() => {
    getOneChallenge(session.user.id, activeChallengeId).then((res) => {
      setChallenge(res.data.today_challenge);
      setStreak(res.data.streak);

      if (res.data.today_challenge?.completed) {
        setTodayStreak(1);
      }
    });
  }, [activeChallengeId]);
  if (!activeChallengeId || !challenge) return <div>Select a challenge</div>;
  return (
    <div>
      <span className="flex w-full justify-between items-center">
        <h2>Challenge</h2>
        <p>️‍🔥{streak + todayStreak}</p>
      </span>
      <div className="flex flex-col gap-2 mt-4">
        {challenge &&
          challenge.completed_tasks.length > 0 &&
          challenge.completed_tasks?.map((task, index) => (
            <div
              key={index}
              className={`flex items-center justify-between`}
              onClick={() => {
                markCompletedTask(
                  session.user.id,
                  activeChallengeId,
                  task.task_name
                ).then((res) => {
                  if (res.data.completed) {
                    setTodayStreak(1);
                    if (!res.data.is_rewarded) {
                      increasePoints(
                        walletObj.address,
                        1000,
                        session?.user?.id
                      ).then((points) => {
                        if (points === -1) {
                          return toast.error("Transaction failed");
                        }else{
                          rewardChallenge(
                            session?.user?.id,
                            activeChallengeId
                          ).then(() => {
                            toast.success("Challenge completed and rewarded");
                          });
                        }
                      });
                    }
                  } else {
                    setTodayStreak(0);
                  }
                  setChallenge(res.data);
                });
              }}
            >
              <span>{task.task_name}</span>
              <span>{task.completed ? "✅" : "◻️"}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OneChallengeDisplay;
