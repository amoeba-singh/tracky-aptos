import axios from "axios";

const createChallenge = async (challenge_name, tasks, user_id) => {
  const res = await axios.post(`/api/challenge`, {
    challenge_name,
    tasks,
    user_id,
  });

  return res.data;
};

const getAllChallenges = async (user_id) => {
  const res = await axios.get(`/api/challenge?user_id=${user_id}`);
  return res.data;
};

const getOneChallenge = async (user_id, challenge_id) => {
  const res = await axios.get(
    `/api/challenge/${challenge_id}?user_id=${user_id}`
  );
  return res.data;
};

const markCompletedTask = async (user_id, challenge_id, task_name) => {
  const res = await axios.patch(
    `/api/challenge/${challenge_id}?user_id=${user_id}`,
    {
      task_name,
    }
  );

  return res.data;
};

const rewardChallenge = async (user_id, challenge_id) => {
  const res = await axios.put(
    `/api/challenge/${challenge_id}?user_id=${user_id}`
  );
  console.log(res.data);
  return res.data;
};
export {
  createChallenge,
  getAllChallenges,
  getOneChallenge,
  markCompletedTask,
  rewardChallenge,
};
