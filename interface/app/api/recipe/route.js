import dbConnect from "@/lib/database/connection";
import Recipe from "@/lib/database/models/recipes-model";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect()
  const data = await req.json();
  const { user_id, recipe_name, image, content } = data;
  const recipe = new Recipe({
    user: user_id,
    recipe_name,
    image,
    content,
  });
  await recipe.save();

  return NextResponse.json({
    success: true,
    data: recipe,
    message: "Recipe created successfully",
  });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  await dbConnect();
  const recipes = await Recipe.find({
    recipe_name: { $regex: query, $options: "i" },
  }).populate("user");

  return NextResponse.json({
    success: true,
    data: recipes,
  });
}

export async function PUT(req) {
  const data = await req.json();

  await dbConnect();
  const { recipe_id } = data;

  const recipe = await Recipe.findById(recipe_id);

  if (!recipe) {
    return NextResponse.json({
      success: false,
      message: "Recipe not found",
    });
  }

  return NextResponse.json({
    success: true,
    data: recipe,
  });
}
