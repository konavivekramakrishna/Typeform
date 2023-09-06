import React, { useEffect, useRef, useState } from "react";
import { StoredFormsType, formData } from "../types";
import { Link } from "raviger";

export default function StoredForms(props: StoredFormsType) {
  const [currentSearch, setCurrentSearch] = useState(props.search || "");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [props.forms, currentSearch]);

  useEffect(() => {
    setCurrentSearch(props.search || "");
  }, [props.search]);
  return (
    <div
      className="bg-gray-100 p-4 rounded-lg shadow-md overflow-y-auto"
      style={{ maxHeight: "40vh" }}
      ref={scrollContainerRef}
    >
      <h1 className="text-xl font-semibold mb-3">Saved Forms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-center transition duration-300 hover:bg-purple-100">
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline-purple active:bg-purple-800"
            onClick={props.addFormCB}
          >
            <i className="fi fi-rr-add text-lg"></i>
            <span className="ml-2">Add New Form</span>
          </button>
        </div>
        {props.forms
          .filter((form) => {
            return form.title
              .toLowerCase()
              .includes(currentSearch.toLowerCase());
          })
          .map((form) => (
            <div
              key={form.id}
              className="bg-white p-3 rounded-lg shadow-sm transition duration-300 hover:bg-blue-100"
            >
              <h2 className="text-lg font-semibold mb-1 whitespace-nowrap overflow-hidden overflow-ellipsis">
                {form.title}
              </h2>
              <span className="text-gray-600">
                {form.formFields.length} Questions
              </span>

              <div className="flex justify-end ">
                <Link
                  className="text-purple-500 hover:text-purple-600 focus:outline-none py-2 px-4"
                  href={`/preview/${form.id}`}
                >
                  <i className="fi fi-rr-eye text-xl"></i>
                </Link>
                <Link
                  className="text-blue-500 hover:text-blue-600 focus:outline-none py-2 px-4"
                  href={`/forms/${form.id}`}
                >
                  <i className="fi fi-rr-edit text-xl"></i>
                </Link>
                <button
                  className="text-red-500 hover:text-red-600 focus:outline-none py-2 px-4"
                  onClick={() => props.delFormCB(form.id)}
                >
                  <i className="fi fi-rr-trash text-xl"></i>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
