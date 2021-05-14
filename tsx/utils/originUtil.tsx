import { TomTomOriginResult } from "../features/Search/redux/searchReducerTypes";

export const getHeader = (origin: TomTomOriginResult): string => {
  switch (origin.type) {
    case "POI":
      return origin.poi?.name ?? "";
    case "Street":
    case "Cross Street":
      return !!origin.address?.streetName
        ? origin.address?.streetName
        : origin.address?.freeformAddress;
    case "Geography":
      return getGeographyTypeHeader(origin);
    case "Point Address":
    case "Address Range":
      return `${origin.address?.streetNumber} ${origin.address?.streetName}`;
    default:
      return `${origin.address?.streetNumber} ${origin.address?.streetName}`;
  }
};

export const getSubText = (origin: TomTomOriginResult): string => {
  return origin.address?.freeformAddress;
};

const getGeographyTypeHeader = (origin: TomTomOriginResult): string => {
  switch (origin.entityType) {
    case "Country":
      return origin.address?.country ?? origin.address?.freeformAddress;
    case "PostalCodeArea":
      return origin.address?.postalCode;
    case "Municipality":
      return origin.address?.municipality;
    default:
      return origin.address?.freeformAddress;
  }
};
