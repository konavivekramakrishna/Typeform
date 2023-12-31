import React from "react";
import Header from "./Header";
import { User } from "./types/types";

export default function AppContainer(props: {
  children: React.ReactNode;
  currentUser: User;
}) {
  return (
    <div className="flex pt-20 pb-20 h-100 min-h-screen bg-gray-100 items-center">
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl w-full lg:w-6/12 xl:w-6/12">
        <Header currentUser={props.currentUser} />
        {props.children}
      </div>
    </div>
  );
}
