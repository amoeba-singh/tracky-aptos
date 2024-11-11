import mongoose, { Schema } from "mongoose";

const pointsSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const Points = mongoose.models.Points || mongoose.model("Points", pointsSchema);

export default Points;
