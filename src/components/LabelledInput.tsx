import React from "react";

export default function LabelledInput(props: {
  label: string;
  type: string;
  id: number;
  setFieldValCB: (id: number, value: string) => void;
  removeFieldCB: (id: number) => void;
  value: string;
}) {
  return (
    <div key={props.id} className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {props.label}
      </label>
      <div className="flex">
        <input
          className="flex-1 border border-gray-300 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          type={props.type}
          value={props.value}
          onChange={(e) => props.setFieldValCB(props.id, e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline-red active:bg-red-500"
          onClick={() => props.removeFieldCB(props.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
