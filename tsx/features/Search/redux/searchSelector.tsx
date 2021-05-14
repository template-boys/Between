import { createSelector } from "reselect";
import { State } from "../../../../rootReducer";
import { getPolylineArray } from "../../../utils/directionsUtils";
import { Coordinate, TomTomOriginResult } from "./searchReducerTypes";

const getCurrentRouteGeometry = (state: State) =>
  state.searchReducer?.currentRouteGeometry;

const getSelectedOriginIndex = (state: State) =>
  state.searchReducer.selectedOriginIndex;

const getOrigins = (state: State) => state.searchReducer.origins;

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

export const selectedOrigin: (
  state: State
) => TomTomOriginResult | null = createSelector(
  [getSelectedOriginIndex, getOrigins],
  (selectedOriginIndex, origins) => {
    return origins[selectedOriginIndex] ?? null;
  }
);
