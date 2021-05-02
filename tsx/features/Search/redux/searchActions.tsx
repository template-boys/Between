import {
  mapBoxDirectionsSearch,
  reverseGeocode,
  yelpSearch,
} from "../../../api/thirdPartyApis";
import actionTypes from "./searchActionTypes";

export const setSearchType = (type) => ({
  type: actionTypes.SET_SEARCH_TYPE,
  payload: type,
});

export const setSearchLoading = (isLoading) => ({
  type: actionTypes.SET_SEARCH_LOADING,
  payload: isLoading,
});

export const addOriginLocation = (newLocation) => {
  let returnLocation;
  if (typeof newLocation?.position === "string") {
    const splitPosition = newLocation?.position.split(",");
    const locationObject = {
      address: newLocation?.address ?? {},
      position: {
        lat: parseFloat(splitPosition[0]),
        lon: parseFloat(splitPosition[1]),
      },
    };
    returnLocation = locationObject;
  } else {
    returnLocation = newLocation;
  }
  return {
    type: actionTypes.ADD_LOCATION,
    newLocation: returnLocation,
  };
};

export const setSearchResult = (searchResult) => ({
  type: actionTypes.SET_SEARCH_RESULT,
  searchResult,
});

export const removeOriginLocation = (index) => {
  return {
    type: actionTypes.REMOVE_LOCATION_INDEX,
    index,
  };
};

export const setPlaceIndex = (index: number) => {
  return {
    type: actionTypes.SET_PLACE_INDEX,
    index,
  };
};

export const addCacheSearchResult = (input) => {
  return {
    type: actionTypes.ADD_CACHED_SEARCH_RESULT,
    input,
  };
};

export const removeFirstCachedResult = () => {
  return {
    type: actionTypes.REMOVE_FIRST_CACHED_SEARCH_RESULT,
  };
};

export const setDirectionsLoading = (isLoading) => {
  return {
    type: actionTypes.SET_DIRECTIONS_LOADING,
    isLoading,
  };
};

export const setUserLocation = (location) => {
  return async (dispatch, getState) => {
    dispatch(setUserGeocodeLocation(location));
    dispatch({ type: actionTypes.SET_USER_LOCATION, location });
  };
};

export const setUserGeocodeLocation = (location) => {
  return async (dispatch, getState) => {
    const res = await reverseGeocode(location);
    res?.data?.addresses[0] &&
      dispatch(addOriginLocation(res?.data?.addresses[0]));
  };
};

//Sets the current directions (whatever place is selected)
export const setDirections = (directions) => {
  return {
    type: actionTypes.SET_DIRECTIONS,
    directions,
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
export const getDirections = (origin, destination) => {
  return async (dispatch, getState) => {
    dispatch(setDirectionsLoading(true));
    const state = getState();
    const cachedDirections = state.searchReducer.cachedDirections;
    let res;
    let geometry;

    cachedDirections.forEach((cacheItem: any) => {
      if (
        cacheItem?.origin?.latitude === origin?.latitude &&
        cacheItem?.origin?.longitude === origin?.longitude &&
        cacheItem?.destination?.latitude === destination?.latitude &&
        cacheItem?.destination?.longitude === destination?.longitude
      ) {
        console.log("we have those directions cached");
        geometry = cacheItem.geometry;
      }
    });

    if (!geometry) {
      res = await mapBoxDirectionsSearch(origin, destination);
      geometry = res?.data?.routes[0]?.geometry;
      if (state.searchReducer.cachedDirections?.length >= 25) {
        dispatch(removeFirstCachedDirection());
      }
      dispatch(addCacheDirections({ origin, destination, geometry }));
    }

    dispatch(setDirections(geometry));
    dispatch(setDirectionsLoading(false));
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
export const getPlaceSearch = (query: string, middlePoint) => {
  return async (dispatch, getState) => {
    dispatch(setSearchLoading(true));
    let result;
    const state = getState();
    state.searchReducer.cacheSearchResults.forEach((cacheItem) => {
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
      result = result?.data;
      if (state.searchReducer.cacheSearchResults.length >= 8) {
        dispatch(removeFirstCachedResult());
      }
      dispatch(addCacheSearchResult({ query, middlePoint, result }));
    }
    dispatch(setSearchResult(result));
    dispatch(setSearchLoading(false));
  };
};

//Adds an encoded directions call to list of cached directions.
export const addCacheDirections = (direction) => {
  return {
    type: actionTypes.ADD_CACHED_DIRECTION,
    direction,
  };
};

//Removes first direction in cache array. Used to keep RAM smaller
export const removeFirstCachedDirection = () => {
  return {
    type: actionTypes.REMOVE_FIRST_CACHED_DIRECTION,
  };
};
