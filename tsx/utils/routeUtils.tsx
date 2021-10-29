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
  const halfwayDistance = fullDistance / 2;

  let routeDistance = 0;
  let overshotDistance = 0;
  let legDistance = 0;

  for (let i = 0; i < polylineArray.length - 1; i++) {
    legDistance = getDistance(polylineArray[i], polylineArray[i + 1]);

    if (routeDistance + legDistance >= halfwayDistance) {
      indexAfter = i;
      indexBefore = i - 1;
      overshotDistance = halfwayDistance - routeDistance;
      break;
    }
    routeDistance += legDistance;
  }

  const middlePoint = computeDestinationPoint(
    polylineArray[indexAfter],
    overshotDistance,
    getRhumbLineBearing(polylineArray[indexAfter], polylineArray[indexBefore])
  );

  return middlePoint;
};

export const secondsToHms = (d: number) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hr " : " hrs ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " min " : " mins") : "";
  return hDisplay + mDisplay;
};
