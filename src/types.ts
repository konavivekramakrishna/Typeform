type formData = {
  id: number;
  title: string;
  formFields: formField[];
};

export type RadioPreviewProps = {
  options: string[];
  value: string;
  label: string;
  SetRadioValCB: (value: string) => void;
};

type MultiSelectInputType = {
  id: number;
  label: string;
  options: string[];
  key: number;
  labelHandlerCB: (id: number, value: string) => void;
  removeFieldCB: (id: number) => void;
  addOptionCB: (id: number, option: string) => void;
  removeOptionCB: (id: number, option: string) => void;
};

export type MultiSelectPreviewProps = {
  options: string[];
  value: string[];
  label: string;
  SetMultiSelectValCB: (value: string[]) => void;
};

export type RadioInputType = {
  id: number;
  label: string;
  options: string[];
  key: number;
  labelHandlerCB: (id: number, value: string) => void;
  removeFieldCB: (id: number) => void;
  addOptionCB: (id: number, option: string) => void;
  removeOptionCB: (id: number, option: string) => void;
};

type StoredFormsType = {
  forms: formData[];
  delFormCB: (id: number) => void;
  addFormCB: () => void;
  search: string;
};

export type textFieldTypes =
  | "text"
  | "date"
  | "checkbox"
  | "file"
  | "email"
  | "password"
  | "number";

export type TextArea = {
  kind: "textarea";
  id: number;
  label: string;
  value: string;
};

export type TextField = {
  kind: "text";
  id: number;
  label: string;
  fieldType: textFieldTypes;
  value: string;
};

export type MultiSelectField = {
  kind: "multiselect";
  id: number;
  label: string;
  options: string[];
  value: string[];
};

// type RangeField = {
//   kind: "range";
//   id: number;
//   label: string;
//   min: number;
//   max: number;
//   value: number;
// };

export type RadioField = {
  kind: "radio";
  id: number;
  label: string;
  options: string[];
  value: string;
};

export type formField = TextField | MultiSelectField | RadioField | TextArea;

//RadioField | RangeField;

interface LabelledInputType {
  id: number;
  label: string;
  type: string;
  value: string;

  removeFieldCB: (id: number) => void;
  labelHandlerCB: (id: number, value: string) => void;
}

export interface TextAreaInputType {
  id: number;
  label: string;
  type: string;
  value: string;

  removeFieldCB: (id: number) => void;
  labelHandlerCB: (id: number, value: string) => void;
}

export type {
  formData,
  LabelledInputType,
  StoredFormsType,
  MultiSelectInputType,
};
