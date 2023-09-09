import React from "react";
import { RadioPreviewProps } from "../../types/types";

export default function RadioPreview(props: RadioPreviewProps) {
  return (
    <div className="w-full border rounded-md shadow-md">
      <label className="block text-gray-800 text-lg font-semibold p-4 bg-blue-200 rounded-t-md">
        {props.label}
      </label>
      {props.options.map((opt) => (
        <div key={opt} className="flex items-center p-2 border-b">
          <input
            type="radio"
            name="type"
            value={opt}
            checked={opt === props.value}
            onChange={() => {
              props.SetRadioValCB(opt);
            }}
            className="mr-2"
          />
          <label htmlFor={opt}>{opt}</label>
        </div>
      ))}
    </div>
  );
}
