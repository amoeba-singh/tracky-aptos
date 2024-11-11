import Diet from "@/lib/database/models/diet-model";
import { meal_data_preprocessing_for_get_meals } from "@/lib/utility/functions/diet";
import { NextResponse } from "next/server";

const fetchNutrientData = async (query) => {
  const res = await fetch(
    "https://api.calorieninjas.com/v1/nutrition?query=" + query,
    {
      headers: {
        "X-Api-Key": process.env.CALORIE_NINJA_API_KEY,
      },
    }
  );
  const data = await res.json();

  return data;
};

export async function POST(req) {
  const query_data = await req.json();
  const { user_id, name, serving_size_g, meal } = query_data;

  const date = new Date();
  date.setHours(0, 0, 0, 0);

  try {
    const data = await fetchNutrientData(name);
    if (!data.items.length) {
      return NextResponse.json({
        message: "Food not found",
        success: false,
      });
    }

    let nutrientData = data.items[0];

    const diet = new Diet({
      owner: user_id,
      meal,
      name: name,
      serving_size_g: serving_size_g,
      calories: (
        parseFloat(nutrientData.calories * serving_size_g) / 100
      ).toFixed(2),
      fat: (
        parseFloat(nutrientData.fat_total_g * serving_size_g) / 100
      ).toFixed(2),
      protein_g: (
        parseFloat(nutrientData.protein_g * serving_size_g) / 100
      ).toFixed(2),
      sodium_mg: (
        parseFloat(nutrientData.sodium_mg * serving_size_g) / 100
      ).toFixed(2),
      potassium_mg: (
        parseFloat(nutrientData.potassium_mg * serving_size_g) / 100
      ).toFixed(2),
      cholesterol_mg: (
        parseFloat(nutrientData.cholesterol_mg * serving_size_g) / 10
      ).toFixed(2),
      carbohydrates_total_g: (
        parseFloat(nutrientData.carbohydrates_total_g * serving_size_g) / 100
      ).toFixed(2),
      fiber_g: (
        parseFloat(nutrientData.fiber_g * serving_size_g) / 100
      ).toFixed(2),
      sugar_g: (
        parseFloat(nutrientData.sugar_g * serving_size_g) / 100
      ).toFixed(2),
      date: date.getTime(),
    });

    await diet.save();

    return NextResponse.json({
      success: true,
      message: "Food added to meal successfully.",
      data: diet,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while adding the food to the meal.",
    });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  const date = new Date();
  date.setHours(0, 0, 0, 0);

  try {
    const meals = await Diet.find({
      owner: user_id,
      date: date.getTime(),
    });

    let meal_data = meal_data_preprocessing_for_get_meals(meals);

    return NextResponse.json({
      success: true,
      message: "Meals fetched successfully",
      data: meal_data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch meals",
    });
  }
}
