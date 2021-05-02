import { State } from "../../../../rootReducer";
import {
  mapBoxDirectionsSearch,
  reverseGeocode,
  yelpSearch,
} from "../../../api/thirdPartyApis";
import { SearchActionTypes } from "./searchActionTypes";
import { Coordinate } from "./searchReducerTypes";

export const setDestinationType = (type) => ({
  type: SearchActionTypes.SET_DESTINATION_TYPE,
  payload: type,
});

export const setDestinationSearchLoading = (isLoading) => ({
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
    newOrigin: returnOrigin,
  };
};

export const setDestinations = (destinations) => ({
  type: SearchActionTypes.SET_DESTINATIONS,
  destinations,
});

export const removeOriginLocation = (index) => {
  return {
    type: SearchActionTypes.REMOVE_ORIGIN_INDEX,
    index,
  };
};

export const setDestinationIndex = (index: number) => {
  return {
    type: SearchActionTypes.SET_DESTINATION_INDEX,
    index,
  };
};

export const addCachedDestination = (input) => {
  return {
    type: SearchActionTypes.ADD_CACHED_DESTINATION,
    input,
  };
};

export const removeFirstCachedDestination = () => {
  return {
    type: SearchActionTypes.REMOVE_FIRST_CACHED_DESTINATION,
  };
};

export const setRouteLoading = (isLoading) => {
  return {
    type: SearchActionTypes.SET_ROUTES_LOADING,
    isLoading,
  };
};

export const setUserLocation = (location) => {
  return async (dispatch, getState) => {
    dispatch(setUserGeocodeLocation(location));
    dispatch({ type: SearchActionTypes.SET_USER_LOCATION, location });
  };
};

export const setUserGeocodeLocation = (location) => {
  return async (dispatch, getState) => {
    const res = await reverseGeocode(location);
    res?.data?.addresses[0] && dispatch(addOrigin(res?.data?.addresses[0]));
  };
};

//Sets the current geometry (whatever place is selected)
export const setRouteGeometry = (routeGeometry) => {
  return {
    type: SearchActionTypes.SET_ROUTE_GEOMETRY,
    routeGeometry,
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
export const getRouteGeometries = (origin, destination) => {
  return async (dispatch, getState) => {
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
        dispatch(removeFirstCachedDirection());
      }
      dispatch(addCachedRouteGeometry({ origin, destination, geometry }));
    }

    dispatch(setRouteGeometry(geometry));
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
  return async (dispatch, getState) => {
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
        dispatch(removeFirstCachedDestination());
      }
      dispatch(addCachedDestination({ query, middlePoint, result }));
    }
    dispatch(setDestinations(result));
    dispatch(setDestinationSearchLoading(false));
  };
};

//Adds an encoded directions call to list of cached directions.
export const addCachedRouteGeometry = (direction) => {
  return {
    type: SearchActionTypes.ADD_CACHED_ROUTE_GEOMETRY,
    direction,
  };
};

//Removes first direction in cache array. Used to keep RAM smaller
export const removeFirstCachedDirection = () => {
  return {
    type: SearchActionTypes.REMOVE_FIRST_CACHED_ROUTE_GEOMETRY,
  };
};
