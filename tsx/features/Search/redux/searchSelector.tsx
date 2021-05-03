import { createSelector } from "reselect";
import { State } from "../../../../rootReducer";
import { getPolylineArray } from "../../../utils/directionsUtils";
import { Coordinate } from "./searchReducerTypes";

const getCurrentRouteGeometry = (state: State) =>
  state.searchReducer?.currentRouteGeometry;

export const currentPolyLineArray: (
  state: State
) => Array<Coordinate> = createSelector(
  [getCurrentRouteGeometry],
  (currentRouteGeometry) => {
    if (!!currentRouteGeometry) {
      return getPolylineArray(currentRouteGeometry);
    } else {
      return [];
    }
  }
);
