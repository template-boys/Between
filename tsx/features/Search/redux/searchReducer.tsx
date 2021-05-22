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
  currentRouteGeometries: [],
  selectedOriginIndex: -1,
  selectedDestinationDetails: undefined,
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
        origins: [...state.origins, action.payload],
      };
    case SearchActionTypes.SET_DESTINATIONS:
      return {
        ...state,
        destinations: action.payload,
        currentRouteGeometries: [],
      };
    case SearchActionTypes.SET_DESTINATION_INDEX:
      return {
        ...state,
        destinationIndex: action.payload,
        currentRouteGeometries: [],
      };
    case SearchActionTypes.REMOVE_ORIGIN_INDEX:
      return {
        ...state,
        origins: action.payload,
        currentRouteGeometries: [],
      };
    case SearchActionTypes.ADD_CACHED_DESTINATION:
      return {
        ...state,
        cachedDestinations: [...state.cachedDestinations, action.payload],
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
        userLocation: action.payload,
      };
    case SearchActionTypes.SET_ROUTES_LOADING:
      return {
        ...state,
        routeLoading: action.payload,
      };
    case SearchActionTypes.ADD_ROUTE_GEOMETRY:
      return {
        ...state,
        currentRouteGeometries: [
          ...state.currentRouteGeometries,
          action.payload,
        ],
      };
    case SearchActionTypes.CLEAR_ROUTE_GEOMETRIES:
      return {
        ...state,
        currentRouteGeometries: [],
      };
    case SearchActionTypes.ADD_CACHED_ROUTE_GEOMETRY:
      return {
        ...state,
        cachedRouteGeometries: [...state.cachedRouteGeometries, action.payload],
      };
    case SearchActionTypes.SET_ORIGIN_INDEX:
      return {
        ...state,
        selectedOriginIndex: action.payload,
      };
    case SearchActionTypes.SET_DESTINATION_DETAILS:
      return {
        ...state,
        selectedDestinationDetails: action.payload,
      };
    case SearchActionTypes.LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default searchReducer;
