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

export const setSearchType = (type) => ({
  type: "SET_SEARCH_TYPE",
  payload: type,
});

export const setSearchLoading = (isLoading) => ({
  type: "SET_SEARCH_LOADING",
  payload: isLoading,
});

export const loginUser = (user) => ({
  type: "LOGIN_USER",
  payload: user,
});

export const logoutUser = () => ({
  type: "LOGOUT_USER",
});

export const signupUser = () => ({
  type: "SIGNUP_USER",
});

export const addSearchLocation = (newLocation) => ({
  type: "ADD_LOCATION",
  newLocation,
});

export const setSearchResult = (searchResult) => ({
  type: "SET_SEARCH_RESULT",
  searchResult,
});

export const removeSearchLocation = (index) => {
  return {
    type: "REMOVE_SEARCH_RESULT",
    index,
  };
};
