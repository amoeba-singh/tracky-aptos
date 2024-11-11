"use client";
import React from "react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FormField from "../custom/FormField";
import { Button } from "../ui/button";
import { createFood } from "@/lib/api/diet";
import toast from "react-hot-toast";
import { decreasePoints, handleAddPoints } from "@/config/aptos";
import { useSelector } from "react-redux";

const AddMeal = ({ user_id }) => {
  const walletObj = useSelector((state) => state.wallet);
  const [mealTime, setMealTime] = React.useState("");
  const [foodName, setFoodName] = React.useState("");
  const [serving, setServing] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [openSheet, setOpenSheet] = React.useState(false);

  const handleAddFood = () => {
    setLoading(true);
    decreasePoints(walletObj.address, 20, user_id).then((points) => {
      if (points === -1) {
        setLoading(false);
        return toast.error("Transaction failed");
      }

      createFood(user_id, foodName, serving, mealTime).then((res) => {
        console.log(res);
        toast.success(res.message);

        console.log(res);
        if (res.success) {
          toast.success(`${20} points deducted from your account`);
        }
        setLoading(false);
        setOpenSheet(false);
      });
    });
  };
  return (
    <div>
      <Sheet open={openSheet}>
        <SheetTrigger>
          <span
            className="btn px-3 py-2 text-white font-semibold bg-primary rounded-md"
            onClick={() => {
              setOpenSheet(true);
            }}
          >
            Add Meal
          </span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <h2>Add Meal</h2>
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-4 mt-6 justify-center">
              <Select
                onValueChange={(value) => {
                  setMealTime(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Meal time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snacks">Snacks</SelectItem>
                </SelectContent>
              </Select>
              <FormField
                type={"text"}
                handleChange={(value) => {
                  setFoodName(value);
                }}
                label={"Food name"}
                defaultValue={""}
              />

              <FormField
                type={"text"}
                handleChange={(value) => {
                  setServing(value);
                }}
                label={"Serving(in gm)"}
                defaultValue={""}
              />

              <Button onClick={() => handleAddFood()} disabled={loading}>
                Add Meal
              </Button>
              <Button onClick={() => setOpenSheet(false)} disabled={loading}>
                Close Form
              </Button>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddMeal;
