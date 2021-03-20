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
