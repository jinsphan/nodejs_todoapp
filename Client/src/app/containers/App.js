import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// Component Imports
import {
  Todo,
  Login,
  AuthRoute,
  AccountConfirm,
  Register,
  ForgotPassword,
  AccountChangePassword,
} from "app/containers";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/account/confirm/:token" component={AccountConfirm} />
        <Route exact path="/account/changepassword/:token" component={AccountChangePassword} />
        <AuthRoute path="/" component={Todo} />
      </Switch>
    </Router>
  );
};

export default App;
