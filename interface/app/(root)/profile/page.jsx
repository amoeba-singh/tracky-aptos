import { auth } from "@/auth";
import Leaderboard from "@/components/profile/leaderboard";
import WalletConnect from "@/components/wallet/walletConnect";
import Image from "next/image";
import React from "react";

const ProfilePage = async () => {
  const session = await auth();
  return (
    <div className="body ">
      <Image
        width={240}
        height={240}
        src={session?.user?.image}
        alt={session.user?.name}
        className="rounded-full border-2 border-primary cursor-pointer btn smooth-animation mt-4"
      />
      <h2 className="mt-4">{session?.user?.name}</h2>
      <WalletConnect session={session} />
      {/* Leader board */}
      <Leaderboard />
    </div>
  );
};

export default ProfilePage;
