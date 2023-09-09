import React, { useEffect, useState } from "react";
import StoredForms from "./StoredForms";
import { navigate, useQueryParams } from "raviger";
import {
  initialFormFields,
  getLocalFormsData,
  saveLocalForms,
} from "../Utils/Storageutils";
import { formData } from "../types/types";

export default function Home() {
  const [{ search }, setQuery] = useQueryParams();

  const [forms, setForms] = useState<formData[]>(getLocalFormsData());
  const [searchString, setSearchString] = useState("");

  const delForm = (id: number) => {
    const localForms = getLocalFormsData();
    if (localForms.length > 1) {
      const newLocalForms = localForms.filter((form) => form.id !== id);
      setForms(newLocalForms);
      saveLocalForms(newLocalForms);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery({ search: searchString || "" });
    setSearchString("");
  };

  const addForm = () => {
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields,
    };
    saveLocalForms([...forms, newForm]);
    setForms([...forms, newForm]);
    navigate(`/forms/${newForm.id}`);
  };

  useEffect(() => {
    localStorage.setItem("savedForms", JSON.stringify(forms));
  }, [forms]);

  return (
    <div className="p-5">
      <div className="m-2 ">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label className="m-1">Search</label>
            <input
              className="flex-1 border w-full border-gray-300 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
              type="text"
              name="search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
        </form>
      </div>

      <StoredForms
        forms={getLocalFormsData()}
        search={search || ""}
        delFormCB={delForm}
        addFormCB={addForm}
      />
    </div>
  );
}
