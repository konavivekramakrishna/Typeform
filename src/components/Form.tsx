import React, { useEffect, useRef, useReducer, useState } from "react";
import LabelledInput from "./Inputs/LabelledInput";
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
import { formData, formField, textFieldTypes } from "../types/types";
import { FormAction } from "../types/formReducerTypes";

const reducer = (state: formData, action: FormAction) => {
  switch (action.type) {
    case "editFormTitle":
      return {
        ...state,
        title: action.title,
      };

    case "addField":
      return {
        ...state,
        formFields: [...state.formFields, action.field],
      };

    case "removeField":
      return {
        ...state,
        formFields: state.formFields.filter((field) => field.id !== action.id),
      };

    case "addOption":
      return {
        ...state,
        formFields: state.formFields.map((field) =>
          field.id === action.id &&
          (field.kind === "multiselect" || field.kind === "radio")
            ? { ...field, options: [...field.options, action.option] }
            : field
        ),
      };

    case "removeOption":
      return {
        ...state,
        formFields: state.formFields.map((field) =>
          field.id === action.id &&
          (field.kind === "multiselect" || field.kind === "radio")
            ? {
                ...field,
                options: field.options.filter((opt) => opt !== action.option),
              }
            : field
        ),
      };

    case "editFieldLabel":
      return {
        ...state,
        formFields: state.formFields.map((field) =>
          field.id === action.id ? { ...field, label: action.label } : field
        ),
      };

    default:
      return state;
  }
};

export default function Form(props: { formId: number }) {
  const [state, dispatch] = useReducer(reducer, initialState(props.formId));
  const [isEmpty, setIsEmpty] = useState(false);
  const [newField, setNewField] = useState({
    fieldType: "text",
    value: "",
  });
  const titleRef = useRef<HTMLInputElement | null>(null);

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

  const handleAddField = () => {
    if (newField.value.trim() === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);

      let newForm: formField;

      switch (newField.fieldType) {
        case "radio":
          newForm = {
            kind: "radio",
            id: Date.now(),
            label: newField.value,
            options: ["Sample Option 1", "Sample Option 2"],
            value: "",
          };
          break;
        case "multiselect":
          newForm = {
            kind: "multiselect",
            id: Date.now(),
            label: newField.value,
            options: ["Sample Option 1", "Sample Option 2"],
            value: [],
          };
          break;
        default:
          newForm = {
            kind: "text",
            id: Date.now(),
            label: newField.value,
            fieldType: newField.fieldType as textFieldTypes,
            value: "",
          };
      }

      dispatch({
        type: "addField",
        field: newForm,
      });

      setNewField({
        fieldType: "text",
        value: "",
      });
    }
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
            dispatch({ type: "editFormTitle", title: e.target.value });
            const localForms = getLocalFormsData();
            const newLocalForms = localForms.map((form) =>
              form.id === state.id ? { ...form, title: e.target.value } : form
            );
            saveLocalForms(newLocalForms);
          }}
          ref={titleRef}
        />
      </div>

      {state.formFields.map((field) => {
        switch (field.kind) {
          case "text":
            return (
              <div key={field.id}>
                <LabelledInput
                  id={field.id}
                  type={field.fieldType}
                  value={field.value}
                  label={field.label.toString()}
                  labelHandlerCB={(value) =>
                    dispatch({
                      type: "editFieldLabel",
                      id: field.id,
                      label: value.toString(),
                    })
                  }
                  removeFieldCB={() =>
                    dispatch({ type: "removeField", id: field.id })
                  }
                />
              </div>
            );

          case "multiselect":
            return (
              <div key={field.id}>
                <MultiSelectInputs
                  id={field.id}
                  label={field.label}
                  removeFieldCB={() =>
                    dispatch({ type: "removeField", id: field.id })
                  }
                  options={field.options}
                  addOptionCB={(option) =>
                    dispatch({
                      type: "addOption",
                      id: field.id,
                      option: option.toString(),
                    })
                  }
                  removeOptionCB={(option) =>
                    dispatch({
                      type: "removeOption",
                      id: field.id,
                      option: option.toString(),
                    })
                  }
                  labelHandlerCB={(value) =>
                    dispatch({
                      type: "editFieldLabel",
                      id: field.id,
                      label: value.toString(),
                    })
                  }
                  key={0}
                ></MultiSelectInputs>
              </div>
            );

          case "radio":
            return (
              <div key={field.id}>
                <RadioInput
                  id={field.id}
                  label={field.label}
                  removeFieldCB={() =>
                    dispatch({ type: "removeField", id: field.id })
                  }
                  options={field.options}
                  addOptionCB={(option) =>
                    dispatch({
                      type: "addOption",
                      id: field.id,
                      option: option.toString(),
                    })
                  }
                  labelHandlerCB={(value) =>
                    dispatch({
                      type: "editFieldLabel",
                      id: field.id,
                      label: value.toString(),
                    })
                  }
                  removeOptionCB={(option) =>
                    dispatch({
                      type: "removeOption",
                      id: field.id,
                      option: option.toString(),
                    })
                  }
                  key={0}
                ></RadioInput>
              </div>
            );

          case "textarea":
            return (
              <div key={field.id}>
                <TextAreaInput
                  type="textarea"
                  labelHandlerCB={(value) =>
                    dispatch({
                      type: "editFieldLabel",
                      id: field.id,
                      label: value.toString(),
                    })
                  }
                  id={field.id}
                  value={field.value}
                  label={field.label}
                  removeFieldCB={() =>
                    dispatch({ type: "removeField", id: field.id })
                  }
                />
              </div>
            );

          default:
            return null;
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
          onClick={handleAddField} // Call the handleAddField function
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
          onClick={() => {
            saveFormData(state);
          }}
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
