import React, { useState } from "react";
import { TextAreaInputType } from "../../types/types";

export default function TextAreaInput(props: TextAreaInputType) {
  const [value, setValue] = useState("");

  return (
    <div className="border border-gray-300 p-4 rounded-lg mb-4">
      <div className="flex items-center mb-2">
        <label className="text-gray-700 text-sm font-medium">Field Name</label>
        <input
          className="flex-1 ml-2 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          type="text"
          value={props.label}
          onChange={(e) => props.labelHandlerCB(e.target.value)}
        />
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      ></textarea>
      <button
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue"
        onClick={() => props.removeFieldCB(props.id)}
      >
        Remove
      </button>
    </div>
  );
}
