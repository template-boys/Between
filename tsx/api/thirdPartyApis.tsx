import axios from "axios";
import { getGoogleApiKey, getYelpApiKey } from "../utils/googleKeyUtil";

export const directionsSearch = async (origin, destination) => {
  console.log("Axios GET api/directions");
  const key = getGoogleApiKey();
  const BASE_DIRECTIONS_URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${key}`;
  return await axios.get(BASE_DIRECTIONS_URL);
};

export const yelpSearch = async (term: string, location) => {
  const BASE_YELP_SEARCH = "https://api.yelp.com/v3/businesses/search";
  console.log("Axios GET yelp/v3/businesses/search with term", term);
  const API_KEY = getYelpApiKey();
  let config = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    params: {
      longitude: location.longitude,
      latitude: location.latitude,
      term,
      sort_by: "distance",
    },
  };
  return await axios.get(BASE_YELP_SEARCH, config);
};
