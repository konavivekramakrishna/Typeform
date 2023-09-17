type ChangeInputAction = {
  type: "CHANGE_INPUT";
  value: string;
};

type ChangeMultiSelectInputAction = {
  type: "CHANGE_MULTI_SELECT_INPUT";
  value: string[];
};

type SetValueAction = {
  type: "SET_VALUE";
  value: string;
};

type SetNull = {
  type: "SET_NULL";
};

export type PreviewActions =
  | ChangeInputAction
  | ChangeMultiSelectInputAction
  | SetValueAction
  | SetNull;
