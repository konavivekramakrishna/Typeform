import React from "react";
import Header from "./Header";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-100 min-h-screen bg-gray-100 items-center">
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl w-full lg:w-6/12 xl:w-6/12">
        <Header title="Welcome to #Typeform" />
        {props.children}
      </div>
    </div>
  );
}
