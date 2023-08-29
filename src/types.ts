type formData = {
  id: number;
  title: string;
  formFields: formField[];
};

type StoredFormsType = {
  forms: formData[];
  delFormCB: (id: number) => void;
  addFormCB: () => void;
  search: string;
};

type textFieldTypes =
  | "text"
  | "date"
  | "checkbox"
  | "file"
  | "email"
  | "password"
  | "number"
  | "tel";

type TextField = {
  kind: "text";
  id: number;
  label: string;
  fieldType: textFieldTypes;
  value: string;
};

type DropdownField = {
  kind: "dropdown";
  id: number;
  label: string;
  options: string[];
  value: string;
};

export type formField = TextField | DropdownField;

type LabelledInputType = {
  id: number;
  label: string;
  fieldType: string;
  value: string;
  setFieldValCB: (id: number, value: string) => void;
  removeFieldCB: (id: number) => void;
};

export type { formData, LabelledInputType, StoredFormsType };
