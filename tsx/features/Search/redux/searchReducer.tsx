import { v4 as UUIDGenerate } from "uuid";
import actionTypes from "./searchActionTypes";

const INITIAL_STATE = {
  sessionID: UUIDGenerate(),
  searchLocations: [],
  searchResult: null,
  searchType: "Coffee",
  searchLoading: false,
  placeIndex: 0,
  typeIndex: 1,
  cacheSearchResults: [],
  directionsLoading: false,
  cachedDirections: [],
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
    case actionTypes.SET_PLACE_INDEX:
      return {
        ...state,
        placeIndex: action.index,
      };
    case actionTypes.REMOVE_LOCATION_INDEX:
      const tempArray = [...state.searchLocations];
      tempArray.splice(action.index, 1);
      return {
        ...state,
        searchLocations: tempArray,
      };
    case actionTypes.ADD_CACHED_SEARCH_RESULT:
      return {
        ...state,
        cacheSearchResults: [...state.cacheSearchResults, action.input],
      };
    case actionTypes.REMOVE_FIRST_CACHED_SEARCH_RESULT:
      return {
        ...state,
        cacheSearchResults: [...state.cacheSearchResults.slice(1)],
      };
    case actionTypes.REMOVE_FIRST_CACHED_DIRECTION:
      return {
        ...state,
        cachedDirections: [...state.cachedDirections.slice(1)],
      };
    case actionTypes.SET_DIRECTIONS_LOADING:
      return {
        ...state,
        directionsLoading: action.isLoading,
      };
    case actionTypes.SET_DIRECTIONS:
      return {
        ...state,
        currentRouteDirections: action.directions,
      };
    case actionTypes.ADD_CACHED_DIRECTION:
      return {
        ...state,
        cachedDirections: [...state.cachedDirections, action.direction],
      };
    case actionTypes.LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default searchReducer;
