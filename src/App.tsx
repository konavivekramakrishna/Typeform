import React, { useState } from "react";
import "./index.css";
import "./App.css";
import Header from "./Header";
import AppContainer from "./AppContainer";
import Home from "./components/Home";
import Form from "./components/Form";

function App() {
  const [state, setState] = useState("HOME");

  return <>{state === "HOME" ? <Home /> : <Form formId={Number(0)} />}</>;
}

export default App;
