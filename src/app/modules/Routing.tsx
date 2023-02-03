import { ProvideAuth } from "../hooks/UseAuth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import React from "react";
import HomePage from "../pages/home/HomePage";
import PrivateRoute from "./PrivateRoute";
import RegistrationPage from "../pages/register/RegistrationPage";
import ServicePage from "../pages/service/ServicePage";
import ServiceCreatePage from "../pages/service/ServiceCreatePage";

export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  profile: "/profile",
  service: "/service",
  new: "/new",
};

/**
 * Creates routing in the application, should be on the top level.
 */
export default function Routing() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Switch>
          <Route path={routes.login}>
            <LoginPage />
          </Route>
          <Route path={routes.register}>
            <RegistrationPage />
          </Route>

          <PrivateRoute path={`${routes.service}/:id`}>
            <ServicePage />
          </PrivateRoute>
          <PrivateRoute path={routes.new}>
            <ServiceCreatePage />
          </PrivateRoute>
          <PrivateRoute path={routes.home}>
            <HomePage />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
}
