import {
    GET_PLAYLIST,
  ADD_PLAYLIST,
  DELETE_PLAYLIST,
  } from "../types";

  const playlistReducer = (state, action) => {
    switch (action.type) {
      case GET_PLAYLIST:
        return {
          ...state,
          playlist: action.payload,
          loading: false,
        };
      case ADD_PLAYLIST:
        return {
          ...state,
          playlist: [action.payload, ...state.playlist],
        };
      case DELETE_PLAYLIST:
        return {
          ...state,
          playlist: state.playlist.filter(
            (playlist) => playlist._id !== action.payload
          ),
        };
      default:
        return state;
    }
  };

  export default playlistReducer;
