"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const RecipeCard = ({ recipe }) => {
  const router = useRouter();
  return (
    <div
      className="w-full border col-span-1 flex items-center flex-col justify-center p-4 hover:shadow-lg rounded-md cursor-pointer smooth-animation"
      onClick={() => {
        router.push(`/recipes/${recipe._id}`);
      }}
    >
      <Image
        src={recipe.image}
        width={100}
        height={100}
        alt={recipe.recipe_name}
        className="object-cover size-52 overflow-hidden"
      />
      <p className="font-semibold line-clamp-1">{recipe.recipe_name}</p>
      <span className="flex items-center gap-2 justify-center">
        <Image
          src={recipe.user.image}
          width={40}
          height={40}
          alt={recipe.recipe_name}
          className="object-cover size-10 overflow-hidden border-primary rounded-full border-2"
        />
        <p className="text-sm line-clamp-1">{recipe.user.name}</p>
      </span>
    </div>
  );
};

export default RecipeCard;
