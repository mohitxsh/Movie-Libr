import React, { Fragment } from "react";
import "./App.css";
import AuthState from "./context/auth/AuthState";
import WatchlistState from "./context/watchlist/WatchlistState";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import Register from "./components/auth/Register";
import PlaylistState from "./context/playlist/PlaylistState";
import PlaylistPage from "./pages/PlaylistPage";
import PublicPlaylist from "./pages/PublicPlaylist";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <WatchlistState>
        <PlaylistState>
          <Router>
            <Fragment>
              <div className='w-screen bg-[#F3F4F6]'>
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/playlist' component={PlaylistPage} />
                  <Route
                    exact
                    path='/playlist/:userid'
                    component={PublicPlaylist}
                  />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </PlaylistState>
      </WatchlistState>
    </AuthState>
  );
}
export default App;
