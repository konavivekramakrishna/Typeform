import React, { useState, useEffect } from "react";
import { MultiSelectInputType } from "../../types";

export default function MultiSelectInput(props: MultiSelectInputType) {
  const [option, setOption] = useState("");
  const isOptionExists = props.options.includes(option);
  useEffect(() => {
    let modified = false;

    if (!props.options.includes("Default Option 1")) {
      props.addOptionCB(props.id, "Default Option 1");
      modified = true;
    }
    if (!props.options.includes("Default Option 2")) {
      props.addOptionCB(props.id, "Default Option 2");
      modified = true;
    }

    if (
      modified &&
      option !== "Default Option 1" &&
      option !== "Default Option 2"
    ) {
      // Call addOptionCB only if modifications were made
      // This prevents calling it twice if both options were added
      props.addOptionCB(props.id, option);
    }
  }, [props.id, props.options, option, props.addOptionCB]);

  const addOption = () => {
    if (option && !isOptionExists) {
      props.addOptionCB(props.id, option);
      setOption("");
    }
  };

  const canRemoveOption = props.options.length >= 3;

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
