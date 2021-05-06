import { createSelector } from "reselect";
import { State } from "../../../../rootReducer";
import { getPolylineArray } from "../../../utils/routeUtils";
import { Coordinate, YelpBusiness } from "./searchReducerTypes";

const getCurrentRouteGeometries = (state: State) =>
  state.searchReducer?.currentRouteGeometries;

const getDestinations = (state: State) => state.searchReducer.destinations;

const getCurrentDestinationIndex = (state: State): number =>
  state.searchReducer?.destinationIndex;

// export const currentPolyLineArray: (
//   state: State
// ) => Array<Coordinate> = createSelector(
//   [getCurrentRouteGeometry],
//   (currentRouteGeometry) => {
//     if (!!currentRouteGeometry) {
//       return getPolylineArray(currentRouteGeometry);
//     } else {
//       return [];
//     }
//   }
// );

export const getPolylineArrays: (
  state: State
) => Array<Array<Coordinate>> = createSelector(
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

export const getCurrentDestination: (
  state: State
) => YelpBusiness = createSelector(
  [getCurrentDestinationIndex, getDestinations],
  (currentDestinationIndex, destinations) => {
    return destinations[currentDestinationIndex];
  }
);
