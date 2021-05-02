import axios, { AxiosResponse } from "axios";
import {
  MapBoxDirectionsResponse,
  TomTomOriginResult,
  TomTomSearchResponse,
  YelpDestinationsResult,
} from "../features/Search/redux/searchReducerTypes";
import {
  getYelpApiKey,
  getMapBoxKey,
  getTomTomKey,
} from "../utils/googleKeyUtil";

export const mapBoxDirectionsSearch = async (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number }
): Promise<AxiosResponse<MapBoxDirectionsResponse>> => {
  const key = getMapBoxKey();
  const MAP_BOX_URL = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=polyline&access_token=${key}`;

  return await axios.get(MAP_BOX_URL);
};

export const yelpSearch = async (
  term: string,
  location
): Promise<AxiosResponse<YelpDestinationsResult>> => {
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
      limit: 15,
    },
  };
  return await axios.get(BASE_YELP_SEARCH, config);
};

export const tomTomAutoComplete = async (
  query,
  userLocation
): Promise<AxiosResponse<TomTomSearchResponse>> => {
  const key = getTomTomKey();
  const encodeUrl = require("encodeurl");
  const latLonBias = !!userLocation
    ? `lon=${userLocation.longitude}&lat=${userLocation.latitude}`
    : "lon=-87.9806&lat=42.0884";
  const url = encodeUrl(
    `https://api.tomtom.com/search/2/search/${query}.json?key=${key}&${latLonBias}&typeahead=true&minFuzzyLevel=2&maxFuzzyLevel=4`
  );
  return await axios.get(url);
};

export const reverseGeocode = async (userLocation) => {
  const key = getTomTomKey();
  const encodeUrl = require("encodeurl");
  const url = encodeUrl(
    `https://api.tomtom.com/search/2/reverseGeocode/${userLocation.latitude}%2C${userLocation.longitude}.json?key=${key}`
  );
  return await axios.get(url);
};
