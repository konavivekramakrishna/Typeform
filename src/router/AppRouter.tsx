import { useRoutes } from "raviger";
import Home from "../components/Home";
import About from "../components/About";
import App from "../App";
import AppContainer from "../AppContainer";
import Form from "../components/Form";
import PreviewForm from "../components/PreviewForm";

const routes = {
  "/": () => <App />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => (
    <PreviewForm formId={Number(id)} />
  ),
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
