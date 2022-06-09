import React, { useReducer } from "react";
import PlaylistContext from "./playlistContext";
import axios from "axios";
import playlistReducer from "./playlistReducer";
import {
  GET_PLAYLIST,
  ADD_PLAYLIST,
  PLAYLIST_ERROR,
  DELETE_PLAYLIST,
} from "../types";

const PlaylistState = (props) => {
  const initialState = {
    playlist: [],
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(playlistReducer, initialState);

  //GET PLAYLIST
  const getPlaylist = async () => {
    try {
      const res = await axios.get("/api/playlist");
      dispatch({ type: GET_PLAYLIST, payload: res.data });
    } catch (err) {
      dispatch({ type: PLAYLIST_ERROR, payload: err.response.msg });
    }
  };

  //ADD PLAYLIST
  const addPlaylist = async (playlist) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/playlist", playlist, config);
      dispatch({ type: ADD_PLAYLIST, payload: res.data });
    } catch (err) {
      dispatch({ type: PLAYLIST_ERROR, payload: err.response.msg });
    }
  };

  //DELETE PLAYLIST
  const deletePlaylist = async (id) => {
    try {
      await axios.delete(`/api/playlist/${id}`);
      dispatch({ type: DELETE_PLAYLIST, payload: id });
    } catch (err) {
      dispatch({ type: PLAYLIST_ERROR, payload: err.response.msg });
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlist: state.playlist,
        current: state.current,
        error: state.error,
        addPlaylist,
        getPlaylist,
        deletePlaylist,
      }}>
      {props.children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistState;
