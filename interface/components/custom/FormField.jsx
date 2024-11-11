"use client";
import React from "react";

const FormField = ({ type, label, defaultValue, handleChange }) => {
  return (
    <span className=" relative ">
      {type === "textarea" ? (
        <textarea
          name={label}
          defaultValue={defaultValue}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          className="p-2 outline-none border-2 w-full text-sm font-semibold focus:border-primary valid:border-primary rounded-md smooth-animation peer "
          required={true}
        />
      ) : (
        <input
          type={type}
          name={label}
          defaultValue={defaultValue}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          className="p-2 bg-transparent outline-none text-sm border-2 w-full  font-semibold focus:border-primary valid:border-primary rounded-md smooth-animation peer "
          required={true}
        />
      )}
      <label
        htmlFor={label}
        className="absolute  top-2 left-2 text-sm  peer-valid:text-xs peer-valid:text-primary peer-valid:-top-4 peer-valid:font-semibold peer-focus:text-xs peer-focus:text-primary peer-focus:-top-4 peer-focus:font-semibold smooth-animation"
      >
        {label}
      </label>
    </span>
  );
};

export default FormField;

/*
<FormField
          type={"textarea"}
          handleChange={(value) => {
            console.log(value);
          }}
          label={"Testing"}
          defaultValue={"he"}
        />
*/
