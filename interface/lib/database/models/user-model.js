import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  physical: {
    height: [
      {
        value: {
          type: String,
          required: false,
          default: "0 cm",
        },
        date: {
          type: String,
          required: false,
          default: "2024-01-01",
        },
      },
    ],
    weight: [
      {
        value: {
          type: String,
          required: false,
          default: "0 kg",
        },
        date: {
          type: String,
          required: false,
          default: "2024-01-01",
        },
      },
    ],
  },
  financial: {
    earning: {
      type: String,
      required: false,
    },
    expanse: {
      type: String,
      required: false,
    },
  },

  recent_food: [
    {
      name: {
        type: String,
        required: false,
      },
      serving_size_g: {
        type: String,
        required: false,
      },
      calories: {
        type: String,
        required: false,
      },
    },
  ],

  recent_finance: [
    {
      reason: {
        type: String,
        required: false,
      },
      amount: {
        type: String,
        required: false,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
