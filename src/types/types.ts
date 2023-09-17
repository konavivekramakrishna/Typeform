import { fieldOption } from "./formReducerTypes";

export type RadioPreviewProps = {
  options: string[];
  value: string;
  label: string;
  SetRadioValCB: (value: string) => void;
};

export type MultiSelectInputType = {
  id: number;
  label: string;
  options: string[];

  labelHandlerCB: (value: string) => void;
  removeFieldCB: (id: number) => void;
  addOptionCB: (option: string) => void;
  removeOptionCB: (option: string) => void;
};

export type MultiSelectPreviewProps = {
  options: fieldOption[];
  value: string[];
  label: string;
  SetMultiSelectValCB: (value: string[]) => void;
};

export type RadioInputType = {
  id: number;
  label: string;
  options: fieldOption[];
  value: string;

  labelHandlerCB: (id: number, value: string) => void; // Add this line
  removeFieldCB: (id: number) => void;
  addOptionCB: (option: string) => void;
  removeOptionCB: (option: string) => void;
};

export type StoredFormsType = {
  forms: formData[];
  delFormCB: (id: number) => void;
  addFormCB: () => void;
  search: string;
};

export type TextField = {
  kind: "TEXT";
  id: number;
  label: string;
  value: string;
};

export type MultiSelectField = {
  kind: "DROPDOWN";
  id: number;
  label: string;
  options: fieldOption[];
  value: string[];
};

export type RadioField = {
  kind: "RADIO";
  id: number;
  label: string;
  options: fieldOption[];
  value: string;
};

export type formField = TextField | MultiSelectField | RadioField;

export interface LabelledInputType {
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
  labelHandlerCB: (value: string) => void;
}

export type User = any;

export type formData = {
  id: number;
  title: string;
  description?: string;
  formFields: formField[];
};

export type Form = {
  description?: string;
  is_public: boolean;
  id?: number;
  title: string;
};

export type formAnswers = {
  form_field: number;
  value: string;
};
