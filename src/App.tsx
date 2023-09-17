import React, { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import { me } from "./Utils/apiUtils";
import { User } from "./types/types";
import AppRouter from "./router/AppRouter";
import AppContainer from "./AppContainer";
import Login from "./components/Login";

const fetchCurrentUser = async (
  setCurrentUser: (currentUser: User) => void,
) => {
  const currentUser = await me();
  if (currentUser.username === "") {
    localStorage.removeItem("token");
  }
  setCurrentUser(currentUser);
};

export default function App() {
  const [user, setUser] = useState<User>({
    username: "",
    url: "",
    name: "",
  });

  useEffect(() => {
    fetchCurrentUser(setUser);
  }, []);

  return (
    <AppContainer currentUser={user}>
      {user && user.username?.length > 0 ? <AppRouter /> : <Login />}
    </AppContainer>
  );
}
