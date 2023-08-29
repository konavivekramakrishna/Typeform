import React, { useState } from "react";
import { LabelledInputType } from "../../types";
import { Textarea } from "@material-tailwind/react";

export default function TextAreaInput(props: LabelledInputType) {
  const [value, setValue] = useState("");

  return (
    <div
      key={props.id}
      className="  flex justify-between items-start border border-solid p-5 mt-2 mb-2 rounded bg-white"
    >
      <Textarea
        value={value}
        size="lg"
        onChange={(e) => setValue(e.target.value)}
        variant="standard"
        label={props.label}
        className="flex-grow" // Take up remaining space in the flex container
      />

      <button
        className="ml-2 bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline-red active:bg-red-500"
        onClick={() => props.removeFieldCB(props.id)}
      >
        Remove
      </button>
    </div>
  );
}
