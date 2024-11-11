"use client";
import { getPoints } from "@/lib/api/points";
import Image from "next/image";
import React, { useEffect } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = React.useState([]);
  useEffect(() => {
    getPoints().then((res) => {
      console.log(res.data);
      setLeaderboard(res.data);
    });
  }, []);
  return (
    <div>
      <h1 className="text-center mb-4">Leader Board</h1>
      {leaderboard &&
        leaderboard.map((player) => (
          <div
            className="flex justify-between items-center w-[60svw] "
            key={player._id}
          >
            <span className="flex items-center gap-4">
              <Image
                src={player.user.image}
                width="50"
                height="50"
                alt="Player_image"
                className="rounded-full border-primary border-2 size-10"
              />

              <p>{player.user.name}</p>
            </span>
            <p>{player.points} 🪙</p>
          </div>
        ))}
    </div>
  );
};

export default Leaderboard;
