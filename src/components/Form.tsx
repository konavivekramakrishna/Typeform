import React, { useEffect, useRef, useState } from "react";
import LabelledInput from "./Inputs/LabelledInput";
import { Input } from "@material-tailwind/react";
import { textFieldTypes } from "../types";
import MultiSelectInputs from "./Inputs/MultiSelectInput";
import RadioInput from "./Inputs/RadioInput";
import TextAreaInput from "./Inputs/TextAreaInput";

import { Link } from "raviger";

import {
  getLocalFormsData,
  saveLocalForms,
  saveFormData,
  initialState,
} from "../Utils/Storageutils";

export default function Form(props: { formId: number }) {
  const [state, setState] = useState(() => initialState(props.formId));
  const [isEmpty, setIsEmpty] = useState(false);
  const [newField, setNewField] = useState({
    fieldType: "text",
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
      setIsEmpty(true); // Set isEmpty to true if field name is empty
      return;
    }
    setIsEmpty(false); // Reset isEmpty

    let newFormFields = [...state.formFields]; // Create a copy of existing form fields

    switch (newField.fieldType) {
      case "multiselect":
        newFormFields.push({
          kind: "multiselect",
          id: Number(new Date()),
          label: newField.value,
          options: ["Default Option 1", "Default Option 2"],
          value: [],
        });
        break;
      case "radio":
        newFormFields.push({
          kind: "radio",
          id: Number(new Date()),
          label: newField.value,
          options: ["Default Option 1", "Default Option 2"],
          value: "",
        });
        break;

      case "textarea":
        newFormFields.push({
          id: Number(new Date()),
          kind: "textarea",
          label: newField.value,
          value: "",
        });
        break;
      default:
        newFormFields.push({
          id: Number(new Date()),
          kind: "text",
          label: newField.value,
          fieldType: newField.fieldType as textFieldTypes,
          value: "",
        });
        break;
    }

    setState({
      ...state,
      formFields: newFormFields, // Update the formFields array
    });

    setNewField({
      fieldType: "text",
      value: "",
    });
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  const addOption = (id: number, option: string) => {
    const updatedFormFields = state.formFields.map((field) =>
      field.id === id &&
      (field.kind === "multiselect" || field.kind === "radio")
        ? { ...field, options: [...field.options, option] }
        : field,
    );

    const updatedState = {
      ...state,
      formFields: updatedFormFields,
    };

    saveFormData(updatedState);

    setState(updatedState);
  };

  const labelHandle = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id ? { ...field, label: value } : field,
      ),
    });
  };
  const removeOption = (id: number, option: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id &&
        (field.kind === "multiselect" || field.kind === "radio")
          ? { ...field, options: field.options.filter((opt) => opt !== option) }
          : field,
      ),
    });
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
        <label className="p-1 m-1" htmlFor="titleinput">
          Title
        </label>
        <input
          name="titleinput"
          type="text"
          className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter Form Title"
          value={state.title}
          onChange={(e) => {
            setState({ ...state, title: e.target.value });
            changeFormTitle(e.target.value);
          }}
          ref={titleRef}
        />
      </div>

      {state.formFields.map((field) => {
        switch (field.kind) {
          case "text":
            return (
              <LabelledInput
                id={field.id}
                key={field.id}
                type={field.fieldType}
                value={field.value}
                label={field.label}
                labelHandlerCB={labelHandle}
                removeFieldCB={removeField}
              />
            );
            break;

          case "multiselect":
            return (
              <MultiSelectInputs
                id={field.id}
                key={field.id}
                label={field.label}
                removeFieldCB={removeField}
                options={field.options}
                addOptionCB={addOption}
                removeOptionCB={removeOption}
                labelHandlerCB={labelHandle}
              ></MultiSelectInputs>
            );
            break;

          case "radio":
            return (
              <RadioInput
                id={field.id}
                key={field.id}
                label={field.label}
                removeFieldCB={removeField}
                options={field.options}
                addOptionCB={addOption}
                labelHandlerCB={labelHandle}
                removeOptionCB={removeOption}
              ></RadioInput>
            );
            break;
          case "textarea":
            return (
              <TextAreaInput
                type="textarea"
                labelHandlerCB={labelHandle}
                id={field.id}
                key={field.id}
                value={field.value}
                label={field.label}
                removeFieldCB={removeField}
              />
            );
            break;

          default:
            return null;
            break;
        }
      })}

      <div className="flex justify-between items-center mb-4 mt-2">
        <label htmlFor="newFieldLabel" className="mr-2">
          New Field Label
        </label>
        <input
          id="newFieldLabel"
          type="text"
          className="w-1/4 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          value={newField.value}
          onChange={(e) => setNewField({ ...newField, value: e.target.value })}
        />
        <select
          value={newField.fieldType}
          className="w-1/4 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e) =>
            setNewField({ ...newField, fieldType: e.target.value })
          }
        >
          <option value="text">Text</option>
          <option value="radio">Radio</option>
          <option value="multiselect">Multiselect</option>
          <option value="textarea">Textarea</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="checkbox">Checkbox</option>
          <option value="file">File</option>
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={() => addField()}
        >
          Add
        </button>
      </div>
      {isEmpty && (
        <p className="text-sm text-red-500 mt-1">Field name cannot be empty.</p>
      )}

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
      </div>
    </div>
  );
}
