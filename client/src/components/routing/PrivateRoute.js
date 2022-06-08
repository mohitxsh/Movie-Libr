import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

function PrivateRoute({ component: Component, ...rest }) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  console.log(isAuthenticated);
 
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PrivateRoute;
