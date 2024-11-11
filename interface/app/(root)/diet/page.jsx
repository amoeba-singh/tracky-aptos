import { auth } from "@/auth";
import DietContainer from "@/components/diet/diet-container";
import React from "react";

const DietPage = async () => {
  const session = await auth();
  return (
    <div className="min-w-full px-16">
      <DietContainer session={session} />
    </div>
  );
};

export default DietPage;
