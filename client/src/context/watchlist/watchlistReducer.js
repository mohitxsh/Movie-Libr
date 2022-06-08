import {
  GET_WATCHLIST,
  ADD_WATCHLIST,
  WATCHLIST_ERROR,
  DELETE_WATCHLIST,
} from "../types";

const watchlistReducer = (state, action) => {
  switch (action.type) {
    case GET_WATCHLIST:
      return {
        ...state,
        watchlist: action.payload,
        loading: false,
      };
    case ADD_WATCHLIST:
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case DELETE_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (watchlist) => watchlist._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default watchlistReducer;
