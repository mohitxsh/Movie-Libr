import React, { useReducer } from "react";
import WatchlistContext from "./watchlistContext";
import axios from "axios";
import watchlistReducer from "./watchlistReducer";
import {
  GET_WATCHLIST,
  ADD_WATCHLIST,
  WATCHLIST_ERROR,
  DELETE_WATCHLIST,
} from "../types";

const WatchlistState = (props) => {
  const initialState = {
    watchlist: [],
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(watchlistReducer, initialState);

  //GET WATCHLIST
  const getWatchlist = async () => {
    try {
      const res = await axios.get("/api/watchlist");
      dispatch({ type: GET_WATCHLIST, payload: res.data });
    } catch (err) {
      dispatch({ type: WATCHLIST_ERROR, payload: err.response.msg });
    }
  };

  //ADD WATCHLIST
  const addWatchlist = async (watchlist) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/watchlist", watchlist, config);
      dispatch({ type: ADD_WATCHLIST, payload: res.data });
    } catch (err) {
      dispatch({ type: WATCHLIST_ERROR, payload: err.response.msg });
    }
  };

  //DELETE WATCHLIST
  const deleteWatchlist = async (id) => {
    try {
      await axios.delete(`/api/watchlist/${id}`);
      dispatch({ type: DELETE_WATCHLIST, payload: id });
    } catch (err) {
      dispatch({ type: WATCHLIST_ERROR, payload: err.response.msg });
    }
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist: state.watchlist,
        current: state.current,
        error: state.error,
        addWatchlist,
        getWatchlist,
        deleteWatchlist,
      }}>
      {props.children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistState;
