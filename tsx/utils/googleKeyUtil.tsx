import { GOOGLE_API_KEY_1, GOOGLE_API_KEY_2, YELP_API_KEY } from "@env";

export const getGoogleApiKey = () => {
  return Math.random() < 0.5 ? GOOGLE_API_KEY_1 : GOOGLE_API_KEY_2;
};

export const getYelpApiKey = () => {
  return YELP_API_KEY;
};
