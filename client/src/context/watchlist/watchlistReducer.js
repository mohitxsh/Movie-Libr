import { GET_WATCHLIST, ADD_WATCHLIST, WATCHLIST_ERROR } from "../types";

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
    default:
      return state;
  }
};

export default watchlistReducer;
