import {
  GOOGLE_API_KEY_1,
  GOOGLE_API_KEY_2,
  YELP_API_KEY,
  MAP_BOX_API_KEY,
  HERE_API_KEY,
  TOM_TOM_KEY,
} from "@env";

export const getGoogleApiKey = () => {
  return Math.random() < 0.5 ? GOOGLE_API_KEY_1 : GOOGLE_API_KEY_2;
};

export const getYelpApiKey = () => YELP_API_KEY;

export const getMapBoxKey = () => MAP_BOX_API_KEY;

export const getHereApiKey = () => HERE_API_KEY;

export const getTomTomKey = () => TOM_TOM_KEY;
