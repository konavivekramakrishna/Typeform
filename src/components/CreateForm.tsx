import React, { useState } from "react";
import { navigate } from "raviger";
import { validateForm, Errors, Form } from "../types/createFormTypes";
import { createForm } from "../Utils/apiUtils";

export default function CreateForm() {
  const initialFormState: Form = {
    title: "",
    description: "",
    is_public: false,
  };

  const [form, setForm] = useState<Form>(initialFormState);
  const [errors, setErrors] = useState<Errors<Form>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm(form);

    if (Object.keys(formErrors).length === 0) {
      try {
        const data = await createForm(form);
        navigate(`/forms/${data.id}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl text-gray-700 mb-4">Create Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className={`block text-gray-600 ${
              errors.title ? "text-red-500" : ""
            }`}
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full border-2 border-gray-200 rounded-lg p-2 mt-1"
            value={form.title}
            onChange={(e) => {
              setForm({ ...form, title: e.target.value });
            }}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className={`block text-gray-600 ${
              errors.description ? "text-red-500" : ""
            }`}
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="w-full border-2 border-gray-200 rounded-lg p-2 mt-1"
            value={form.description}
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
            }}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            name="is_public"
            id="is_public"
            className="mr-2 border-2 border-gray-200 rounded p-2"
            checked={form.is_public}
            onChange={(e) => {
              setForm({ ...form, is_public: e.target.checked });
            }}
          />
          <label
            htmlFor="is_public"
            className={`text-gray-600 ${
              errors.is_public ? "text-red-500" : ""
            }`}
          >
            Is Public
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
