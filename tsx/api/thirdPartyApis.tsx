import axios, { AxiosResponse } from "axios";
import {
  MapBoxDirectionsResponse,
  TomTomSearchResponse,
  YelpDestinationsResult,
} from "../features/Search/redux/searchReducerTypes";
import {
  YELP_API_KEY,
  MAP_BOX_API_KEY,
  TOM_TOM_KEY,
} from "../utils/googleKeyUtil";

export const mapBoxDirectionsSearch = async (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number }
): Promise<AxiosResponse<MapBoxDirectionsResponse>> => {
  const MAP_BOX_URL = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=polyline&access_token=${MAP_BOX_API_KEY}`;
  return await axios.get(MAP_BOX_URL);
};

export const yelpSearch = async (
  term: string,
  location
): Promise<AxiosResponse<YelpDestinationsResult>> => {
  const BASE_YELP_SEARCH = "https://api.yelp.com/v3/businesses/search";
  console.log("Axios GET yelp/v3/businesses/search with term", term);
  let config = {
    headers: {
      Authorization: `Bearer ${YELP_API_KEY}`,
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

export const yelpBusinessDetails = async (id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${YELP_API_KEY}`,
    },
  };
  return await axios.get(`https://api.yelp.com/v3/businesses/${id}`, config);
};

export const tomTomAutoComplete = async (
  query,
  userLocation
): Promise<AxiosResponse<TomTomSearchResponse>> => {
  const encodeUrl = require("encodeurl");
  const latLonBias = !!userLocation
    ? `lon=${userLocation.longitude}&lat=${userLocation.latitude}`
    : "lon=-87.9806&lat=42.0884";
  const url = encodeUrl(
    `https://api.tomtom.com/search/2/search/${query}.json?key=${TOM_TOM_KEY}&${latLonBias}&typeahead=true&minFuzzyLevel=2&maxFuzzyLevel=4`
  );
  return await axios.get(url);
};

export const reverseGeocode = async (userLocation) => {
  const encodeUrl = require("encodeurl");
  const url = encodeUrl(
    `https://api.tomtom.com/search/2/reverseGeocode/${userLocation.latitude}%2C${userLocation.longitude}.json?key=${TOM_TOM_KEY}`
  );
  return await axios.get(url);
};
