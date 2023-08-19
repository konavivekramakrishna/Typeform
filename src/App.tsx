import React, { useState } from "react";
import "./index.css";
import "./App.css";
import Header from "./Header";
import AppContainer from "./AppContainer";
import Home from "./components/Home";
import Form from "./components/Form";

function App() {
  const [state, setState] = useState("HOME");

  const closeForm = () => {
    setState("HOME");
  };

  const openForm = () => {
    setState("FORM");
  };

  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl w-full lg:w-6/12 xl:w-6/12">
        <Header title="Welcome to #Typeform" />
        {state === "HOME" ? (
          <Home openFormCB={openForm} />
        ) : (
          <Form closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
