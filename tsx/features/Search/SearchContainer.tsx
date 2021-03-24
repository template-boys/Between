import { getCenterOfBounds } from "geolib";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchScreen from "./SearchScreen";
import {
  addSearchLocation as addSearchLocationAction,
  setSearchType as setSearchTypeAction,
  removeSearchLocation as removeSearchLocationAction,
  getPlaceSearch as getPlaceSearchActon,
} from "./redux/searchActions";

interface Props {}

const SearchContainer = ({ navigation }) => {
  const dispatch = useDispatch();

  //Redux State
  const searchLocations = useSelector(
    (state) => state.searchReducer.searchLocations
  );
  const searchResult = useSelector(
    (state) => state.searchReducer.searchResult?.results ?? []
  );
  const searchType = useSelector((state) => state.searchReducer.searchType);
  const searchLoading = useSelector(
    (state) => state.searchReducer.searchLoading
  );

  //Search Actions
  const addSearchLocation = (location) => {
    dispatch(addSearchLocationAction(location));
  };
  const setSearchType = (type) => {
    dispatch(setSearchTypeAction(type));
  };
  const setSearchLoading = (isLoading: boolean) => {
    dispatch(setSearchLoading(isLoading));
  };
  const removeSearchLocation = (index: number) => {
    dispatch(removeSearchLocationAction(index));
  };
  const getPlaceSearch = (query) => {
    let locationCoords: any[] = [];
    searchLocations.forEach((location) => {
      locationCoords.push({
        latitude: location.geometry.location.lat,
        longitude: location.geometry.location.lng,
      });
    });
    const middlePoint = getCenterOfBounds(locationCoords);
    dispatch(getPlaceSearchActon(query, middlePoint));
  };

  useEffect(() => {
    if (searchLocations.length > 1) {
      getPlaceSearch(searchType);
    }
  }, [searchLocations, searchType]);

  return (
    <SearchScreen
      addSearchLocation={addSearchLocation}
      setSearchType={setSearchType}
      removeSearchLocation={removeSearchLocation}
      getPlaceSearch={getPlaceSearch}
      searchLocations={searchLocations}
      searchLoading={searchLoading}
      searchType={searchType}
      searchResult={searchResult}
    />
  );
};

export default SearchContainer;
