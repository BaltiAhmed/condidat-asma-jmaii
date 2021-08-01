import { StatusBar } from "expo-status-bar";
import React from "react";
import Auth from "./navigation/authNavigation";
import LandingNav from "./navigation/navigation";
import { Authcontext } from "./context/auth-context";
import { UserAuth } from "./hooks/auth";


export default function App() {

  const { userId, token, login, logout } = UserAuth();
  let routes;
  if (token) {
    routes = <LandingNav />;
  } else {
    routes = <Auth />;
  }
  return (
    <Authcontext.Provider
      value={{ userId: userId, token: token, login: login, logout: logout }}
    >
      {routes}
    </Authcontext.Provider>
  );
}

