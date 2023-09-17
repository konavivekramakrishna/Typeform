import React, { useState, useEffect } from "react";
import { fieldOption } from "../../types/formReducerTypes";

interface MultiSelectInputsProps {
  id: number;
  label: string;
  options: fieldOption[];
  labelHandlerCB: (id: number, value: string) => void;
  updateOptionsCB: (id: number, options: fieldOption[]) => void;
  removeFieldCB: (id: number) => void;
}

export default function MultiSelectInput(props: MultiSelectInputsProps) {
  const { id, label, options, labelHandlerCB, updateOptionsCB, removeFieldCB } =
    props;

  const [optionList, setOptionList] = useState<fieldOption[]>(options || []);
  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [fieldLabel, setFieldLabel] = useState(label);
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
    setOptionList([...optionList, option]);
    setNewOptionLabel("");
  };

  const canRemoveOption = optionList.length >= 3;

  const removeOption = (optionId: number) => {
    setOptionList(optionList.filter((option) => option.id !== optionId));
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      labelHandlerCB(id, fieldLabel);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [id, fieldLabel, labelHandlerCB]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      updateOptionsCB(id, optionList);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [id, optionList, updateOptionsCB]);

  return (
    <div className="border-2 border-solid p-5 mt-2 mb-2 rounded bg-white">
      <label className="block text-gray-700 text-sm font-medium mb-1">
        Field Name
      </label>
      <div className="flex items-center">
        <input
          className="flex-1 border border-gray-300 rounded-lg py-2 px-3 leading-tight focus:shadow-outline-blue focus:border-blue-500 mb-5"
          type="text"
          value={fieldLabel}
          onChange={(e) => {
            setFieldLabel(e.target.value);
          }}
        />
      </div>
      <select className="w-full p-2 border rounded-md">
        {optionList.map((opt) => (
          <option key={opt.id} value={opt.option}>
            {opt.option}
          </option>
        ))}
      </select>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {optionList.map((opt) => (
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
          className="w-full p-2 border rounded-md"
          onChange={(e) => {
            setNewOptionLabel(e.target.value);
          }}
          value={newOptionLabel}
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
        onClick={() => removeFieldCB(id)}
      >
        Remove Component
      </button>
    </div>
  );
}
