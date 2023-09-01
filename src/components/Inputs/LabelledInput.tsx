import React from "react";
import { LabelledInputType } from "../../types";
  
export default function LabelledInput(props: LabelledInputType) {
  return (
    <div key={props.id} className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1">
        Field Name
      </label>
      <div className="flex items-center">
        <input
          className="flex-1 border border-gray-300 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          type={"text"}
          value={props.label}
          onChange={(e) => props.labelHandlerCB(props.id, e.target.value)}
        />

        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline-red active:bg-red-500"
          onClick={() => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
