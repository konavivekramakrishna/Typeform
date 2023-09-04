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
  const canRemoveOption = props.options.length >= 3;
  return (
    <div className="border border-solid p-5 mt-2 mb-2 rounded bg-white">
      <label className="block text-gray-700 text-sm font-medium mb-1">
        Field Name
      </label>
      <div className="flex items-center">
        <input
          className="flex-1 border border-gray-300 rounded-lg py-2 mb-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          type={"text"}
          value={props.label}
          onChange={(e) => props.labelHandlerCB(props.id, e.target.value)}
        />
      </div>
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
            {canRemoveOption && (
              <button
                onClick={() => {
                  props.removeOptionCB(props.id, opt);
                }}
                className="text-red-500 hover:text-red-600 p-1 rounded"
              >
                <i className="fi fi-ss-cross"></i>
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3">
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
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg mt-2"
        >
          Add Option
        </button>
        {isOptionExists && (
          <p className="text-sm text-red-500 mt-1">Option already exists.</p>
        )}
      </div>
      <button
        className="bg-red-500 mt-1 hover:bg-blue-600 text-white font-bold py-2 px-1 rounded-lg focus:outline-none focus:shadow-outline-red active:bg-red-500"
        onClick={() => props.removeFieldCB(props.id)}
      >
        Remove component
      </button>
    </div>
  );
}
