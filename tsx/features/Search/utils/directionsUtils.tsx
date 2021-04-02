import polyline from "@mapbox/polyline";

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
