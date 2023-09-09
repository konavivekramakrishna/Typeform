import React, { useState, useEffect, useRef } from "react";
import { MultiSelectPreviewProps } from "../../types/types";

export default function MultiSelectPreview(props: MultiSelectPreviewProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(props.value);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const multiselectInputRef = useRef<HTMLDivElement>(null);

  const toggleSelection = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    props.SetMultiSelectValCB(selectedOptions);
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
            className="w-full focus:outline-none"
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
            <div key={name} className="p-2">
              <input
                type="checkbox"
                value={name}
                className="mr-2"
                checked={selectedOptions.includes(name)}
                onChange={() => toggleSelection(name)}
              />
              <label>{name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
