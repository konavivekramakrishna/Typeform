import React, { lazy, Suspense } from "react";
import { Redirect, useRoutes } from "raviger";
import { ThemeProvider } from "@material-tailwind/react";
import Error from "../components/Error";

const About = lazy(() => import("../components/About"));
const Form = lazy(() => import("../components/Form"));
const PreviewForm = lazy(() => import("../components/PreviewForm"));
const AllSubmissions = lazy(() => import("../components/AllSubmissions"));
const Submission = lazy(() => import("../components/Submission"));

const Home = lazy(() => import("../components/Home"));

const routes = {
  "/submissions/:id": ({ id }: { id: string }) => (
    <Suspense fallback={<div>Loading...</div>}>
      <AllSubmissions formId={Number(id)} />
    </Suspense>
  ),
  "/submissions/:formId/answer/:id": ({
    formId,
    id,
  }: {
    formId: string;
    id: string;
  }) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Submission formId={Number(formId)} submissionId={Number(id)} />
    </Suspense>
  ),
  "/": () => (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  ),
  "/about": () => (
    <Suspense fallback={<div>Loading...</div>}>
      <About />
    </Suspense>
  ),
  "/login": () => <Redirect to="/" />,

  "/forms/:id": ({ id }: { id: string }) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Form formId={Number(id)} />
    </Suspense>
  ),
  "/preview/:id": ({ id }: { id: string }) => (
    <Suspense fallback={<div>Loading...</div>}>
      <PreviewForm formId={Number(id)} />
    </Suspense>
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
