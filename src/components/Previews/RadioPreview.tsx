import React from "react";
import { fieldOption } from "../../types/formReducerTypes";

interface RadioPreviewProps {
  options: fieldOption[];
  value: string;
  SetRadioValCB: (value: string) => void;
  label: string;
}

export default function RadioPreview(props: RadioPreviewProps) {
  return (
    <div className="max-w-md mx-auto mt-2 mb-20 bg-white rounded-md shadow-md">
      <label
        className="block text-gray-800 text-lg font-semibold mb-2 px-4 py-2 bg-blue-200 rounded-t-md"
        htmlFor="radioGroup"
      >
        {props.label}
      </label>
      <div className="p-2 border border-gray-300 rounded-md" id="radioGroup">
        {props.options.map((opt) => (
          <div key={opt.option} className="flex items-center p-2 border-b">
            <input
              type="radio"
              name="radioGroup"
              value={opt.option}
              checked={opt.option === props.value}
              onChange={() => {
                props.SetRadioValCB(opt.option);
              }}
              className="mr-2"
            />
            <label htmlFor={opt.option}>{opt.option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
