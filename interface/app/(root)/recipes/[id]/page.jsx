"use client";
import { getRecipe } from "@/lib/api/recipe";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";

const RecipePage = () => {
  const params = useParams();
  const recipeId = params.id;
  const [recipe, setRecipe] = React.useState(null);

  useEffect(() => {
    getRecipe(recipeId).then((response) => {
      console.log(response.data);
      setRecipe(response.data);
    });
  }, [recipeId]);

  if (!recipe) return <div>Loading...</div>;
  return (
    <div>
      <div className="max-w-[300px] sm:max-w-[100%] sm:min-w-[100%]">
        {/* Banner Section */}
        <div className="min-w-full min-h-48 flex flex-col items-center sm:px-72 pt-8 px-4 bg-primary">
          <h1 className="w-full text-white text-center text-3xl font-bold">
            {recipe?.recipe_name}
          </h1>
        </div>

        {/* Content Section */}
        <div className="min-w-full min-h-48 flex flex-col items-center  sm:px-72">
          <div className="bg-white border shadow-lg mb-8 -mt-8 sm:-mt-20 w-[100%] min-h-[600px] px-4 sm:p-6">
            {/* Ensure content is a string, fallback to empty string */}
            <ReactMarkdown className="markdown-content w-[60%] sm:w-full ">
              {recipe?.content || ""}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
