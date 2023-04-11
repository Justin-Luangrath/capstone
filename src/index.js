import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "bootstrap/scss/bootstrap.scss";
import "./assets/scss/paper-kit.scss?v=1.3.0";

import HomePage from "./views/pages/HomePage.js";
import MarketPage from "./views/pages/MarketPage";
import ProfilePage from "./views/pages/ProfilePage";
import RegisterPage from "./views/pages/RegisterPage";
import LoginPage from "./views/pages/LoginPage";
import LibraryPage from "./views/pages/LibraryPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <HomePage {...props} />} />
      <Route
        path="/market-page"
        render={(props) => <MarketPage {...props} />}
      />
      <Route
        path="/library-page"
        render={(props) => <LibraryPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      />
      <Route path="/login-page" render={(props) => <LoginPage {...props} />} />
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>
);
