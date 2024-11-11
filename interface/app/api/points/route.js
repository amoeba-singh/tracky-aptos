// app/api/points/route.js

import dbConnect from "@/lib/database/connection";
import Points from "@/lib/database/models/points-model";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await dbConnect();
  const data = await req.json();
  try {
    const { user_id, updated_points } = data;
    let points_details = await Points.findOne({ user: user_id });

    if (!points_details) {
      points_details = new Points({
        user: user_id,
        points: parseInt(updated_points),
      });
      return NextResponse.json({
        success: false,
        message: "Points not found",
      });
    }

    points_details.points = updated_points;
    await points_details.save();

    return NextResponse.json({
      success: true,
      data: points_details,
      message: "Points added successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to add points",
    });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    const { user_id } = data;

    const points_details = await Points.findOne({ user: user_id });

    return NextResponse.json({
      success: true,
      data: points_details,
      message: "Points Fetched successfully",
    });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create points",
    });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const points = await Points.find().sort({ points: -1 }).populate("user");
    if (!points) {
      return NextResponse.json({
        message: "Points not found",
        success: false,
      });
    }
    return NextResponse.json({
      success: true,
      data: points,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch points",
    });
  }
}
