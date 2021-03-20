export const setSessionID = () => ({
  type: "SET_AUTO_COMPLETE_SESSION_ID",
});

export const setLocationOne = (location) => ({
  type: "SET_LOCATION_ONE",
  payload: location,
});

export const setLocationTwo = (location) => ({
  type: "SET_LOCATION_TWO",
  payload: location,
});

export const loginUser = () => ({
  type: "LOGIN_USER",
});

export const addSearchLocation = (newLocation) => ({
  type: "ADD_LOCATION",
  newLocation,
});

export const setSearchResult = (searchResult) => ({
  type: "SET_SEARCH_RESULT",
  searchResult,
});
