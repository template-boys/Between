import { combineReducers } from "redux";
import { v4 as UUIDGenerate } from "uuid";

const INITIAL_STATE = {
  sessionID: UUIDGenerate(),
  loggedIn: false,
  searchLocations: [],
  searchResult: null,
  user: null,
  searchType: "Coffee",
  searchLoading: false,
};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_AUTO_COMPLETE_SESSION_ID":
      return {
        ...state,
        sessionID: UUIDGenerate(),
      };
    case "SET_LOCATION_ONE":
      return {
        ...state,
        locationOne: action.payload,
      };
    case "SET_LOCATION_TWO":
      return {
        ...state,
        locationTwo: action.payload,
      };
    case "SET_SEARCH_TYPE":
      return {
        ...state,
        searchType: action.payload,
      };
    case "SET_SEARCH_LOADING":
      return {
        ...state,
        searchLoading: action.payload,
      };
    case "LOGIN_USER":
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    case "ADD_LOCATION":
      return {
        ...state,
        searchLocations: [...state.searchLocations, action.newLocation],
      };
    case "SET_SEARCH_RESULT":
      return {
        ...state,
        searchResult: action.searchResult,
      };
    case "REMOVE_SEARCH_RESULT":
      const tempArray = [...state.searchLocations];
      tempArray.splice(action.index, 1);
      return {
        ...state,
        searchLocations: tempArray,
      };
    default:
      return state;
  }
};

export default combineReducers({
  testReducer: testReducer,
});
