import { v4 as UUIDGenerate } from "uuid";
import actionTypes from "./searchActionTypes";

const INITIAL_STATE = {
  sessionID: UUIDGenerate(),
  searchLocations: [],
  searchResult: null,
  searchType: "Coffee",
  searchLoading: false,
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTO_COMPLETE_SESSION_ID:
      return {
        ...state,
        sessionID: UUIDGenerate(),
      };
    case actionTypes.SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload,
      };
    case actionTypes.SET_SEARCH_LOADING:
      return {
        ...state,
        searchLoading: action.payload,
      };
    case actionTypes.ADD_LOCATION:
      return {
        ...state,
        searchLocations: [...state.searchLocations, action.newLocation],
      };
    case actionTypes.SET_SEARCH_RESULT:
      return {
        ...state,
        searchResult: action.searchResult,
      };
    case actionTypes.REMOVE_LOCATION_INDEX:
      const tempArray = [...state.searchLocations];
      tempArray.splice(action.index, 1);
      return {
        ...state,
        searchLocations: tempArray,
      };
    case actionTypes.LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default searchReducer;
