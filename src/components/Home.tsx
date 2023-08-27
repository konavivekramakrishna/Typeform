import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import StoredForms from "./StoredForms";
import { initialFormFields } from "../Utils/Storageutils";

import { formData } from "../types";

const getLocalFormsData: () => formData[] = () => {
  const savedForms = localStorage.getItem("savedForms");
  return savedForms ? JSON.parse(savedForms) : [];
};

const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export default function Home() {
  const [forms, setForms] = useState<formData[]>(getLocalFormsData());

  const delForm = (id: number) => {
    const localForms = getLocalFormsData();
    if (localForms.length > 1) {
      const newLocalForms = localForms.filter((form) => form.id !== id);
      setForms(newLocalForms);
      saveLocalForms(newLocalForms);
    }
  };

  const addForm = () => {
    const newForm = {
      id: Number(new Date()),
      title: "Untitled Form",
      formFields: initialFormFields,
    };
    saveLocalForms([...forms, newForm]);
    setForms([...forms, newForm]); // Update the state here
  };

  useEffect(() => {
    localStorage.setItem("savedForms", JSON.stringify(forms));
  }, [forms]);

  return (
    <div className=" p-5">
      <StoredForms
        forms={getLocalFormsData()}
        delFormCB={delForm}
        addFormCB={addForm}
      ></StoredForms>
    </div>
  );
}
