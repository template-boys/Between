import { GOOGLE_API_KEY_1, GOOGLE_API_KEY_2 } from "@env";

export const getGoogleApiKey = () => {
  return Math.random() < 0.5 ? GOOGLE_API_KEY_1 : GOOGLE_API_KEY_2;
};
