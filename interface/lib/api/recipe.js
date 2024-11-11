import axios from "axios";
const createRecipe = async (user_id, recipe_name, image, content) => {
  console.log(user_id, recipe_name, image, content);
  const response = await axios.post("/api/recipe", {
    user_id,
    recipe_name,
    image,
    content,
  });
  return response.data;
};

const getRecipes = async (query) => {
  const response = await axios.get(`/api/recipe?query=${query}`);
  return response.data;
};

const getRecipe = async (recipe_id) => {
  const response = await axios.put("/api/recipe", {
    recipe_id,
  });
  return response.data;
};

export { createRecipe, getRecipes, getRecipe };
