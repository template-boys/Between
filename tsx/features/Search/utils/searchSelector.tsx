import { createSelector } from "reselect";
import { getPolylineArray } from "./directionsUtils";

const getCurrentRouteDirections = (state: any) =>
  state.searchReducer?.currentRouteDirections;

export const currentPolyLineArray: (state: any) => Array<any> = createSelector(
  [getCurrentRouteDirections],
  (currentRouteDirections) => {
    if (!!currentRouteDirections) {
      return getPolylineArray(currentRouteDirections);
    } else {
      return [];
    }
  }
);
