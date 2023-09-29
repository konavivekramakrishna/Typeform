import React, { useState, useReducer, useEffect } from "react";
import { Link, navigate } from "raviger";
import MultiSelectPreview from "./Previews/MultiSelectPreview";
import Error from "./Error";
import { PreviewActions } from "../types/previewReducerTypes";
import { fetchFormData, fetchFormFields, formSubmit } from "../Utils/apiUtils";
import { formAnswers, formField } from "../types/types";
import RadioPreview from "./Previews/RadioPreview";

const previewReducer = (state: string, action: PreviewActions): string => {
  switch (action.type) {
    case "SET_VALUE":
      return action.value;
    case "CHANGE_MULTI_SELECT_INPUT":
      return action.value.filter((v: string) => v !== "").join(" | ");
    case "SET_NULL":
      return "";
    case "CHANGE_INPUT":
      return action.value;
    default:
      return state;
  }
};

const getInitialState = async (id: number) => {
  try {
    const [formFields, data] = await Promise.all([
      fetchFormFields(id),
      fetchFormData(id),
    ]);

    if (!data || !formFields || formFields.results.length === 0) {
      return {
        id: 1,
        title: "No title",
        formFields: [],
      };
    }

    return {
      id: data.id,
      title: data.title,
      formFields: formFields.results,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default function PreviewForm(props: { formId: number }) {
  const [state, setState] = useState<{
    id: number;
    title: string;
    formFields: formField[];
  } | null>(null);
  const [form, setForm] = useState<formAnswers[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [stateFormIndex, setStateFormIndex] = useState(0);
  const [inputVal, inputDispatch] = useReducer(previewReducer, "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialState = await getInitialState(props.formId);
        setState(initialState);
        setForm([]);
      } catch (error) {
        setNotFound(true);
      }
    };

    fetchData();
  }, [props.formId]);

  useEffect(() => {
    if (state) {
      setForm((form) => {
        const newForm = [...form];
        newForm[stateFormIndex] = {
          form_field: state.formFields[stateFormIndex]?.id || 0,
          value: inputVal,
        };
        return newForm;
      });
    }
  }, [state, stateFormIndex, inputVal]);

  const title = state?.title;

  useEffect(() => {
    const fetchFormDetailsAndFields = async () => {
      try {
        const formData = await fetchFormData(props.formId);
        const formFields = await fetchFormFields(props.formId);

        setState((prevState) => ({
          ...prevState,
          id: formData.id,
          title: formData.title,
          formFields: formFields.results,
        }));
      } catch (error) {
        setNotFound(true);
        console.error(error);
      }
    };

    fetchFormDetailsAndFields();
  }, [props.formId]);

  const renderField = (question: formField) => {
    switch (question.kind) {
      case "DROPDOWN":
        return (
          <MultiSelectPreview
            options={question.options}
            inputValue={inputVal}
            setMultiSelectValueCB={(value) => {
              inputDispatch({ type: "CHANGE_MULTI_SELECT_INPUT", value });
            }}
            label={question.label}
          />
        );
      case "RADIO":
        return (
          <RadioPreview
            options={question.options}
            value={inputVal}
            SetRadioValCB={(value: string) => {
              inputDispatch({ type: "CHANGE_INPUT", value });
            }}
            label={question.label}
          />
        );

      default:
        return (
          <>
            <label className="block text-lg font-medium mb-2">
              {question.label}
            </label>
            <input
              value={inputVal}
              type={question.kind}
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                inputDispatch({ type: "CHANGE_INPUT", value: e.target.value });
              }}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        );
    }
  };

  if (state === null) {
    return <div>Loading...</div>;
  }

  if (notFound || !state.formFields || state.formFields.length === 0) {
    return <Error />;
  }

  const isLastField = stateFormIndex === state.formFields.length - 1;

  const isSubmitDisabled =
    stateFormIndex !== state.formFields.length - 1 || inputVal.length === 0;

  const handleNextClick = () => {
    if (form[stateFormIndex + 1]) {
      inputDispatch({
        type: "SET_VALUE",
        value: form[stateFormIndex + 1].value,
      });
    } else {
      inputDispatch({ type: "SET_NULL" });
    }
    setStateFormIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = () => {
    setStateFormIndex((prevIndex) => prevIndex + 1);

    formSubmit(props.formId, form, {
      title: state.title,
    });
    navigate("/");
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isLastField) {
        handleSubmit();
      } else {
        handleNextClick();
      }
    }
  };
  const isNextDisabled =
    stateFormIndex === state.formFields.length - 1 || inputVal.length === 0;

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
          <div className="mb-4">
            {renderField(state.formFields[stateFormIndex])}
          </div>
          <div className="flex justify-between items-center">
            <button
              className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50"
              disabled={stateFormIndex === 0}
              onClick={() => {
                setStateFormIndex((prevIndex) => prevIndex - 1);
                if (form[stateFormIndex - 1]) {
                  inputDispatch({
                    type: "SET_VALUE",
                    value: form[stateFormIndex - 1].value,
                  });
                } else {
                  inputDispatch({ type: "SET_NULL" });
                }
              }}
            >
              <i className="fi fi-ss-angle-double-left"></i>
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50"
              disabled={isNextDisabled}
              onClick={handleNextClick}
            >
              <i className="fi fi-ss-angle-double-right"></i>
            </button>
            {isLastField && (
              <button
                disabled={isSubmitDisabled}
                className="px-4 py-2 rounded-lg bg-green-500 text-white"
                onClick={handleSubmit}
              >
                <i className="fi fi-br-check m-1 p-1"></i>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
