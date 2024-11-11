import mongoose, { models } from "mongoose";

const dietSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  meal: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  calories: {
    type: Number,
  },
  serving_size_g: {
    type: Number,
  },
  fat: {
    type: Number,
  },
  protein_g: {
    type: Number,
  },
  sodium_mg: {
    type: Number,
  },
  potassium_mg: {
    type: Number,
  },
  cholesterol_mg: {
    type: Number,
  },
  carbohydrates_total_g: {
    type: Number,
  },
  fiber_g: {
    type: Number,
  },
  sugar_g: {
    type: Number,
  },
  date: {
    type: Number,
  },
});

const Diet = models.diet || mongoose.model("diet", dietSchema);

export default Diet;
