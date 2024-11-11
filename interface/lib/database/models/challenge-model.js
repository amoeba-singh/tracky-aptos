import mongoose, { models } from "mongoose";

const challengeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  challenge_name: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: String,
      required: true,
    },
  ],
  created_at: {
    type: Number,
    required: true,
  },
});

const completedChallengeSchema = new mongoose.Schema({
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Challenge",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  completed_tasks: [
    {
      task_name: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        required: true,
      },
    },
  ],
  completed: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  is_rewarded: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const CompletedChallengeModel =
  models.completedChallenge ||
  mongoose.model("completedChallenge", completedChallengeSchema);

const ChallengeModel =
  models.challenge || mongoose.model("challenge", challengeSchema);

// create a model that store challenge details
// and second model that takes refrence of the challange and tracks the progress of the challenge

export default ChallengeModel;
