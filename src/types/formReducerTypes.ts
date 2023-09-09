import { formField } from "./types";

type RemoveField = {
  type: "removeField";
  id: number;
};

type AddField = {
  type: "addField";
  field: formField;
};

type AddOption = {
  type: "addOption";
  id: number;
  option: string;
};

type EditFieldLabel = {
  type: "editFieldLabel";
  id: number;
  label: string;
};

type EditFormTitle = {
  type: "editFormTitle";
  title: string;
};

type RemoveOption = {
  type: "removeOption";
  id: number;
  option: string;
};

export type FormAction =
  | RemoveField
  | AddField
  | AddOption
  | EditFieldLabel
  | EditFormTitle
  | RemoveOption;
