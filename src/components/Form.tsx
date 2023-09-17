import { useEffect, useRef, useReducer, useState } from "react";
import LabelledInput from "./Inputs/LabelledInput";
import MultiSelectInputs from "./Inputs/MultiSelectInput";
import RadioInput from "./Inputs/RadioInput";
import { Link, navigate } from "raviger";
import {
  MultiSelectField,
  RadioField,
  TextField,
  formData,
  formField,
} from "../types/types";
import { FormAction } from "../types/formReducerTypes";
import {
  fetchFormFields,
  fetchFormData,
  addFieldToForm,
  deleteField,
  updateField,
  updateTitle,
  updateFormField,
} from "../Utils/apiUtils";

const reducer = (state: formData, action: FormAction): formData => {
  switch (action.type) {
    case "addField":
      return {
        ...state,
        formFields: [...state.formFields, action.newField],
      };

    case "removeField":
      deleteField(state.id, action.id);
      return {
        ...state,
        formFields: state.formFields.filter((field) => field.id !== action.id),
      };

    case "updateFormTitle":
      return {
        ...state,
        title: action.title,
      };

    case "updateLabel": {
      const { id, value } = action;
      if (value.trim() === "") {
        return state;
      }
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (field.id === Number(id)) {
            if (field.kind === "DROPDOWN" || field.kind === "RADIO") {
              return {
                ...field,
                label: value,
                value: [value],
              } as unknown as RadioField;
            } else {
              return { ...field, label: value, value } as
                | TextField
                | MultiSelectField;
            }
          }
          return field;
        }),
      };
    }

    case "updateFieldOptions": {
      const validOptions = action.options
        ? action.options.filter((option) => option.option.trim() !== "")
        : [];
      updateField(state.id, Number(action.id), { options: validOptions });
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          if (
            field.id === Number(action.id) &&
            (field.kind === "DROPDOWN" || field.kind === "RADIO")
          ) {
            return { ...field, options: validOptions };
          }
          return field;
        }),
      };
    }

    case "setField":
      return {
        ...state,
        formFields: action.field,
      };

    case "setFormData":
      return {
        ...state,
        id: action.id,
        title: action.title,
      };

    default:
      return state;
  }
};

const fetchForm = (id: number, dispatch: React.Dispatch<FormAction>) => {
  fetchFormData(id).then((res) => {
    dispatch({
      type: "setFormData",
      id: id,
      title: res.title,
      description: res.description,
    });
  });

  fetchFormFields(id).then((res) => {
    dispatch({
      type: "setField",
      field: res.results,
    });
  });
};

export default function Form(props: { formId: number }) {
  const [state, dispatch] = useReducer(reducer, {
    id: props.formId,
    title: "",
    formFields: [],
  });

  const [isEmpty, setIsEmpty] = useState(false);
  const [kind, setKind] = useState<formField["kind"]>("TEXT");

  const [newField, setNewField] = useState({
    fieldType: "TEXT",
    value: "",
  });
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchForm(props.formId, dispatch);
    titleRef.current?.focus();

    return () => {
      document.title = "React App";
    };
  }, [props.formId, state.id]);

  useEffect(() => {
    if (state.id === props.formId) {
      navigate(`/forms/${state.id}`);
    }
  }, [state.id, props.formId]);

  useEffect(() => {
    if (state.title === "" || state.id === 0) return;
    const timeout = setTimeout(() => {
      updateTitle(props.formId, state.title);
      console.log("Title Updated");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [props.formId, state.title, state.id]);

  const addFormField = async (
    formID: number,
    label: string,
    kind: formField["kind"]
  ) => {
    if (label.trim() === "") {
      setIsEmpty(true); // Show error message
      return;
    }

    setIsEmpty(false); // Clear error message
    try {
      const data = await addFieldToForm(formID, {
        label: label,
        kind: kind,
        ...(kind === "TEXT" && {
          meta: {
            description: {
              fieldType: "text",
            },
          },
        }),
        ...((kind === "DROPDOWN" || kind === "RADIO") && {
          options: [],
        }),
      });

      dispatch({
        type: "addField",
        label: label,
        kind: kind,
        newField: data,
      });

      const options = [
        { option: "Default Option 1", id: Date.now() },
        {
          option: "Default Option 2",
          id: Date.now() + 1,
        },
      ];

      if (kind === "DROPDOWN" || kind === "RADIO") {
        updateField(formID, data.id, {
          options: [options[0], options[1]],
        });
        dispatch({
          type: "updateFieldOptions",
          id: data.id,
          options: [options[0], options[1]],
        });
      }

      setNewField({ ...newField, value: "" });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <div className="mt-4">
        <label className="p-1 m-1" htmlFor="titleinput">
          Title
        </label>
        <input
          name="titleinput"
          type="text"
          className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter Form Title"
          value={state.title}
          onChange={(e) => {
            dispatch({ type: "updateFormTitle", title: e.target.value });
          }}
          ref={titleRef}
        />
      </div>

      {state.formFields.map((field) => {
        switch (field.kind) {
          case "TEXT":
            return (
              <div key={field.id}>
                <LabelledInput
                  id={field.id}
                  type="TEXT"
                  value={field.value}
                  label={field.label.toString()}
                  labelHandlerCB={(id, value) => {
                    updateFormField(state.id, {
                      ...field,
                      label: value,
                    });
                    if (value !== field.label)
                      dispatch({
                        type: "updateLabel",
                        id: id,
                        value: value,
                      });
                  }}
                  removeFieldCB={(id) =>
                    dispatch({ type: "removeField", id: id })
                  }
                />
              </div>
            );

          case "DROPDOWN":
            return (
              <div key={field.id}>
                <MultiSelectInputs
                  id={field.id}
                  label={field.label}
                  removeFieldCB={() =>
                    dispatch({ type: "removeField", id: field.id })
                  }
                  options={field.options}
                  updateOptionsCB={(id, options) => {
                    if (options !== field.options) {
                      dispatch({
                        type: "updateFieldOptions",
                        id: id,
                        options: options,
                      });
                    }
                  }}
                  labelHandlerCB={(id: number, value: string) => {
                    updateFormField(state.id, {
                      ...field,
                      label: value,
                    });
                    if (value !== field.label) {
                      dispatch({
                        type: "updateLabel",
                        id: id,
                        value: value,
                      });
                    }
                  }}
                ></MultiSelectInputs>
              </div>
            );

          case "RADIO":
            return (
              <div key={field.id}>
                <RadioInput
                  id={field.id}
                  label={field.label}
                  removeFieldCB={() =>
                    dispatch({ type: "removeField", id: field.id })
                  }
                  options={field.options}
                  updateOptionsCB={(id, options) => {
                    if (options !== field.options) {
                      dispatch({
                        type: "updateFieldOptions",
                        id: id,
                        options: options,
                      });
                    }
                  }}
                  labelHandlerCB={(id: number, value: string) => {
                    updateFormField(state.id, {
                      ...field,
                      label: value,
                    });
                    if (value !== field.label) {
                      dispatch({
                        type: "updateLabel",
                        id: id,
                        value: value,
                      });
                    }
                  }}
                ></RadioInput>
              </div>
            );

          default:
            return null;
        }
      })}

      <div className="flex justify-between items-center mb-4 mt-2">
        <label htmlFor="newFieldLabel" className="mr-2">
          New Field Label
        </label>
        <input
          id="newFieldLabel"
          type="text"
          className="w-1/4 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          value={newField.value}
          onChange={(e) => setNewField({ ...newField, value: e.target.value })}
        />
        <select
          className="w-1/4 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          value={kind}
          onChange={(e) => {
            setKind(e.target.value as formField["kind"]);
          }}
        >
          <option value="TEXT">Text</option>
          <option value="RADIO">Radio</option>
          <option value="DROPDOWN">Dropdown</option>
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={() => {
            addFormField(state.id, newField.value, kind);
            setNewField({ ...newField, value: "" });
            setKind("TEXT");
          }}
        >
          Add
        </button>
      </div>
      {isEmpty && (
        <p className="text-sm text-red-500 mt-1">Field name cannot be empty.</p>
      )}

      <div className="flex justify-end">
        <i className="fi fi-tr-square-plus"></i>

        <Link
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          href="/"
        >
          Close
        </Link>
      </div>
    </div>
  );
}
