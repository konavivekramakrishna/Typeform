import * as React from "react";
import { useState, useEffect } from "react";

type MultiSelectPreviewProps = {
  options: string[];
  value: string[];
  SetMultiSelectValCB: (value: string[]) => void;
};

export default function MultiSelectPreview(props: MultiSelectPreviewProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(props.value);
  const [clickedOption, setClickedOption] = useState<string | null>(null);

  const toggleSelection = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
      setClickedOption(null);  
    } else {
      setSelectedOptions([...selectedOptions, option]);
      setClickedOption(option);  
    }
  };

  useEffect(() => {
    props.SetMultiSelectValCB(selectedOptions);
  }, [selectedOptions, props.SetMultiSelectValCB]);

  return (
    <div>
      <div className="m-1 w-300">
        <label
          htmlFor="multiSelect"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select Options
        </label>
        <select
          id="multiSelect"
          multiple
          className="w-full p-2 border rounded-md"
        >
          {props.options.map((name) => (
            <option
              key={name}
              value={name}
              onClick={() => toggleSelection(name)}
              style={{
                backgroundColor:
                  clickedOption === name ? "lightblue" : "transparent",
                fontWeight: selectedOptions.includes(name) ? "bold" : "normal",
                color: selectedOptions.includes(name) ? "blue" : "black",
              }}
            >
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
