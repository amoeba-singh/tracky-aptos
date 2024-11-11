import Diet from "@/lib/database/models/diet-model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { food_id } = await params;

  try {
    const food = await Diet.findById(food_id);
    if (!food) {
      return NextResponse.json({
        message: "Food not found",
        success: false,
      });
    }
    return NextResponse.json({
      success: true,
      data: food,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while adding the food to the meal.",
    });
  }
}
