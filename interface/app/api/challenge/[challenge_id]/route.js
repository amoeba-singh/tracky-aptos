import { CompletedChallengeModel } from "@/lib/database/models/challenge-model";
import {
  create_obj_for_today_challenge,
  streak_calculation,
} from "@/lib/utility/functions/challenge";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { challenge_id } = await params;

  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  // const challenge_id = searchParams.get("challenge_id");

  // const { challenge_id = params;

  const date = new Date();
  date.setHours(0, 0, 0, 0);

  try {
    const completed_challenges = await CompletedChallengeModel.find({
      owner: user_id,
      challenge: challenge_id,
      date: { $lt: date },
    });

    let streak = streak_calculation(completed_challenges, date);

    let today_challenge = await CompletedChallengeModel.findOne({
      owner: user_id,
      challenge: challenge_id,
      date: date,
    });

    let today_challenge_obj = await create_obj_for_today_challenge(
      today_challenge,
      challenge_id,
      user_id,
      date
    );

    if (!today_challenge_obj.success) {
      return res.send({
        message: "Challenge not found",
        success: false,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        streak,
        today_challenge: today_challenge_obj.data,
      },
      message: "Challenge fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch challenge",
    });
  }
}

export async function PATCH(req, { params }) {
  const data = await req.json();
  const { challenge_id } = await params;

  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  const date = new Date();
  date.setHours(0, 0, 0, 0);
  try {
    const { task_name } = data;
    const completed_challenge = await CompletedChallengeModel.findOne({
      owner: user_id,
      challenge: challenge_id,
      date: date.getTime(),
    });

    if (!completed_challenge || completed_challenge.length === 0) {
      return res.send({
        message: "Challenge not found",
        status: 400,
      });
    }

    let completed_tasks = completed_challenge.completed_tasks;

    for (let i = 0; i < completed_tasks.length; i++) {
      if (completed_tasks[i].task_name === task_name) {
        completed_tasks[i].completed = !completed_tasks[i].completed;
        break;
      }
    }

    let check_if_complete_task_completed = true;
    for (let i = 0; i < completed_tasks.length; i++) {
      if (completed_tasks[i].completed === false) {
        check_if_complete_task_completed = false;
        break;
      }
    }

    completed_challenge.completed = check_if_complete_task_completed;

    await completed_challenge.save();

    return NextResponse.json({
      success: true,
      message: "Challenge updated successfully",
      data: completed_challenge,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to update challenge",
    });
  }
}

// Mark rewarded task as completed
export async function PUT(req, { params }) {
  const { challenge_id } = await params;

  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  const date = new Date();
  date.setHours(0, 0, 0, 0);
  try {
    const completed_challenge = await CompletedChallengeModel.findOne({
      owner: user_id,
      challenge: challenge_id,
      date: date.getTime(),
    });

    if (!completed_challenge || completed_challenge.length === 0) {
      return res.send({
        message: "Challenge not found",
        status: 400,
      });
    }

    completed_challenge.is_rewarded = true;

    await completed_challenge.save();

    return NextResponse.json({
      success: true,
      message: "Challenge rewarded successfully",
      data: completed_challenge,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to update challenge",
    });
  }
}
