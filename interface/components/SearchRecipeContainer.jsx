"use client";
import { createRecipe, getRecipes } from "@/lib/api/recipe";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import FormField from "./custom/FormField";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import chefAi from "@/config/gemini";
import { decreasePoints } from "@/config/aptos";
import { useSelector } from "react-redux";
import RecipeCard from "./recipe/recipe-card";

const SearchRecipeContainer = ({ session }) => {
  const router = useRouter();
  const walletObj = useSelector((state) => state.wallet);
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [title, setTitle] = React.useState("");

  useEffect(() => {
    const query = searchParams.get("query") || "";
    setLoading(true);
    console.log(query);

    getRecipes(query).then((response) => {
      console.log(response);
      setRecipes(response.data);
      setLoading(false);
    });
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;

  const handleGenerate = () => {
    decreasePoints(walletObj.address, 100, session.user._id).then((points) => {
      if (points != -1)
        chefAi(title).then((res) => {
          createRecipe(session?.user.id, title, image, res).then((response) => {
            if (response.success) {
              router.push(`/recipes/${response.data._id}`);
            }
          });
        });
    });
  };
  return (
    <div className="">
      <h3 className="text-center">
        Not able to find{" "}
        <Dialog>
          <DialogTrigger className="text-primary">Click Here</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Recipe {"100 pts"}</DialogTitle>
              <DialogDescription className="flex gap-2 flex-col">
                <span className="flex gap-2 flex-col mt-4">
                  <FormField
                    type={"text"}
                    handleChange={(value) => {
                      setTitle(value);
                    }}
                    label={"Title"}
                    defaultValue={""}
                  />
                  <FormField
                    type={"text"}
                    handleChange={(value) => {
                      setImage(value);
                    }}
                    label={"Image"}
                    defaultValue={""}
                  />
                  <Button
                    onClick={() => {
                      handleGenerate();
                    }}
                  >
                    Generate
                  </Button>
                </span>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </h3>
      <div className=" w-screen px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-4 gap-2">
        {recipes &&
          recipes.map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe._id} />;
          })}
      </div>
    </div>
  );
};

export default SearchRecipeContainer;
