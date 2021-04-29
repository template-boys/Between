import polyline from "@mapbox/polyline";
import {
  getDistance,
  computeDestinationPoint,
  getRhumbLineBearing,
  getPathLength,
} from "geolib";
import { mapBoxDirectionsSearch } from "../../../api/thirdPartyApis";

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
  console.log("Route Distance: ", fullDistance);
  console.log("Point Before: ", indexBefore, polylineArray[indexBefore]);
  console.log("Point After: ", indexAfter, polylineArray[indexAfter]);

  console.log(
    "Calculated Bearing: ",
    getRhumbLineBearing(polylineArray[indexBefore], polylineArray[indexAfter])
  );

  const middlePoint = computeDestinationPoint(
    polylineArray[indexBefore],
    distanceToDestination,
    getRhumbLineBearing(polylineArray[indexBefore], polylineArray[indexAfter])
  );

  console.log("Calculated MiddlePoint: ", middlePoint);

  return middlePoint;
};

// export const getOriginCombinations = (
//   originsArray: Array<any>
// ): Array<Array<any>> => {
//   if (originsArray.length === 2) {
//     return [originsArray];
//   }
//   let combinations: Array<Array<any>> = [[]];
//   let count = 0;
//   for (let i = 0; i < originsArray.length; i++) {
//     for (let j = i + 1; i < originsArray.length; j++) {
//       combinations[count] = [originsArray[i], originsArray[j]];
//       count++;
//     }
//   }
//   return combinations;
// };

// export const getPolylinesArrayFromCombinations = async (combinations: any[][]): Promise<any[][]> => {
//   let directionsArray: any[][] = [[]];
//   let direction;
//   const combinationsMap = async (combinations) => {
//     return combinations.map(async (origins) => {
//       direction = await mapBoxDirectionsSearch(origins[0], origins[1]);
//       return getPolylineArray(direction?.data?.routes[0]?.geometry);
//     });
//   }
//   directionsArray = await combinationsMap(combinations);
//   return directionsArray;
// };
