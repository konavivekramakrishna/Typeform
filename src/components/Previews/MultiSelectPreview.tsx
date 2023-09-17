import React, { useState, useEffect, useRef } from "react";
import { fieldOption } from "../../types/formReducerTypes";

interface MultiSelectPreviewProps {
  options: fieldOption[];
  inputValue: string;
  setMultiSelectValueCB: (value: string[]) => void;
  label: string;
}

export default function MultiSelectPreview(props: MultiSelectPreviewProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    props.inputValue.split(" | ") || [],
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const multiselectInputRef = useRef<HTMLDivElement>(null);

  const toggleOption = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    const updatedOptions = isSelected
      ? selectedOptions.filter((value) => value !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    props.setMultiSelectValueCB(updatedOptions);
  };

  useEffect(() => {
    setSelectedOptions(props.inputValue.split(" | ") || []);
  }, [props.inputValue]);

  useEffect(() => {
    props.setMultiSelectValueCB(selectedOptions);
  }, [selectedOptions]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        multiselectInputRef.current &&
        !multiselectInputRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="max-w-md mx-auto mt-2 mb-20 bg-white rounded-md shadow-md">
      <label
        className="block text-gray-800 text-lg font-semibold mb-2 px-4 py-2 bg-blue-200 rounded-t-md"
        htmlFor="multiselect"
      >
        {props.label}
      </label>
      <div className="relative" ref={multiselectInputRef}>
        <div className="w-full p-2 border border-gray-300 rounded-md">
          <div className="flex flex-wrap gap-2">
            {selectedOptions.map((name) => (
              <span key={name} className="bg-blue-500 text-white px-2 rounded">
                {name}
              </span>
            ))}
          </div>
          <input
            type="text"
            id="multiselect"
            className="w-full focus:shadow-outline-blue focus:border-blue-500"
            placeholder="Select options"
            autoComplete="off"
            onClick={toggleDropdown}
          />
        </div>
        <div
          className={`absolute top-10 left-0 w-full mt-2 bg-white border border-gray-300 rounded-md  ${
            isDropdownOpen ? "" : "hidden"
          }`}
        >
          {props.options.map((name) => (
            <div key={name.id} className="p-2">
              <input
                type="checkbox"
                value={name.option}
                className="mr-2"
                checked={selectedOptions.includes(name.option)}
                onChange={() => toggleOption(name.option)}
              />
              <label>{name.option}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
