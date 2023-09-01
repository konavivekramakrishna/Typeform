import React, { useEffect, useState } from "react";
import { getLocalFormsData } from "../Utils/Storageutils";
import { Link } from "raviger";

export default function PreviewForm(props: { formId: number }) {
  const [fieldIndex, setFieldIndex] = useState(0);
  const [form, setForm] = useState<string[]>([]);
  const [fieldVal, setFieldVal] = useState("");

  const [state] = useState(() => {
    return getLocalFormsData().filter((form) => form.id === props.formId)[0];
  });

  const title = state.title;

  useEffect(() => {
    setForm((prevForm) => {
      const newForm = [...prevForm];
      newForm[fieldIndex] = fieldVal;
      return newForm;
    });
  }, [fieldIndex, fieldVal]);

  const isLastField = fieldIndex === state.formFields.length - 1;

  const handlePrevField = () => {
    if (fieldIndex > 0) {
      setFieldIndex((prevIndex) => prevIndex - 1);
      setFieldVal(form[fieldIndex - 1] || "");
    }
  };

  const handleNextField = () => {
    if (fieldIndex < state.formFields.length - 1) {
      setFieldIndex((prevIndex) => prevIndex + 1);
      setFieldVal(form[fieldIndex + 1] || "");
    }
  };

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
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            {state.formFields[fieldIndex].label}
          </label>
          <input
            value={fieldVal}
            onChange={(e) => {
              setFieldVal(e.target.value);
            }}
            type={state.formFields[fieldIndex].type}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {state.formFields.length > 0 && (
        <div className="flex justify-between items-center">
          <button
            className={`px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 ${
              fieldIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            disabled={fieldIndex === 0}
            onClick={handlePrevField}
          >
            <i className="fi fi-ss-angle-double-left"></i>
          </button>

          <button
            className={`px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 ${
              fieldIndex === state.formFields.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            disabled={fieldIndex === state.formFields.length - 1}
            onClick={handleNextField}
          >
            <i className="fi fi-ss-angle-double-right"></i>
          </button>

          {isLastField && (
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
              onClick={() => {
                setFieldIndex((prevIndex) => prevIndex + 1);
                console.log(form);
              }}
            >
              <i className="fi fi-br-check m-1 p-1"></i>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
