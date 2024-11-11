"use client";
import { getAllFood } from "@/lib/api/diet";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const MealList = ({
  session,
  lunch,
  breakfast,
  dinner,
  snacks,
  setLunch,
  setBreakfast,
  setDinner,
  setSnacks,
  setActiveMealId,
  setActiveFoodName,
}) => {
  const { user } = session;

  useEffect(() => {
    getAllFood(user.id).then((res) => {
      if (res.success === false) {
        toast.error(res.message);
        return;
      }
      const data = res.data;
      
      const { breakfast, lunch, dinner, snacks } = data;

      setBreakfast(breakfast);
      setLunch(lunch);
      setDinner(dinner);
      setSnacks(snacks);
    });
  }, [session]);
  return (
    <div>
      {breakfast && breakfast.length > 0 && <h3>Breakfast</h3>}
      {breakfast &&
        breakfast.map((item) => (
          <div
            key={item._id}
            className="btn rounded-md flex justify-between hover:border border-gray-200 hover:shadow-md p-2 smooth-animation"
            onClick={() => {
              setActiveFoodName(item.name);
              setActiveMealId((prev) => {
                if (prev === item._id) {
                  return "";
                }
                return item._id;
              });
            }}
          >
            <p>{item.name}</p>
            <p>{item.calories}</p>
          </div>
        ))}
      {lunch && lunch.length > 0 && <h3>Lunch</h3>}
      {lunch &&
        lunch.map((item) => (
          <div
            key={item._id}
            className="btn flex rounded-md  justify-between hover:border border-gray-200 hover:shadow-md p-2 smooth-animation"
            onClick={() => {
              setActiveFoodName(item.name);
              setActiveMealId((prev) => {
                if (prev === item._id) {
                  return "";
                }
                return item._id;
              });
            }}
          >
            <p>{item.name}</p>
            <p>{item.calories}</p>
          </div>
        ))}
      {dinner && dinner.length > 0 && <h3>Dinner</h3>}
      {dinner &&
        dinner.map((item) => (
          <div
            key={item._id}
            className="btn flex rounded-md  justify-between hover:border border-gray-200 hover:shadow-md p-2 smooth-animation"
            onClick={() => {
              setActiveFoodName(item.name);
              setActiveMealId((prev) => {
                if (prev === item._id) {
                  return "";
                }
                return item._id;
              });
            }}
          >
            <p>{item.name}</p>
            <p>{item.calories}</p>
          </div>
        ))}
      {snacks && <h3>Snacks</h3>}
      {snacks &&
        snacks.map((item) => (
          <div
            key={item._id}
            className="btn flex rounded-md  justify-between hover:border border-gray-200 hover:shadow-md p-2 smooth-animation"
            onClick={() => {
              setActiveFoodName(item.name);
              setActiveMealId((prev) => {
                if (prev === item._id) {
                  return "";
                }
                return item._id;
              });
            }}
          >
            <p>{item.name}</p>
            <p>{item.calories}</p>
          </div>
        ))}
    </div>
  );
};

export default MealList;
