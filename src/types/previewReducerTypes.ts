import React from "react";

type ChangeInputValue = {
  type: "changeInput";
  value: string;
};

type ChangeMultiSelectValue = {
  type: "changeMultiSelect";
  value: string[];
};

type SetIndex = {
  type: "setIndex";
  value: number; // Assuming this should be a number, not a string
};

type SetNull = {
  type: "setNull";
};

export type PreviewActions =
  | ChangeInputValue
  | ChangeMultiSelectValue
  | SetIndex
  | SetNull;
