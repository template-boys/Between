import { createSelector } from "reselect";
import { State } from "../../../../rootReducer";
import { getPolylineArray } from "../../../utils/routeUtils";
import {
  Coordinate,
  YelpBusiness,
  TomTomOriginResult,
} from "./searchReducerTypes";

const getCurrentRouteGeometries = (state: State) =>
  state.searchReducer?.currentRouteGeometries;

const getDestinations = (state: State) => state.searchReducer.destinations;

const getCurrentDestinationIndex = (state: State): number =>
  state.searchReducer?.destinationIndex;

const getSelectedOriginIndex = (state: State) =>
  state.searchReducer.selectedOriginIndex;

const getOrigins = (state: State) => state.searchReducer.origins;

export const getPolylineArrays: (state: State) => Array<Array<Coordinate>> =
  createSelector(
    [getCurrentRouteGeometries],
    (currentRouteGeometries: Array<string>) => {
      if (!!currentRouteGeometries) {
        return currentRouteGeometries.map((geometry: string) =>
          getPolylineArray(geometry)
        );
      } else {
        return [];
      }
    }
  );

export const getCurrentDestination: (state: State) => YelpBusiness =
  createSelector(
    [getCurrentDestinationIndex, getDestinations],
    (currentDestinationIndex, destinations) => {
      return destinations[currentDestinationIndex];
    }
  );

export const selectedOrigin: (state: State) => TomTomOriginResult | null =
  createSelector(
    [getSelectedOriginIndex, getOrigins],
    (selectedOriginIndex, origins) => {
      return origins[selectedOriginIndex] ?? null;
    }
  );
