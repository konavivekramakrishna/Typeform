import React from "react";

type RadioPreviewProps = {
  options: string[];
  value: string;
  SetRadioValCB: (value: string) => void;
};

export default function RadioPreview(props: RadioPreviewProps) {
  return (
    <div className="w-full border rounded-md">
      {props.options.map((opt) => (
        <div key={opt} className="flex items-center p-2 border-b">
          <input
            type="radio"
            name="type"
            value={opt}
            checked={opt === props.value}
            onChange={() => {
              props.SetRadioValCB(opt);
            }}
            className="mr-2"
          />
          <label htmlFor={opt}>{opt}</label>
        </div>
      ))}
    </div>
  );
}
