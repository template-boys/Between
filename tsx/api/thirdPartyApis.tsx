import axios from "axios";
import { getYelpApiKey, getMapBoxKey } from "../utils/googleKeyUtil";

export const mapBoxDirectionsSearch = async (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number }
) => {
  console.log(origin, destination);

  const key = getMapBoxKey();
  const MAP_BOX_URL = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=polyline&access_token=${key}`;
  console.log(MAP_BOX_URL);

  return await axios.get(MAP_BOX_URL);
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
