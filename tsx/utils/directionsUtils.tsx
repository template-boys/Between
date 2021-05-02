import polyline from "@mapbox/polyline";
import {
  getDistance,
  computeDestinationPoint,
  getRhumbLineBearing,
  getPathLength,
} from "geolib";
import { mapBoxDirectionsSearch } from "../api/thirdPartyApis";

/*
 * Convert a polyline string (returned from mapbox API) into
 * an array [{latitude, longitude}, ...]
 */
export const getPolylineArray = (polylineString: string) => {
  //polylineArray is an array of arrays [[longitude, latitude]]
  const polylineArray: any[] = polyline.decode(polylineString);

  //convert polylineArray into array of objects for our <Polyline /> to understand
  const returnArray: any[] = polylineArray.map((coordinate: any[]) => {
    return {
      latitude: coordinate[0],
      longitude: coordinate[1],
    };
  });

  return returnArray;
};

/*
 * Get middle point along a route
 *
 */
export const getMiddlePoint = async (origin, destination) => {
  const directions = await mapBoxDirectionsSearch(origin, destination);
  const route = directions?.data?.routes[0];
  let indexBefore, indexAfter;
  const polylineArray = getPolylineArray(route.geometry);
  const fullDistance = getPathLength(polylineArray, getDistance);

  let routeDistance = 0;
  let distanceToDestination;
  let legDistance;

  for (let i = 0; i < polylineArray.length - 1; i++) {
    legDistance = getDistance(polylineArray[i], polylineArray[i + 1]);
    // If we are on or past the middle distance
    if (routeDistance + legDistance >= fullDistance / 2) {
      indexAfter = i;
      indexBefore = i - 1;
      distanceToDestination = fullDistance / 2 - routeDistance;
      break;
    }
    routeDistance += legDistance;
  }

  const middlePoint = computeDestinationPoint(
    polylineArray[indexBefore],
    distanceToDestination,
    getRhumbLineBearing(polylineArray[indexBefore], polylineArray[indexAfter])
  );

  return middlePoint;
};
