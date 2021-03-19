import axios from 'axios';
import Qs from 'qs';
import { getGoogleApiKey } from '../utils/googleKeyUtil';

const BASE_PLACE_SEARCH = "https://maps.googleapis.com/maps/api/place/textsearch/json?";

export const placeSearch = async (query, language = 'en', location?) => {
  return await axios.get( BASE_PLACE_SEARCH + Qs.stringify({
      key: getGoogleApiKey(),
      query,
      location: `${location.latitude},${location.longitude}`,
      radius: '1000',
    })
  )
}