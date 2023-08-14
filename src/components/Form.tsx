import React, { useState } from "react";
import LabelledInput from "./LabelledInput";

const formFields = [
  { id: 1, label: "First Name", type: "text", value: "" },
  {
    id: 2,
    label: "Last Name",
    type: "text",
    value: "",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
    value: "",
  },
  {
    id: 4,
    label: "Date of Birth",
    type: "date",
    value: "",
  },
  {
    id: 5,
    label: "Phone Number",
    type: "tel",
    value: "",
  },
];

export default function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);
  const [newField, setNewField] = useState("");

  const addField = () => {
    setState([
      ...state,
      {
        id: Number(new Date()),
        label: newField,
        type: "text",
        value: newField,
      },
    ]);
    setNewField("");
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  const clearData = () => {
    setState(
      state.map((field) => ({
        ...field,
        value: "",
      })),
    );
    setNewField("");
  };

  const setFieldVal = (id: number, value: string) => {
    setState(
      state.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            value,
          };
        }
        return field;
      }),
    );
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      {state.map((field) => (
        <LabelledInput
          id={field.id}
          key={field.id}
          value={field.value}
          label={field.label}
          type={field.type}
          removeFieldCB={removeField}
          setFieldValCB={setFieldVal}
        />
      ))}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={newField}
          className="flex-1 border border-gray-300 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
          placeholder="New Field Label"
          onChange={(e) => {
            setNewField(e.target.value);
          }}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={addField}
        >
          Add Field
        </button>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-red active:bg-red-800"
          onClick={clearData}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
