const user_recent_food_handler = (user, name, data, serving_size_g) => {
  user.recent_food = user.recent_food.filter(
    (item) => item.name.toLowerCase() !== name.toLowerCase()
  );

  user.recent_food.unshift({
    name: name,
    serving_size_g,
    calories: (
      parseFloat(data.items[0].calories * serving_size_g) / 100
    ).toFixed(2),
  });

  if (user.recent_food.length > 15) {
    user.recent_food.shift();
  }
};

const meal_data_preprocessing_for_get_meals = (meals) => {
  let breakfast = [];
  let lunch = [];
  let dinner = [];
  let snacks = [];

  meals.forEach((meal) => {
    if (meal.meal.toLowerCase() === "breakfast") {
      breakfast.push(meal);
    } else if (meal.meal.toLowerCase() === "lunch") {
      lunch.push(meal);
    } else if (meal.meal.toLowerCase() === "dinner") {
      dinner.push(meal);
    } else if (meal.meal.toLowerCase() === "snacks") {
      snacks.push(meal);
    }
  });

  let meal_data = {
    breakfast: breakfast,
    lunch: lunch,
    dinner: dinner,
    snacks: snacks,
  };

  return meal_data;
};

export { user_recent_food_handler, meal_data_preprocessing_for_get_meals };
