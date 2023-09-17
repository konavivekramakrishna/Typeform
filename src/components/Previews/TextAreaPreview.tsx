import React from "react";

type TextAreaPreviewType = {
  label: string;
  value: string;
  SetInputValueCB: (value: string) => void;
};

export default function TextAreaPreview(props: TextAreaPreviewType) {
  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-800 mb-2">
        {props.label}
      </label>
      <textarea
        className="border rounded-lg py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={props.value}
        onChange={(e) => {
          props.SetInputValueCB(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
