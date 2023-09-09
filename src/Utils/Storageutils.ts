import { formField, formData } from "../types/types";

export const initialFormFields: formField[] = [
  { kind: "text", id: 1, label: "First Name", fieldType: "text", value: "" },
  {
    id: 2,
    kind: "text",
    label: "Last Name",
    fieldType: "text",
    value: "",
  },
  {
    kind: "text",
    id: 3,
    label: "Email",
    fieldType: "email",
    value: "",
  },
  {
    kind: "text",
    id: 4,
    label: "Date of Birth",
    fieldType: "date",
    value: "",
  },
];

export const getLocalFormsData: () => formData[] = () => {
  const savedForms = localStorage.getItem("savedForms");
  return savedForms ? JSON.parse(savedForms) : [];
};

export const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export const saveFormData = (currentForm: formData) => {
  const localForms = getLocalFormsData();
  const updateLocalForms = localForms.map((form) =>
    form.id === currentForm.id ? currentForm : form,
  );
  saveLocalForms(updateLocalForms);
};

export const initialState: (id: number) => formData = (id) => {
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

  return newForm;
};
