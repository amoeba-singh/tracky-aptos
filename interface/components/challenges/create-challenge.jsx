"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FormField from "../custom/FormField";
import toast from "react-hot-toast";
import { createChallenge } from "@/lib/api/challenge";

const CreateChallenge = ({ session }) => {
  const [challenge, setChallenge] = useState({
    challenge_name: "",
    tasks: [""],
  });

  // useEffect(() => {
  //   console.log(session);
  // }, [session]);
  const handleCreateChallenge = () => {
    createChallenge(
      challenge.challenge_name,
      challenge.tasks,
      session?.user?.id
    ).then((res) => {
      
      if (res?.success === true) {
        toast.success("Challenge Created");
      } else {
        toast.error("Failed to create challenge");
      }
    });
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <span className="btn border bg-primary px-2 py-2 rounded-md text-white font-semibold">
            Create
          </span>
        </SheetTrigger>
        <SheetContent className="max-h-screen overflow-scroll">
          <SheetHeader>
            <SheetTitle>Creating Challenge</SheetTitle>
            <SheetDescription>
              <span className="flex mt-4 flex-col">
                <FormField
                  type={"text"}
                  handleChange={(value) => {
                    setChallenge({ ...challenge, challenge_name: value });
                  }}
                  label={"Testing"}
                  defaultValue={""}
                />

                <span className="inline-block text-lg font-semibold  mt-4">
                  Tasks
                </span>
                <span className="flex mt-4 flex-col gap-4">
                  {challenge?.tasks?.map((challenge, index) => (
                    <FormField
                      key={index}
                      type={"text"}
                      handleChange={(value) => {
                        setChallenge((prev) => {
                          const tempTasks = [...prev.tasks];
                          tempTasks[index] = value;
                          return { ...prev, tasks: tempTasks };
                        });
                      }}
                      label={`Task ${index + 1}`}
                      defaultValue={""}
                    />
                  ))}
                </span>
                <span
                  className="btn border bg-primary px-2 py-2 rounded-md text-white font-semibold mt-4"
                  onClick={() => {
                    const tempTasks = [...challenge.tasks];
                    tempTasks.push("");
                    setChallenge({ ...challenge, tasks: tempTasks });
                  }}
                >
                  Add Task
                </span>
                <span
                  className="btn border bg-primary px-2 py-2 rounded-md text-white font-semibold mt-4"
                  onClick={() => {
                    handleCreateChallenge();
                  }}
                >
                  Create Challenge
                </span>
              </span>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CreateChallenge;
