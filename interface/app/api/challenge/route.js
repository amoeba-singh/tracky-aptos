import ChallengeModel from "@/lib/database/models/challenge-model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const { challenge_name, tasks, user_id } = data;
  //   const { user } = req.session;
  
  const curr_date = new Date();
  curr_date.setHours(0, 0, 0, 0);

  const newChallenge = new ChallengeModel({
    owner: user_id,
    challenge_name,
    tasks,
    created_at: curr_date.getTime(),
  });


  try {
    await newChallenge.save();

    return NextResponse.json({
      success: true,
      data: newChallenge,
      message: "Challenge created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to create challenge",
    });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  try {
    const challenges = await ChallengeModel.find({ owner: user_id });
    return NextResponse.json({
      success: true,
      data: challenges,
      message: "Challenges fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch challenges",
    });
  }
}
