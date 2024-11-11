import { getFood } from "@/lib/api/diet";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const NutrientDetails = ({
  session,
  overallNutrients,
  activeMealId,
  foodName,
}) => {
  const [nutrientToDisplay, setNutrientToDisplay] = React.useState({});
  useEffect(() => {
    
    if (activeMealId === "") {
      setNutrientToDisplay(overallNutrients);
    } else {
      getFood(activeMealId).then((res) => {
        
        setNutrientToDisplay(res.data);
      });
    }
  }, [activeMealId]);
  return (
    <div>
      <h3>Nutrient Details {activeMealId != "" && `for ${foodName}`}</h3>
      <div className="flex gap-2 flex-col">
        <p className="flex justify-between">
          <span>Calories: </span>
          <span className="font-semibold">
            {nutrientToDisplay?.calories?.toFixed(2) || 0}{" "}
          </span>
        </p>
        <p className="flex justify-between">
          <span>Fat: </span>
          <span className="font-semibold">
            {nutrientToDisplay?.fat?.toFixed(2) || 0}{" "}
          </span>
        </p>
        <p className="flex justify-between">
          <span>Protein: </span>
          <span className="font-semibold">
            {nutrientToDisplay?.protein_g?.toFixed(2) || 0}{" "}
          </span>
        </p>
        <p className="flex justify-between">
          <span>Sodium: </span>
          <span className="font-semibold">
            {nutrientToDisplay?.sodium_mg?.toFixed(2) || 0}{" "}
          </span>
        </p>
        <p className="flex justify-between">
          <span>Potassium: </span>
          <span className="font-semibold">
            {nutrientToDisplay?.potassium_mg?.toFixed(2) || 0}{" "}
          </span>
        </p>
        <p className="flex justify-between">
          <span>Cholesterol: </span>
          <span className="font-semibold">
            {nutrientToDisplay?.cholesterol_mg?.toFixed(2) || 0}{" "}
          </span>
        </p>
        <p className="flex justify-between">
          <span>Carbohydrates: </span>
          <span className="font-semibold">
            {nutrientToDisplay?.carbohydrates_total_g?.toFixed(2) || 0}{" "}
          </span>
        </p>
        <p className="flex justify-between">
          <span>Fiber: </span>
          <span className="font-semibold">
            {nutrientToDisplay?.fiber_g?.toFixed(2) || 0}{" "}
          </span>
        </p>
        <p className="flex justify-between">
          <span>Sugar: </span>
          <span className="font-semibold">
            {nutrientToDisplay?.sugar_g?.toFixed(2) || 0}{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default NutrientDetails;
