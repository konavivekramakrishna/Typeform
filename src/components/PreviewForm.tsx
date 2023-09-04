import React, { useEffect, useState } from "react";
import { getLocalFormsData } from "../Utils/Storageutils";
import { Link } from "raviger";
import { formField } from "../types";
import TextAreaPreview from "./Previews/TextAreaPreview";
import MultiSelectPreview from "./Previews/MultiSelectPreview";
import RadioPreview from "./Previews/RadioPreview";

export default function PreviewForm(props: { formId: number }) {
  const [fieldIndex, setFieldIndex] = useState(0);
  const [form, setForm] = useState<string[]>([]);
  const [fieldVals, setFieldVals] = useState<string[]>([]);

  const setMultiSelectVal = (index: number, value: string[]) => {
    const newValue = value.join(", ");
    const updatedFieldVals = [...fieldVals];
    updatedFieldVals[index] = newValue;
    setFieldVals(updatedFieldVals);
  };

  const setRadioVal = (index: number, value: string) => {
    const updatedFieldVals = [...fieldVals];
    updatedFieldVals[index] = value;
    setFieldVals(updatedFieldVals);
  };

  const [state] = useState(() => {
    return getLocalFormsData().filter((form) => form.id === props.formId)[0];
  });

  const title = state.title;

  useEffect(() => {
    setForm(fieldVals);
  }, [fieldVals]);

  const isLastField = fieldIndex === state.formFields.length - 1;

  const renderField = (question: formField) => {
    switch (question.kind) {
      case "text":
        return (
          <>
            <label className="block text-lg font-medium mb-2">
              {question.label}
            </label>
            <input
              value={fieldVals[fieldIndex] || ""}
              onChange={(e) => {
                const newFieldVals = [...fieldVals];
                newFieldVals[fieldIndex] = e.target.value;
                setFieldVals(newFieldVals);
              }}
              type={question.kind}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        );
      case "textarea":
        return (
          <TextAreaPreview
            label={question.label}
            value={fieldVals[fieldIndex] || ""}
            SetInputValueCB={(value) => {
              const newFieldVals = [...fieldVals];
              newFieldVals[fieldIndex] = value;
              setFieldVals(newFieldVals);
            }}
          />
        );
      case "multiselect":
        return (
          <MultiSelectPreview
            label={question.label}
            options={question.options}
            value={
              fieldVals[fieldIndex] ? fieldVals[fieldIndex].split(", ") : []
            }
            SetMultiSelectValCB={(value) =>
              setMultiSelectVal(fieldIndex, value)
            }
          />
        );
      case "radio":
        return (
          <RadioPreview
            label={question.label}
            options={question.options}
            value={fieldVals[fieldIndex] || ""}
            SetRadioValCB={(value) => setRadioVal(fieldIndex, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full p-5   rounded-lg shadow-md">
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
            {renderField(state.formFields[fieldIndex])}
          </div>
          <div className="flex justify-between items-center">
            <button
              className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50"
              disabled={fieldIndex === 0}
              onClick={() => {
                setFieldIndex((prevIndex) => prevIndex - 1);
              }}
            >
              <i className="fi fi-ss-angle-double-left"></i>
            </button>

            <button
              className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50"
              disabled={fieldIndex === state.formFields.length - 1}
              onClick={() => {
                setFieldIndex((prevIndex) => prevIndex + 1);
              }}
            >
              <i className="fi fi-ss-angle-double-right"></i>
            </button>

            {isLastField && (
              <Link
                href="/"
                className="px-4 py-2 rounded-lg bg-green-500 text-white"
                onClick={() => {
                  console.log(form);
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
