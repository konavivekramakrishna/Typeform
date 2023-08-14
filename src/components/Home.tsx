import React from "react";
import logo from "../logo.svg";

export default function Home(props: { openFormCB: () => void }) {
  return (
    <div className="flex flex-col justify-content">
      <div className="flex">
        <img className="h-48" src={logo} alt="" />
        <div className="flex-1 flex justify-content items-center h-48">
          <p>Welcome to Home Page</p>
        </div>
      </div>
      <button
        className="mt-4 block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        onClick={props.openFormCB}
      >
        Open Form
      </button>
    </div>
  );
}
