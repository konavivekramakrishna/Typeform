import { useRoutes } from "raviger";
import Home from "../components/Home";
import About from "../components/About";
import App from "../App";
import AppContainer from "../AppContainer";

const routes = {
  "/": () => <App />,
  "/about": () => <About />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
