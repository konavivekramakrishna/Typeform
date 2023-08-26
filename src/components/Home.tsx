import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import StoredForms from "./StoredForms";

import { formData } from "../types";

const getLocalFormsData: () => formData[] = () => {
  const savedForms = localStorage.getItem("savedForms");
  return savedForms ? JSON.parse(savedForms) : [];
};

export default function Home() {
  const [forms, setForms] = useState<formData[]>(getLocalFormsData());

  useEffect(() => {
    localStorage.setItem("savedForms", JSON.stringify(forms));
  }, [forms]);

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-xl font-semibold mb-4">Welcome to the Home Page</p>
      <a
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        href="/forms/0"
      >
        Open Form
      </a>
      <StoredForms forms={getLocalFormsData()}></StoredForms>
    </div>
  );
}
