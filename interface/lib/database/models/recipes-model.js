import { model, models, Schema } from "mongoose";
const recipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  recipe_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Recipe = models.Recipe || model("Recipe", recipeSchema);

export default Recipe;
