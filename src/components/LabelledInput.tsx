import React from "react";
import { LabelledInputType } from "../types";
import { Input } from "@material-tailwind/react";

export default function LabelledInput(props: LabelledInputType) {
  return (
    <div key={props.id} className="mb-3 m-1">
      <div className="flex">
        <div className="flex w-full flex-col items-end gap-6">
          <Input
            color="blue"
            crossOrigin={false}
            type={props.fieldType}
            value={props.value}
            onChange={(e) => props.setFieldValCB(props.id, e.target.value)}
            size="md"
            label={props.label}
          />
        </div>

        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline-red active:bg-red-500"
          onClick={() => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
