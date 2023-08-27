import React, { useEffect, useRef, useState } from "react";
import LabelledInput from "./LabelledInput";
import navigate from "raviger";

import {
  getLocalFormsData,
  saveLocalForms,
  saveFormData,
  initialState,
} from "../Utils/Storageutils";

export default function Form(props: { formId: number }) {
  const [state, setState] = useState(() => initialState(props.formId));
  const [newField, setNewField] = useState({
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
    if (newField.value.trim() === "") {
      // Prevent adding empty labels
      return;
    }

    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField.value,
          type: newField.type,
          value: "",
        },
      ],
    });
    setNewField({
      type: "text",
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

  const setFieldVal = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, value } : field,
      ),
    });
  };

  const delForm = (id: number) => {
    const localForms = getLocalFormsData();
    if (localForms.length > 1) {
      const newLocalForms = localForms.filter((form) => form.id !== id);
      if (state.id === id) {
        setState(newLocalForms[0]);
      } else {
        const currentFormIndex = newLocalForms.findIndex(
          (form) => form.id === state.id,
        );
        setState(newLocalForms[currentFormIndex]);
      }
      saveLocalForms(newLocalForms);
    }
  };

  const changeFormTitle = (title: string) => {
    const localForms = getLocalFormsData();
    const newLocalForms = localForms.map((form) =>
      form.id === state.id ? { ...form, title } : form,
    );
    saveLocalForms(newLocalForms);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <div className="mt-4">
        <input
          type="text"
          value={state.title}
          className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter Form Title"
          onChange={(e) => {
            setState({ ...state, title: e.target.value });
            changeFormTitle(e.target.value); // Update the title in local storage
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
          removeFieldCB={removeField}
          setFieldValCB={setFieldVal}
        />
      ))}

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={newField.value}
          className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="New Field Label"
          onChange={(e) => {
            setNewField({
              ...newField,
              value: e.target.value,
            });
          }}
        />
        <select
          className="border-2 m-1  border-gray-300 rounded-md  mt-1  h-10 px-2 text-lg focus:outline-none focus:border-blue-500"
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

        <a
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          href="/"
        >
          Close
        </a>
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
