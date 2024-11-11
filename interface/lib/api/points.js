import axios from "axios";

const createPoints = async (user_id, updated_points) => {
  const res = await axios.put(`/api/points`, {
    user_id,
    updated_points,
  });

  return res.data;
};

const getPoints = async () => {
  const res = await axios.get(`/api/points`);
  return res.data;
};

export { createPoints, getPoints };
