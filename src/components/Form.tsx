import React, { useEffect, useRef, useState } from "react";
import LabelledInput from "./LabelledInput";

import { formField, formData } from "../types";

const initialFormFields: formField[] = [
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

const getLocalFormsData: () => formData[] = () => {
  const savedForms = localStorage.getItem("savedForms");
  return savedForms ? JSON.parse(savedForms) : [];
};
const initialState: (id: number) => formData = (id) => {
  const localForms = getLocalFormsData();
  const form = localForms.find((form) => form.id === id);
  if (form) {
    return form;
  }

  const newForm = {
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: initialFormFields,
  };

  saveLocalForms([...localForms, newForm]);
  return newForm;
};

const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

const saveFormData = (currentForm: formData) => {
  const localForms = getLocalFormsData();
  const updateLocalForms = localForms.map((form) =>
    form.id === currentForm.id ? currentForm : form,
  );
  saveLocalForms(updateLocalForms);
};

export default function Form(props: { formId: number }) {
  const [state, setState] = useState(() => initialState(props.formId));
  const [newField, setNewField] = useState("");
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
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          id: Number(new Date()),
          label: newField,
          type: "text",
          value: "",
        },
      ],
    });
    setNewField("");
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

  const addForm = () => {
    const localForms = getLocalFormsData();
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields,
    };
    saveLocalForms([...localForms, newForm]);
    setState(newForm);
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
          value={newField}
          className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="New Field Label"
          onChange={(e) => {
            setNewField(e.target.value);
          }}
        />
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
