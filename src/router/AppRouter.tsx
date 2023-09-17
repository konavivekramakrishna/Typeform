import { Redirect, useRoutes } from "raviger";
import Home from "../components/Home";
import About from "../components/About";
import Form from "../components/Form";
import PreviewForm from "../components/PreviewForm";
import { ThemeProvider } from "@material-tailwind/react";
import Error from "../components/Error";

import AllSubmissions from "../components/AllSubmissions";
import Submission from "../components/Submission";

const routes = {
  "/submissions/:id": ({ id }: { id: string }) => (
    <AllSubmissions formId={Number(id)} />
  ),
  "/submissions/:formId/answer/:id": ({
    formId,
    id,
  }: {
    formId: string;
    id: string;
  }) => <Submission formId={Number(formId)} submissionId={Number(id)} />,
  "/": () => <Home />,
  "/about": () => <About />,
  "/login": () => <Redirect to="/" />,
  "/forms/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => (
    <PreviewForm formId={Number(id)} />
  ),
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);

  if (routeResult === null) {
    return (
      <ThemeProvider>
        <Error />;
      </ThemeProvider>
    );
  }

  return routeResult;
}
