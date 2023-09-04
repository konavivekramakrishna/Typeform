import React, { useState } from "react";
import { RadioInputType } from "../../types";

export default function RadioInputComponent(props: RadioInputType) {
  const [option, setOption] = useState("");
  const isOptionExists = props.options.includes(option);

  const addOption = () => {
    if (option && !isOptionExists) {
      props.addOptionCB(props.id, option);
      setOption("");
    }
  };

  return (
    <div className="border border-solid p-5 mt-2 mb-2 rounded bg-white">
      <label className="block text-gray-700 text-sm font-bold mb-10">
        {props.label}
      </label>
      <div className="w-full border rounded-md">
        {props.options.map((opt) => (
          <div key={opt} className="flex items-center p-2 border-b">
            <input
              type="radio"
              name="type"
              value={opt}
              id={`radio_${opt}`}
              className="mr-2"
            />
            <label htmlFor={`radio_${opt}`}>{opt}</label>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {props.options.map((opt) => (
          <div
            key={opt}
            className="flex items-center justify-between bg-gray-100 p-1 rounded"
          >
            <span>{opt}</span>
            <button
              onClick={() => {
                props.removeOptionCB(props.id, opt);
              }}
              className="text-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="relative mt-3">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          onChange={(e) => {
            setOption(e.target.value);
          }}
          value={option}
          placeholder="Add Option"
        />
        <button
          onClick={addOption}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg mt-2 absolute right-1 top-1 ml-2"
          disabled={isOptionExists}
        >
          Add Option
        </button>
        {isOptionExists && (
          <p className="text-sm text-red-500 mt-1">Option already exists.</p>
        )}
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg mt-3"
        onClick={() => props.removeFieldCB(props.id)}
      >
        Remove Component
      </button>
    </div>
  );
}
