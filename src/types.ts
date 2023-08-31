interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

interface StoredFormsType {
  forms: formData[];
  delFormCB: (id: number) => void;
  addFormCB: () => void;
  search: string;
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
  typeHandlerCB: (id: number, value: string) => void;
  removeFieldCB: (id: number) => void;
  labelHandlerCB: (id: number, value: string) => void;
}

export type { formData, formField, LabelledInputType, StoredFormsType };
