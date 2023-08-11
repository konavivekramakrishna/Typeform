import React from "react";
import "./index.css";
import "./App.css";
import Header from "./Header";
import AppContainer from "./AppContainer";

const formFields = [
  {
    id: 1,
    label: "First Name",
    type: "text",
  },
  {
    id: 2,
    label: "Last Name",
    type: "text",
  },
  {
    id: 3,
    label: "Email",
    type: "email",
  },
  {
    id: 4,
    label: "Date of Birth",
    type: "date",
  },
  {
    id: 5,
    label: "Phone Number",
    type: "tel",
  },
];

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl w-full lg:w-1/3 xl:w-1/3">
        <Header title="Hello there" />

        {formFields.map((field) => (
          <div key={field.id} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor=""
            >
              {field.label}
            </label>
            <input
              className="block w-full border border-gray-300 rounded-lg py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
              type={field.type}
            />
          </div>
        ))}

        <button
          className="block  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          type="submit"
        >
          Submit
        </button>
      </div>
    </AppContainer>
  );
}

export default App;
