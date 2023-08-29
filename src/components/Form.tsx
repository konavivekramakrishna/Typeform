import React, { useEffect, useRef, useState } from "react";
import LabelledInput from "./Inputs/LabelledInput";
import { Input } from "@material-tailwind/react";
import { textFieldTypes } from "../types";
import MultiSelectInputs from "./Inputs/MultiSelectInput";
import RadioInput from "./Inputs/RadioInput";
import TextAreaInput from "./Inputs/TextAreaInput";
import { Textarea } from "@material-tailwind/react";

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
          options: [],
          value: [],
        });
        break;
      case "radio":
        newFormFields.push({
          kind: "radio",
          id: Number(new Date()),
          label: newField.value,
          options: [],
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
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id &&
        (field.kind === "multiselect" || field.kind === "radio")
          ? { ...field, options: [...field.options, option] }
          : field
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
          : field
      ),
    });
  };

  const setFieldVal = (id: number, value: string) => {
    setState({
      ...state,
      formFields: state.formFields.map((field) =>
        field.id === id && field.kind === "text" ? { ...field, value } : field
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
      <div className="mt-4">
        <Input
          crossOrigin={""}
          color="blue"
          label="Form Title"
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

      {state.formFields.map((field) => {
        switch (field.kind) {
          case "text":
            return (
              <LabelledInput
                id={field.id}
                key={field.id}
                value={field.value}
                label={field.label}
                fieldType={field.fieldType}
                removeFieldCB={removeField}
                setFieldValCB={setFieldVal}
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
                removeOptionCB={removeOption}
              ></RadioInput>
            );
            break;
          case "textarea":
            return (
              <TextAreaInput
                fieldType="textarea"
                id={field.id}
                key={field.id}
                value={field.value}
                label={field.label}
                removeFieldCB={removeField}
                setFieldValCB={setFieldVal}
              />
            );
            break;

          default:
            return null;
            break;
          // Or some default behavior
        }
      })}

      <div className="flex justify-between items-center mb-4">
        <Input
          crossOrigin={""}
          label="New Field Label"
          color="blue"
          type="text"
          value={newField.value}
          className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:border-blue-500"
          onChange={(e) => {
            setNewField({
              ...newField,
              value: e.target.value,
            });
          }}
        />
        <select
          value={newField.fieldType}
          className="border-2 m-1  border-gray-300 rounded-md  mt-1  h-10 px-2 text-lg focus:outline-none focus:border-blue-500"
          onChange={(e) => {
            setNewField({
              ...newField,
              fieldType: e.target.value,
            });
          }}
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
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
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

        <a
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          href="/"
        >
          Close
        </a>
      </div>
    </div>
  );
}
