import React, { Fragment } from "react";
import "./App.css";
import AuthState from "./context/auth/AuthState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import Register from "./components/auth/Register";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <div className='container'>
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </AuthState>
  );
}
export default App;
