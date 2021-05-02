import { SearchActionTypes } from "./searchActionTypes";
import { SearchReducer } from "./searchReducerTypes";

const INITIAL_STATE = {
  origins: [],
  destinationType: "Coffee",
  destinations: [],
  destinationSearchLoading: false,
  destinationIndex: 0,
  cachedDestinations: [],
  routeLoading: false,
  cachedRouteGeometries: [],
};

const searchReducer = (
  state: SearchReducer = INITIAL_STATE,
  action
): SearchReducer => {
  switch (action.type) {
    case SearchActionTypes.SET_DESTINATION_TYPE:
      return {
        ...state,
        destinationType: action.payload,
      };
    case SearchActionTypes.SET_DESTINATION_SEARCH_LOADING:
      return {
        ...state,
        destinationSearchLoading: action.payload,
      };
    case SearchActionTypes.ADD_ORIGIN:
      return {
        ...state,
        origins: [...state.origins, action.newOrigin],
      };
    case SearchActionTypes.SET_DESTINATIONS:
      return {
        ...state,
        destinations: action.destinations,
      };
    case SearchActionTypes.SET_DESTINATION_INDEX:
      return {
        ...state,
        destinationIndex: action.index,
      };
    case SearchActionTypes.REMOVE_ORIGIN_INDEX:
      const tempArray = [...state.origins];
      tempArray.splice(action.index, 1);
      return {
        ...state,
        origins: tempArray,
      };
    case SearchActionTypes.ADD_CACHED_DESTINATION:
      return {
        ...state,
        cachedDestinations: [...state.cachedDestinations, action.input],
      };
    case SearchActionTypes.REMOVE_FIRST_CACHED_DESTINATION:
      return {
        ...state,
        cachedDestinations: [...state.cachedDestinations.slice(1)],
      };
    case SearchActionTypes.REMOVE_FIRST_CACHED_ROUTE_GEOMETRY:
      return {
        ...state,
        cachedRouteGeometries: [...state.cachedRouteGeometries.slice(1)],
      };
    case SearchActionTypes.SET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.location,
      };
    case SearchActionTypes.SET_ROUTES_LOADING:
      return {
        ...state,
        routeLoading: action.isLoading,
      };
    case SearchActionTypes.SET_ROUTE_GEOMETRY:
      return {
        ...state,
        currentRouteGeometry: action.routeGeometry,
      };
    case SearchActionTypes.ADD_CACHED_ROUTE_GEOMETRY:
      return {
        ...state,
        cachedRouteGeometries: [
          ...state.cachedRouteGeometries,
          action.direction,
        ],
      };
    case SearchActionTypes.LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default searchReducer;
