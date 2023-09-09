import React, { useEffect, useState, useReducer } from "react";
import { getLocalFormsData } from "../Utils/Storageutils";
import { Link } from "raviger";
import { formField } from "../types/types";
import TextAreaPreview from "./Previews/TextAreaPreview";
import MultiSelectPreview from "./Previews/MultiSelectPreview";
import RadioPreview from "./Previews/RadioPreview";
import Error from "./Error";
import { PreviewActions } from "../types/previewReducerTypes";

const previewReducer = (
  state: { fieldIndex: number; fieldVals: string[] },
  action: PreviewActions
) => {
  switch (action.type) {
    case "setNull": {
      return { ...state, fieldVals: [] };
    }
    case "changeInput": {
      return {
        ...state,
        fieldVals: action.value
          ? [
              ...state.fieldVals.slice(0, state.fieldIndex),
              action.value,
              ...state.fieldVals.slice(state.fieldIndex + 1),
            ]
          : state.fieldVals,
      };
    }
    case "setIndex":
      return { ...state, fieldIndex: action.value };
    case "changeMultiSelect":
      const updatedFieldVals = [...state.fieldVals];
      updatedFieldVals[state.fieldIndex] = action.value
        .filter((v: string) => v !== "")
        .join(" , ");
      return { ...state, fieldVals: updatedFieldVals };
    default:
      return state;
  }
};

export default function PreviewForm(props: { formId: number }) {
  const initialState = {
    fieldIndex: 0,
    fieldVals: [],
  };
  const [formState, dispatch] = useReducer(previewReducer, initialState);

  const [state] = useState(() => {
    return getLocalFormsData().filter((form) => form.id === props.formId)[0];
  });

  const title = state?.title;

  const isLastField = formState.fieldIndex === state?.formFields?.length - 1;

  const renderField = (question: formField) => {
    switch (question.kind) {
      case "text":
        return (
          <>
            <label className="block text-lg font-medium mb-2">
              {question.label}
            </label>
            <input
              value={formState.fieldVals[formState.fieldIndex] || ""}
              onChange={(e) => {
                dispatch({ type: "changeInput", value: e.target.value });
              }}
              type={question.fieldType}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        );
      case "textarea":
        return (
          <TextAreaPreview
            label={question.label}
            value={formState.fieldVals[formState.fieldIndex] || ""}
            SetInputValueCB={(value) => {
              dispatch({ type: "changeInput", value });
            }}
          />
        );
      case "multiselect":
        return (
          <MultiSelectPreview
            label={question.label}
            options={question.options}
            value={
              formState.fieldVals[formState.fieldIndex]
                ? formState.fieldVals[formState.fieldIndex].split(", ")
                : []
            }
            SetMultiSelectValCB={(value) =>
              dispatch({ type: "changeMultiSelect", value })
            }
          />
        );
      case "radio":
        return (
          <RadioPreview
            label={question.label}
            options={question.options}
            value={formState.fieldVals[formState.fieldIndex] || ""}
            SetRadioValCB={(value) => {
              dispatch({ type: "changeInput", value });
            }}
          />
        );
      default:
        return null;
    }
  };

  if (!state) {
    return <Error />;
  }

  return (
    <div className="mx-auto w-full p-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      {state.formFields.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">No questions to display.</p>
          <Link
            href="/"
            className="inline-block mt-4 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            Go Back
          </Link>
        </div>
      ) : (
        <>
          {" "}
          <div className="mb-4">
            {renderField(state.formFields[formState.fieldIndex])}
          </div>
          <div className="flex justify-between items-center">
            <button
              className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50"
              disabled={formState.fieldIndex === 0}
              onClick={() => {
                dispatch({ type: "setIndex", value: formState.fieldIndex - 1 });
              }}
            >
              <i className="fi fi-ss-angle-double-left"></i>
            </button>

            <button
              className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50"
              disabled={formState.fieldIndex === state?.formFields?.length - 1}
              onClick={() => {
                dispatch({ type: "setIndex", value: formState.fieldIndex + 1 });
              }}
            >
              <i className="fi fi-ss-angle-double-right"></i>
            </button>

            {isLastField && (
              <Link
                href="/"
                className="px-4 py-2 rounded-lg bg-green-500 text-white"
                onClick={() => {
                  console.log(formState.fieldVals);
                }}
              >
                <i className="fi fi-br-check m-1 p-1"></i>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
