import ChallengeModel, {
  CompletedChallengeModel,
} from "../../database/models/challenge-model.js";
import Challenge, {
  CompletedChallenge,
} from "../../database/models/challenge-model.js";

const streak_calculation = (completed_challenges, date) => {
  let streak = 0;


  let i = completed_challenges.length - 1;
  while (
    i >= 0 &&
    completed_challenges[i] &&
    completed_challenges[i].completed === true
  ) {
    
    if (i < 0) {
      break;
    }
    if (
      i === completed_challenges.length - 1 &&
      parseInt(date) - parseInt(completed_challenges[i].date) > 86400000
    ) {
      break;
    } else if (
      i < completed_challenges.length - 1 &&
      parseInt(completed_challenges[i + 1].date) -
        parseInt(completed_challenges[i].date) >
        86400000
    ) {
      break;
    }
    i--;
    streak++;
  }

  return streak;
};

const create_obj_for_today_challenge = async (
  today_challenge,
  challenge_id,
  user_id,
  date
) => {
  let today_challenge_obj = today_challenge || {};

  
  if (!today_challenge) {
    const challenge = await ChallengeModel.findOne({
      _id: challenge_id,
      owner: user_id,
    });

    if (!challenge) {
      return {
        success: false,
        message: "Challenge not found",
      };
    }

    // create object from the found challenge by including a completed field
    today_challenge_obj = {
      completed_tasks: [],
      completed: false,
      date: date.getTime(),
      owner: user_id,
      challenge: challenge_id,
      is_rewarded: false,
    };

    
    // applying loop to copy all the tasks from the challenge to the completed challenge
    for (let i = 0; i < challenge.tasks.length; i++) {
      
      today_challenge_obj.completed_tasks.push({
        task_name: challenge.tasks[i],
        completed: false,
      });
    }

    // save the object to the database
    today_challenge_obj = new CompletedChallengeModel(today_challenge_obj);
    await today_challenge_obj.save();
    
  }
  return { success: true, data: today_challenge_obj };
};
export { streak_calculation, create_obj_for_today_challenge };
