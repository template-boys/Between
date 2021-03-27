import axios from "axios";
import Qs from "qs";
import { getGoogleApiKey } from "../utils/googleKeyUtil";

const BASE_PLACE_SEARCH =
  "https://maps.googleapis.com/maps/api/place/textsearch/json?";

export const placeSearch = async (query, language = "en", location?) => {
  console.log("Fetching api/place/textsearch");
  return await axios.get(
    BASE_PLACE_SEARCH +
      Qs.stringify({
        key: getGoogleApiKey(),
        query,
        location: `${location.latitude},${location.longitude}`,
        radius: "1000",
      })
  );
};

export const directionsSearch = async (origin, destination) => {
  console.log("Fetching api/directions");
  const key = getGoogleApiKey();
  const BASE_DIRECTIONS_URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${key}`;
  console.log(BASE_DIRECTIONS_URL);

  return await axios.get(BASE_DIRECTIONS_URL);
};
