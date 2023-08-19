import React from "react";
import logo from "../logo.svg";

export default function Home(props: { openFormCB: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <img className="h-48 mb-4" src={logo} alt="Logo" />
      <p className="text-xl font-semibold mb-4">Welcome to the Home Page</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        onClick={props.openFormCB}
      >
        Open Form
      </button>
    </div>
  );
}
