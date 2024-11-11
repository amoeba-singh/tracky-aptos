"use client";
import React, { useEffect } from "react";
import MealList from "./meal-lists";
import AddMeal from "./add-meal";
import NutrientDetails from "./nutrien-details";

const DietContainer = ({ session }) => {
  const [activeMealId, setActiveMealId] = React.useState("");
  //   const [meals, setMeals] = React.useState([]);
  const [breakfast, setBreakfast] = React.useState([]);
  const [lunch, setLunch] = React.useState([]);
  const [dinner, setDinner] = React.useState([]);
  const [snacks, setSnacks] = React.useState([]);
  const [overallNutrients, setOverallNutrients] = React.useState({});
  const [foodName, setActiveFoodName] = React.useState("");
  const [calories, setCalories] = React.useState(0);

  useEffect(() => {
    let tempNutrients = {
      calories: 0,
      fat: 0,
      protein_g: 0,
      sodium_mg: 0,
      potassium_mg: 0,
      cholesterol_mg: 0,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
    };

    breakfast.forEach((meal) => {
      tempNutrients.calories += meal.calories;
      tempNutrients.fat += meal.fat;
      tempNutrients.protein_g += meal.protein_g;
      tempNutrients.sodium_mg += meal.sodium_mg;
      tempNutrients.potassium_mg += meal.potassium_mg;
      tempNutrients.cholesterol_mg += meal.cholesterol_mg;
      tempNutrients.carbohydrates_total_g += meal.carbohydrates_total_g;
      tempNutrients.fiber_g += meal.fiber_g;
      tempNutrients.sugar_g += meal.sugar_g;
    });

    lunch.forEach((meal) => {
      tempNutrients.calories += meal.calories;
      tempNutrients.fat += meal.fat;
      tempNutrients.protein_g += meal.protein_g;
      tempNutrients.sodium_mg += meal.sodium_mg;
      tempNutrients.potassium_mg += meal.potassium_mg;
      tempNutrients.cholesterol_mg += meal.cholesterol_mg;
      tempNutrients.carbohydrates_total_g += meal.carbohydrates_total_g;
      tempNutrients.fiber_g += meal.fiber_g;
      tempNutrients.sugar_g += meal.sugar_g;
    });

    dinner.forEach((meal) => {
      tempNutrients.calories += meal.calories;
      tempNutrients.fat += meal.fat;
      tempNutrients.protein_g += meal.protein_g;
      tempNutrients.sodium_mg += meal.sodium_mg;
      tempNutrients.potassium_mg += meal.potassium_mg;
      tempNutrients.cholesterol_mg += meal.cholesterol_mg;
      tempNutrients.carbohydrates_total_g += meal.carbohydrates_total_g;
      tempNutrients.fiber_g += meal.fiber_g;
      tempNutrients.sugar_g += meal.sugar_g;
    });

    snacks.forEach((meal) => {
      tempNutrients.calories += meal.calories;
      tempNutrients.fat += meal.fat;
      tempNutrients.protein_g += meal.protein_g;
      tempNutrients.sodium_mg += meal.sodium_mg;
      tempNutrients.potassium_mg += meal.potassium_mg;
      tempNutrients.cholesterol_mg += meal.cholesterol_mg;
      tempNutrients.carbohydrates_total_g += meal.carbohydrates_total_g;
      tempNutrients.fiber_g += meal.fiber_g;
      tempNutrients.sugar_g += meal.sugar_g;
    });

    setOverallNutrients(tempNutrients);
    setCalories(tempNutrients.calories);
  }, [lunch, breakfast, dinner, snacks]);

  return (
    <div>
      <span className="flex justify-between w-full items-center my-4">
        <h2>
          Hey {session?.user?.name} today you had{" "}
          <span className="text-orange-500">{calories.toFixed(2)}</span> calorie
          {"(s)"}
        </h2>
        <AddMeal user_id={session?.user?.id} />
      </span>
      <div className="grid grid-cols-2 mt-4 gap-4">
        <MealList
          session={session}
          lunch={lunch}
          setLunch={setLunch}
          breakfast={breakfast}
          setBreakfast={setBreakfast}
          dinner={dinner}
          setDinner={setDinner}
          snacks={snacks}
          setSnacks={setSnacks}
          setActiveMealId={setActiveMealId}
          setActiveFoodName={setActiveFoodName}
        />
        <NutrientDetails
          session={session}
          overallNutrients={overallNutrients}
          activeMealId={activeMealId}
          foodName={foodName}
        />
      </div>
    </div>
  );
};

export default DietContainer;
