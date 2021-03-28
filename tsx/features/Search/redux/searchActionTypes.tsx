import keyMirror from "keymirror";

export default keyMirror({
  SET_AUTO_COMPLETE_SESSION_ID: null,

  //Place search results
  SET_SEARCH_LOADING: null,
  SET_SEARCH_TYPE: null,
  SET_SEARCH_RESULT: null,
  ADD_CACHED_SEARCH_RESULT: null,
  REMOVE_FIRST_CACHED_SEARCH_RESULT: null,

  //Adds location from auto complete input
  ADD_LOCATION: null,
  REMOVE_LOCATION_INDEX: null,

  //Currently selected place index
  SET_PLACE_INDEX: null,

  //Directions
  GET_DIRECTIONS: null,
  SET_DIRECTIONS_LOADING: null,
  SET_DIRECTIONS: null,
  ADD_CACHED_DIRECTION: null,
  REMOVE_FIRST_CACHED_DIRECTION: null,

  //Clear data
  LOGOUT_USER: null,
});
