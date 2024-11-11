import { auth } from "@/auth";
import SearchRecipeContainer from "@/components/SearchRecipeContainer";
import React from "react";

const SearchRecipe = async () => {
  const session = await auth();
  return (
    <div>
      <SearchRecipeContainer session={session} />
    </div>
  );
};

export default SearchRecipe;
