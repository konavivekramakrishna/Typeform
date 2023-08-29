import React, { useState } from "react";
import "./index.css";
import "./App.css";
import Header from "./Header";
import AppContainer from "./AppContainer";
import Home from "./components/Home";
import Form from "./components/Form";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  const [state, setState] = useState("HOME");

  return (
    <>
      <ThemeProvider>
        {state === "HOME" ? <Home /> : <Form formId={Number(0)} />}
      </ThemeProvider>
    </>
  );
}

export default App;
