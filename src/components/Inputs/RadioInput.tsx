import React, { useState, useEffect } from "react";
import { fieldOption } from "../../types/formReducerTypes";

interface RadioInputProps {
  id: number;
  label: string;
  options: fieldOption[];
  labelHandlerCB: (id: number, value: string) => void;
  updateOptionsCB: (id: number, options: fieldOption[]) => void;
  removeFieldCB: (id: number) => void;
}

export default function RadioInput(props: RadioInputProps) {
  const { id, label, options, labelHandlerCB, updateOptionsCB } =
    props;

  const [localOptions, setLocalOptions] = useState<fieldOption[]>(
    options || []
  );
  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [localLabel, setLocalLabel] = useState(label);
  const [isEmpty, setIsEmpty] = useState(false);

  const addOption = () => {
    if (newOptionLabel.trim() === "") {
      setIsEmpty(true);
      return;
    }

    setIsEmpty(false);

    const option: fieldOption = {
      id: Date.now(),
      option: newOptionLabel,
    };
    setLocalOptions([...localOptions, option]);
    setNewOptionLabel("");
  };

  const canRemoveOption = localOptions.length >= 3;

  const removeOption = (optionId: number) => {
    setLocalOptions(localOptions.filter((option) => option.id !== optionId));
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      labelHandlerCB(id, localLabel);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [id, localLabel, labelHandlerCB]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      updateOptionsCB(id, localOptions);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [id, localOptions, updateOptionsCB]);

  return (
    <div className="border border-solid p-5 mt-2 mb-2 rounded bg-white">
      <label className="block text-gray-700 text-sm font-medium mb-1">
        Field Name
      </label>
      <div className="flex items-center">
        <input
          className="flex-1 border border-gray-300 rounded-lg py-2 mb-2 px-3 leading-tight focus:shadow-outline-blue focus:border-blue-500"
          type="text"
          value={label}
          onChange={(e) => setLocalLabel(e.target.value)}
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
        className="bg-red-500 mt-1 hover:bg-red-600 text-white font-bold py-2 px-1 rounded-lg focus:shadow-outline-blue focus:border-blue-500 active:bg-red-500"
        onClick={() => props.removeFieldCB(props.id)}
      >
        Remove Component
      </button>
    </div>
  );
}
