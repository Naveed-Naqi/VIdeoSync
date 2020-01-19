import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import RegisterContainer from "./components/auth/RegisterContainer";
import LoginContainer from "./components/auth/LoginContainer";
import DashboardContainer from "./components/dashboard/DashboardContainer";
import PrivateRoute from "./components/auth/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={LoginContainer} />
              <Route exact path="/register" component={RegisterContainer} />

              <PrivateRoute
                exact
                path="/dashboard"
                component={DashboardContainer}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
