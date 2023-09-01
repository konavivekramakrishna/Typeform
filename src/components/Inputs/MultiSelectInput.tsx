import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { MultiSelectInputType } from "../../types";

export default function MultiSelectInput(props: MultiSelectInputType) {
  const [option, setOption] = useState("");
  const isOptionExists = props.options.includes(option);

  const addOption = () => {
    if (option && !isOptionExists) {
      props.addOptionCB(props.id, option);
      setOption("");
    }
  };

  return (
    <div className="border-2 border-solid p-5 mt-2 mb-2 rounded bg-white">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {props.label}
      </label>
      <select className="w-full p-2 border rounded-md">
        {props.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {props.options.map((opt) => (
          <div
            key={opt}
            className="flex items-center justify-between bg-gray-100 p-1 rounded"
          >
            <span>{opt}</span>
            <Button
              onClick={() => {
                props.removeOptionCB(props.id, opt);
              }}
              variant="text"
              size="sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <Input
          crossOrigin={""}
          type="text"
          size="md"
          color="blue"
          onChange={(e) => {
            setOption(e.target.value);
          }}
          label="Add Option"
          value={option}
        />

        <Button
          size="sm"
          color="blue"
          onClick={addOption}
          className="mt-2"
          disabled={isOptionExists}
        >
          Add Option
        </Button>
        {isOptionExists && (
          <p className="text-sm text-red-500 mt-1">Option already exists.</p>
        )}
      </div>

      <Button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg mt-3 focus:outline-none focus:shadow-outline-red active:bg-red-500"
        onClick={() => props.removeFieldCB(props.id)}
      >
        Remove Component
      </Button>
    </div>
  );
}
