import axios from "axios";
const createFood = async (user_id, name, serving_size_g, meal) => {
  const point_res = await axios.post(`/api/points`, {
    user_id,
  });

  console.log("point_res => ", point_res.data);

  if (!point_res.data.success || point_res.data.data.points < 10) {
    return {
      success: false,
      message: "You don't have enough points to add a meal",
    };
  }

  const res = await axios.post(`/api/diet`, {
    user_id,
    name,
    serving_size_g,
    meal,
  });

  return res.data;
};

const getFood = async (food_id) => {
  const res = await axios.get(`/api/diet/${food_id}`);

  return res.data;
};

const getAllFood = async (user_id) => {
  const res = await axios.get(`/api/diet?user_id=${user_id}`);

  return res.data;
};

export { createFood, getFood, getAllFood };
