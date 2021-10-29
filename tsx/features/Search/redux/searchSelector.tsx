import { createSelector } from "reselect";
import { State } from "../../../../rootReducer";
import { getPolylineArray, secondsToHms } from "../../../utils/routeUtils";
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
    (currentRouteGeometries: Array<any>) => {
      if (!!currentRouteGeometries) {
        return currentRouteGeometries.map((route: any) =>
          getPolylineArray(route.geometry)
        );
      } else {
        return [];
      }
    }
  );

export const getRouteDurations: (state: State) => string = createSelector(
  [getCurrentRouteGeometries],
  (currentRouteGeometries: Array<any>) => {
    let durations = 0;
    if (!!currentRouteGeometries && currentRouteGeometries.length >= 1) {
      currentRouteGeometries.forEach((route: any) => {
        durations += route.duration;
      });
      const averageTime = durations / currentRouteGeometries.length;
      console.log(durations);
      console.log(averageTime);
      const averageTimeFormatted = secondsToHms(averageTime);
      return averageTimeFormatted;
    } else {
      return "Directions information not available, please try again later.";
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
