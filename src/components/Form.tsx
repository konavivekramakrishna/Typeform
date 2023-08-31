import React, { useEffect, useRef, useState } from "react";
import LabelledInput from "./LabelledInput";
import { Link } from "raviger";
import {
  getLocalFormsData,
  saveLocalForms,
  saveFormData,
  initialState,
} from "../Utils/Storageutils";

export default function Form(props: { formId: number }) {
  const [state, setState] = useState(() => initialState(props.formId));

  const [newField, setNewField] = useState({
    label: "",
    type: "text",
    value: "",
  });

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Form Editor";
    titleRef.current?.focus();
    return () => {
      document.title = "React App";
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(state);
    }, 1);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const addField = () => {
    if (newField.label.trim() === "") {
      return;
    }

    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField.label,
          type: newField.type,
          value: "", // Initialize the value as an empty string
        },
      ],
    });
    setNewField({
      label: "", // Clear the label after adding a field
      type: "text", // Reset the type to default
      value: "",
    });
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  const clearFormData = () => {
    setState({
      ...state,
      formFields: state.formFields.map((field) => ({
        ...field,
        value: "",
      })),
    });
  };

  const labelHandle = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, label: value } : field
      ),
    });
  };

  const typeHandle = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, type: value } : field
      ),
    });
  };

  const changeFormTitle = (title: string) => {
    const localForms = getLocalFormsData();
    const newLocalForms = localForms.map((form) =>
      form.id === state.id ? { ...form, title } : form
    );
    saveLocalForms(newLocalForms);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <div className="mt-4 mb-2">
        <input
          type="text"
          value={state.title}
          className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter Form Title"
          onChange={(e) => {
            setState({ ...state, title: e.target.value });
            changeFormTitle(e.target.value);
          }}
          ref={titleRef}
        />
      </div>

      {state.formFields.map((field) => (
        <LabelledInput
          id={field.id}
          key={field.id}
          value={field.value}
          label={field.label}
          type={field.type}
          labelHandlerCB={labelHandle}
          typeHandlerCB={typeHandle}
          removeFieldCB={removeField}
        />
      ))}

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={newField.label}
          className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="New Field Label"
          onChange={(e) => {
            setNewField({
              ...newField,
              label: e.target.value,
            });
          }}
        />

        <select
          className="border-2 m-1 border-gray-300 rounded-md mt-1 h-10 px-2 text-lg focus:outline-none focus:border-blue-500"
          value={newField.type}
          onChange={(e) => {
            setNewField({
              ...newField,
              type: e.target.value,
            });
          }}
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="checkbox">Checkbox</option>
          <option value="file">File</option>
        </select>
        <button
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={addField}
        >
          Add
        </button>
      </div>

      <div className="flex justify-end">
        <button
          className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={() => saveFormData(state)}
        >
          Save
        </button>
        <i className="fi fi-tr-square-plus"></i>

        <Link
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          href="/"
        >
          Close
        </Link>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-red active:bg-red-800"
          onClick={clearFormData}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
