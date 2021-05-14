import { SearchActionTypes } from "./searchActionTypes";
import { Dispatch } from "react";

export interface SearchReducer {
  origins: Array<TomTomOriginResult> | [];
  destinations: Array<YelpBusiness> | [];
  destinationType: string;
  destinationSearchLoading: boolean;
  destinationIndex: number;
  cachedDestinations:
    | Array<{
        middlePoint: Coordinate;
        query: string;
        result: Array<YelpBusiness>;
      }>
    | [];
  routeLoading: boolean;
  cachedRouteGeometries:
    | Array<{ origin: Coordinate; destination: Coordinate; geometry: string }>
    | [];
  userLocation?: any;
  currentRouteGeometries: Array<string> | [];
  selectedOriginIndex: number;
}

export type SearchAction = {
  payload?: any;
  type: SearchActionTypes;
};

/* MapBox */

export interface MapBoxDirectionsResponse {
  code: string;
  waypoints: Array<MapBoxWaypoint>;
  routes: Array<MapBoxRoute>;
}

export interface MapBoxWaypoint {
  name: string;
  location: Array<number>;
  disatnce: number | null;
}

export interface MapBoxRoute {
  duration: number;
  distance: number;
  weight_name: string;
  weight: number;
  geometry: string;
  legs: Array<any>;
  voiceLocale: string | null;
}

export interface CachedGeometryItem {
  origin: Coordinate;
  destination: Coordinate;
  geometry: string;
}

/* TomTom */

export interface TomTomSearchResponse {
  summary: any;
  results: Array<TomTomOriginResult>;
}
export interface TomTomOriginResult {
  type: TomTomLocationTypes;
  id: string;
  score: number;
  dist: number | null; // if geoBias is provided in api call
  info: string;
  entityType: string | null; // if type == Geography
  poi: TomTomPoi | null; // if type == POI
  relatedPois: { relationType: string; id: string }; //TODO relationType can be an enum
  address: TomTomAddress;
  position: TomTomCoordinate;
  mapCodes: Array<TomTomMapCode>;
  viewport: TomTomBoundry; // uses TomTom coordinates
  boundingBox: TomTomBoundry; // if type == Geography
  entrypoints: Array<{
    type: string;
    functions: Array<string>;
    position: TomTomCoordinate;
  }>;
  addressRanges: any | null; // if type == Address Range
  chargingPark: any | null; // if POI have Electric Vehicle Type
  dataSources: any | null; // optional for use with TomTom Additional Data Service
}

export interface TomTomPoi {
  name: string;
  phone: string;
  brands: Array<{ name: string }>;
  url: string;
  categories: Array<string> | null; // Deprecated - use classifications
  categorySet: Array<{ id: string }>;
  openingHours: { mode: string; timeRanges: Array<any> };
  classifications: Array<{ code: string; names: any }>;
  timeZone: { ianaId: string };
}

export interface TomTomAddress {
  streetNumber: string;
  streetName: string;
  municipalitySubdivision: string;
  municipality: string;
  countrySecondarySubdivision: string;
  countryTertiarySubdivision: string;
  countrySubdivision: string;
  postalCode: string;
  postalName: string | null; // if entityType == PostalCodeArea
  extendedPostalCode: string;
  countryCode: string;
  country: string;
  countryCodeISO3: string;
  freeformAddress: string;
  countrySubdivisionName: string | null;
  countrySubdivisionCode: string | null;
  localName: string;
}

export interface TomTomMapCode {
  type: string;
  fullMapcode: string;
  territory: string | null;
  code: string | null;
}

export interface TomTomCoordinate {
  lat: number;
  lon: number;
}

export interface TomTomBoundry {
  topLeftPoint: TomTomCoordinate;
  btmRightPoint: TomTomCoordinate;
}

export type TomTomLocationTypes =
  | "POI"
  | "Street"
  | "Geography"
  | "Point Address"
  | "Address Range"
  | "Cross Street";

/* YELP */
export interface YelpDestinationsResult {
  total: number;
  businesses: Array<YelpBusiness>;
  region: YelpRegion;
}

export interface YelpBusiness {
  rating: YelpRating;
  price: YelpPrice;
  phone: string;
  id: string;
  alias: string;
  is_closed: boolean;
  categories: Array<YelpCategories>;
  review_count: number;
  name: string;
  url: string;
  coordinates: Coordinate;
  image_url: string;
  location: YelpLocation;
  distance: number;
  transactions: Array<YelpTransactionTypes>;
  display_phone: string;
}

export interface YelpLocation {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  display_address: Array<string>;
}

export interface YelpCategories {
  alias: string;
  title: string;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface YelpRegion {
  center: Coordinate;
}

export type YelpTransactionTypes =
  | "pickup"
  | "delivery"
  | "resaurant_reservation";
export type YelpRating = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
export type YelpPrice = "$" | "$$" | "$$$" | "$$$$";

export interface CachedDestinationsItem {
  query: string;
  middlePoint: Coordinate;
  result: Array<YelpBusiness>;
}
