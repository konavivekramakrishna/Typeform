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
    props.inputValue.split(" | ") || []
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isOptionsFocused, setOptionsFocused] = useState(false);
  const [isDropdownFirstOpen, setDropdownFirstOpen] = useState(true); // New state variable
  const multiselectInputRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const { setMultiSelectValueCB } = props;

  const handleButtonClick = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      toggleDropdown();
      if (!isDropdownOpen) {
        setOptionsFocused(true);
        if (isDropdownFirstOpen) {
          setDropdownFirstOpen(false);
        }
      }
    }
  };

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.addEventListener("keydown", handleButtonClick);
    }

    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("keydown", handleButtonClick);
      }
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    setMultiSelectValueCB(selectedOptions);
  }, [selectedOptions, setMultiSelectValueCB]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionBlur = () => {
    setOptionsFocused(false);
  };

  const handleOptionsFocus = () => {
    setOptionsFocused(true);
  };

  return (
    <div className="max-w-md mx-auto mt-2 mb-20 bg-white rounded-md shadow-md">
      <label
        className="block text-gray-800 text-lg font-semibold mb-2 px-4 py-2 bg-blue-200 rounded-t-md"
        htmlFor="multiselect"
      >
        {props.label}
      </label>
      <div
        onFocus={handleOptionsFocus}
        className="relative"
        ref={multiselectInputRef}
      >
        <div className="w-full p-2 border border-gray-300 rounded-md">
          <button
            id="multiselect"
            className="w-full focus:shadow-outline-blue focus:border-blue-500"
            placeholder="Select options"
            onClick={toggleDropdown}
          >
            Open DropDown
          </button>
        </div>

        <div
          className={`absolute top-10 left-0 w-full mt-2 bg-white border border-gray-300 rounded-md  ${
            isDropdownOpen ? "" : "hidden"
          }`}
        >
          {props.options.map((name, index) => (
            <div
              key={name.id}
              className={`p-2 ${isOptionsFocused ? "focus:outline-none" : ""}`}
              onBlur={handleOptionBlur}
            >
              <label
                tabIndex={0}
                role="checkbox"
                aria-checked={selectedOptions.includes(name.option)}
              >
                <input
                  type="checkbox"
                  id={index === 0 ? "nextElementId" : index.toString()}
                  className="mr-2 focus:shadow-outline-blue focus:border-blue-500"
                  value={name.option}
                  checked={selectedOptions.includes(name.option)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      toggleOption(name.option);
                    }
                  }}
                  onClick={() => toggleOption(name.option)}
                  autoFocus={index === 0 && isDropdownFirstOpen}
                />
                {name.option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
