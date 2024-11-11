"use client";
import FormField from "@/components/custom/FormField";
import RecipeCard from "@/components/recipe/recipe-card";
import { getRecipes } from "@/lib/api/recipe";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RecipesPage = () => {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [recipes, setRecipes] = React.useState(null);

  useEffect(() => {
    getRecipes("").then((response) => {
      console.log("response.data => ", response.data);
      setRecipes(response.data);
    });
  }, []);

  if (!recipes) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex gap-2 items-center justify-center mt-8">
        <FormField
          type={"text"}
          handleChange={(value) => {
            setQuery(value);
          }}
          label={"Testing"}
          defaultValue={"he"}
        />
        <span
          className="btn border p-2 rounded-md"
          onClick={() => {
            router.push(`/recipes/search?query=${query}`);
          }}
        >
          Search
        </span>
      </div>

      <div className=" w-screen px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-4 gap-2">
        {recipes &&
          recipes.map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe._id} />;
          })}
      </div>
    </div>
  );
};

export default RecipesPage;
