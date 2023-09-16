import { formField } from "./types";

export type fieldOption = {
  id: number;
  option: string;
};

type AddFieldAction = {
  type: "addField";
  kind: formField["kind"];
  newField: formField;
  label: string;
};

type RemoveFieldAction = {
  type: "removeField";
  id: number;
};

type UpdateFormTitleAction = {
  type: "updateFormTitle";
  title: string;
};

type UpdateLabelAction = {
  type: "updateLabel";
  id: number;
  value: string;
};

type UpdateFieldOptionsAction = {
  type: "updateFieldOptions";
  id: number;
  options: fieldOption[];
};

type SetFieldsAction = {
  type: "setField";
  field: formField[];
};

type SetFormDataAction = {
  type: "setFormData";
  id: number;
  title: string;
  description: string;
};

export type FormAction =
  | AddFieldAction
  | RemoveFieldAction
  | UpdateFormTitleAction
  | UpdateLabelAction
  | UpdateFieldOptionsAction
  | SetFieldsAction
  | SetFormDataAction;
