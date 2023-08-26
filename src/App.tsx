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
    <>
      {state === "HOME" ? (
        <Home openFormCB={openForm} />
      ) : (
        <Form closeFormCB={closeForm} />
      )}
    </>
  );
}

export default App;
