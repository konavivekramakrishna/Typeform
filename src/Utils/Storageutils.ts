import { formField, formData } from "../types";

export const initialFormFields: formField[] = [
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

  saveLocalForms([...localForms, newForm]);
  return newForm;
};
