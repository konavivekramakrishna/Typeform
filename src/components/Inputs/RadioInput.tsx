import React, { useState, useEffect } from "react";
import { fieldOption } from "../../types/formReducerTypes";

interface RadioInputProps {
  id: number;
  label: string;
  options: fieldOption[]; // Ensure that options is always an array
  labelHandlerCB: (id: number, value: string) => void;
  updateOptionsCB: (id: number, options: fieldOption[]) => void;
  removeFieldCB: (id: number) => void;
}

export default function RadioInput(props: RadioInputProps) {
  // Initialize options as an empty array if it's null or undefined
  const [options, setOptions] = useState<fieldOption[]>(props.options || []);
  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [label, setLabel] = useState(props.label);
  const [isEmpty, setIsEmpty] = useState(false);

  const addOption = () => {
    if (newOptionLabel.trim() === "") {
      setIsEmpty(true); // Show error message
      return;
    }

    setIsEmpty(false); // Clear error message

    const option: fieldOption = {
      id: Date.now(),
      option: newOptionLabel,
    };
    setOptions([...options, option]);
    setNewOptionLabel("");
  };

  const canRemoveOption = options.length >= 3;

  const removeOption = (id: number) => {
    setOptions(options.filter((option) => option.id !== id));
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      props.labelHandlerCB(props.id, label);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [label]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      props.updateOptionsCB(props.id, options);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [options]);

  return (
    <div className="border border-solid p-5 mt-2 mb-2 rounded bg-white">
      <label className="block text-gray-700 text-sm font-medium mb-1">
        Field Name
      </label>
      <div className="flex items-center">
        <input
          className="flex-1 border border-gray-300 rounded-lg py-2 mb-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div className="w-full border rounded-md">
        {options.map((opt) => (
          <div key={opt.id} className="flex items-center p-2 border-b">
            <input
              type="radio"
              name="type"
              value={opt.option}
              id={`radio_${opt.id}`}
              className="mr-2"
            />
            <label htmlFor={`radio_${opt.id}`}>{opt.option}</label>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <div
            key={opt.id}
            className="flex items-center justify-between bg-gray-100 p-1 rounded"
          >
            <span>{opt.option}</span>
            {canRemoveOption && (
              <button
                onClick={() => {
                  removeOption(opt.id);
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
          value={newOptionLabel}
          className="w-full p-2 border rounded-md"
          onChange={(e) => {
            setNewOptionLabel(e.target.value);
          }}
          placeholder="Add Option"
        />

        <button
          onClick={addOption}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg mt-2"
        >
          Add Option
        </button>
      </div>
      {isEmpty && (
        <p className="text-sm text-red-500 mt-1">Option cannot be empty.</p>
      )}
      <button
        className="bg-red-500 mt-1 hover:bg-red-600 text-white font-bold py-2 px-1 rounded-lg focus:outline-none focus:shadow-outline-red active:bg-red-500"
        onClick={() => props.removeFieldCB(props.id)}
      >
        Remove Component
      </button>
    </div>
  );
}
