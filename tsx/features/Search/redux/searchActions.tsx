import { Dispatch } from "react";
import { State } from "../../../../rootReducer";
import {
  mapBoxDirectionsSearch,
  reverseGeocode,
  yelpSearch,
} from "../../../api/thirdPartyApis";
import { SearchActionTypes } from "./searchActionTypes";
import {
  CachedDestinationsItem,
  CachedGeometryItem,
  Coordinate,
  SearchAction,
  YelpBusiness,
} from "./searchReducerTypes";

export const setDestinationType = (type: string) => ({
  type: SearchActionTypes.SET_DESTINATION_TYPE,
  payload: type,
});

export const setDestinationSearchLoading = (isLoading: boolean) => ({
  type: SearchActionTypes.SET_DESTINATION_SEARCH_LOADING,
  payload: isLoading,
});

export const addOrigin = (origin) => {
  let returnOrigin;
  if (typeof origin?.position === "string") {
    const splitPosition = origin?.position.split(",");
    const locationObject = {
      address: origin?.address ?? {},
      position: {
        lat: parseFloat(splitPosition[0]),
        lon: parseFloat(splitPosition[1]),
      },
    };
    returnOrigin = locationObject;
  } else {
    returnOrigin = origin;
  }
  return {
    type: SearchActionTypes.ADD_ORIGIN,
    payload: returnOrigin,
  };
};

export const setDestinations = (destinations: Array<YelpBusiness>) => ({
  type: SearchActionTypes.SET_DESTINATIONS,
  payload: destinations,
});

export const removeOriginLocation = (index: number) => {
  return (dispatch: Dispatch<SearchAction>, getState: () => State) => {
    const state = getState();
    const tempArray = [...state.searchReducer.origins];
    tempArray.splice(index, 1);
    dispatch({
      type: SearchActionTypes.REMOVE_ORIGIN_INDEX,
      payload: tempArray,
    });
  };
};

export const setDestinationIndex = (index: number) => {
  return {
    type: SearchActionTypes.SET_DESTINATION_INDEX,
    payload: index,
  };
};

export const addCachedDestination = (payload: CachedDestinationsItem) => {
  return {
    type: SearchActionTypes.ADD_CACHED_DESTINATION,
    payload,
  };
};

export const removeFirstCachedDestination = {
  type: SearchActionTypes.REMOVE_FIRST_CACHED_DESTINATION,
};

export const setRouteLoading = (isLoading: boolean) => {
  return {
    type: SearchActionTypes.SET_ROUTES_LOADING,
    payload: isLoading,
  };
};

export const setUserLocation = (location) => {
  return async (dispatch: Dispatch<SearchAction | any>) => {
    dispatch(setUserGeocodeLocation(location));
    dispatch({ type: SearchActionTypes.SET_USER_LOCATION, payload: location });
  };
};

export const setUserGeocodeLocation = (location) => {
  return async (dispatch: Dispatch<SearchAction>, getState: () => State) => {
    const res = await reverseGeocode(location);
    const state = getState();
    const numOrigins = state.searchReducer.origins.length;
    if (res?.data?.addresses[0] && numOrigins === 0) {
      dispatch(addOrigin(res?.data?.addresses[0]));
    }
  };
};

//Sets the current geometry (whatever place is selected)
export const addRouteGeometry = (routeGeometry: string) => {
  return {
    type: SearchActionTypes.ADD_ROUTE_GEOMETRY,
    payload: routeGeometry,
  };
};

export const clearRouteGeometries = () => {
  return {
    type: SearchActionTypes.CLEAR_ROUTE_GEOMETRIES,
  };
};

// Main action for using Google's place directions API
// Parameters:
// origin: string (formatted address)
// destination: string (formatted address)
//
// Checks cache before hitting API.
// If we already searched for those locations
// use that instead
export const getRouteGeometries = (
  origin: Coordinate,
  destination: Coordinate
) => {
  return async (dispatch: Dispatch<SearchAction>, getState: () => State) => {
    dispatch(setRouteLoading(true));
    const state = getState();
    const cachedRouteGeometries = state.searchReducer.cachedRouteGeometries;
    let res;
    let geometry;

    cachedRouteGeometries.forEach((cachedRouteGeometry: any) => {
      if (
        cachedRouteGeometry?.origin?.latitude === origin?.latitude &&
        cachedRouteGeometry?.origin?.longitude === origin?.longitude &&
        cachedRouteGeometry?.destination?.latitude === destination?.latitude &&
        cachedRouteGeometry?.destination?.longitude === destination?.longitude
      ) {
        console.log("we have those directions cached");
        geometry = cachedRouteGeometry.geometry;
      }
    });

    if (!geometry) {
      res = await mapBoxDirectionsSearch(origin, destination);
      geometry = res?.data?.routes[0]?.geometry;
      if (state.searchReducer.cachedRouteGeometries?.length >= 25) {
        dispatch(removeFirstCachedDirection);
      }
      dispatch(addCachedRouteGeometry({ origin, destination, geometry }));
    }

    dispatch(addRouteGeometry(geometry));
    dispatch(setRouteLoading(false));
  };
};

// Main action for using Yelp's place search API
// Parameters:
// query: string (keyword e.g. coffee, bar, pizza)
// middlePoint: location to search around
//
// Checks cache before hitting API.
// If we already searched for that query and middlepoint
// use that instead
//
// We are also allowed to cache it serverside for up to 24 hours
// So that might be worth it in the future
export const getDestinationSearch = (
  query: string,
  middlePoint: Coordinate
) => {
  return async (dispatch: Dispatch<SearchAction>, getState: () => State) => {
    dispatch(setDestinationSearchLoading(true));
    let result;
    const state: State = getState();
    state.searchReducer.cachedDestinations.forEach((cacheItem) => {
      if (
        cacheItem?.middlePoint?.latitude === middlePoint?.latitude &&
        cacheItem?.middlePoint?.longitude === middlePoint?.longitude &&
        cacheItem.query === query
      ) {
        console.log("We have that place search cached, not hitting api", query);
        result = cacheItem?.result;
      }
    });
    if (!result) {
      result = await yelpSearch(query, middlePoint);
      result = result?.data?.businesses ?? [];
      if (state.searchReducer.cachedDestinations.length >= 8) {
        dispatch(removeFirstCachedDestination);
      }
      dispatch(addCachedDestination({ query, middlePoint, result }));
    }
    dispatch(setDestinations(result));
    dispatch(setDestinationSearchLoading(false));
  };
};

//Adds an encoded directions call to list of cached directions.
export const addCachedRouteGeometry = (
  geometryCacheItem: CachedGeometryItem
) => {
  return {
    type: SearchActionTypes.ADD_CACHED_ROUTE_GEOMETRY,
    payload: geometryCacheItem,
  };
};

//Removes first direction in cache array. Used to keep RAM smaller
export const removeFirstCachedDirection = {
  type: SearchActionTypes.REMOVE_FIRST_CACHED_ROUTE_GEOMETRY,
};

export const setOriginIndex = (index: number) => {
  return {
    type: SearchActionTypes.SET_ORIGIN_INDEX,
    payload: index,
  };
};
