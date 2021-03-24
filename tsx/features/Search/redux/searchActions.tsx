import { placeSearch } from "../../../api/PlaceSearch";
import actionTypes from "./searchActionTypes";

export const setSessionID = () => ({
  type: actionTypes.SET_AUTO_COMPLETE_SESSION_ID,
});

export const setSearchType = (type) => ({
  type: actionTypes.SET_SEARCH_TYPE,
  payload: type,
});

export const setSearchLoading = (isLoading) => ({
  type: actionTypes.SET_SEARCH_LOADING,
  payload: isLoading,
});

export const addSearchLocation = (newLocation) => ({
  type: actionTypes.ADD_LOCATION,
  newLocation,
});

export const setSearchResult = (searchResult) => ({
  type: actionTypes.SET_SEARCH_RESULT,
  searchResult,
});

export const removeSearchLocation = (index) => {
  return {
    type: actionTypes.REMOVE_LOCATION_INDEX,
    index,
  };
};

export const getPlaceSearch = (query, middlePoint) => {
  return async (dispatch) => {
    dispatch(setSearchLoading(true));
    const res = await placeSearch(query, "en", middlePoint);
    dispatch(setSearchResult(res?.data ?? {}));
    dispatch(setSearchLoading(false));
  };
};
