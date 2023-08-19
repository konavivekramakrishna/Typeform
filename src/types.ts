interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

interface StoredFormsType {
  forms: formData[];
  delFormCB: (id: number) => void;
  addFormCB: () => void;
  setFormCB: (form: formData) => void;
}

interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

interface LabelledInputType {
  id: number;
  label: string;
  type: string;
  value: string;
  setFieldValCB: (id: number, value: string) => void;
  removeFieldCB: (id: number) => void;
}

export type { formData, formField, LabelledInputType, StoredFormsType };
