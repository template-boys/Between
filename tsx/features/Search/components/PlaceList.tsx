import React, { ReactElement, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useDispatch, useSelector } from "react-redux";
import { setPlaceIndex } from "../../Search/redux/searchActions";
import theme from "../../../themes/theme";
import DestinationListItem from "./DestinationListItem";
import { types } from "../constants/searchConstants";
import DestinationTypeListItem from "./DestinationTypeListItem";
import { State } from "../../../../rootReducer";
interface Props {
  searchResult: any;
  searchLoading: boolean;
  navigation: any;
  bottomSheetRef: any;
  setMapHeight: any;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function PlaceList({
  searchResult,
  searchLoading,
  navigation,
  setMapHeight,
  bottomSheetRef,
}: Props): ReactElement {
  const dispatch = useDispatch();

  const searchType = useSelector((state: State) => state.searchReducer.searchType);
  const placeIndex = useSelector((state: State) => state.searchReducer.placeIndex);

  const [typeIndex, setTypeIndex] = React.useState<number>(
    types.indexOf(searchType)
  );

  const carouselRef = useRef<any | null>(null);
  const typeCarouselRef = useRef<any | null>(null);

  const _renderType = ({ item, index }) => {
    const isSelected = typeIndex === index;
    return searchResult.length === 0 ? null : (
      <DestinationTypeListItem
        isSelected={isSelected}
        destinationItem={item}
        index={index}
        setCurrentTypeIndex={setTypeIndex}
        carouselRef={carouselRef}
        typeCarouselRef={typeCarouselRef}
      />
    );
  };

  const _renderDestinationListItem = ({ item }) => {
    return <DestinationListItem destinationItem={item} />;
  };

  useEffect(() => {
    carouselRef.current?.snapToItem(0);
  }, [searchLoading]);

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        setMapHeight(SCREEN_HEIGHT - height - 40);
      }}
    >
      <FlatList
        horizontal
        ref={typeCarouselRef}
        data={types}
        renderItem={_renderType}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={!searchLoading}
        contentContainerStyle={{
          alignItems: "center",
          height: 80,
          paddingHorizontal: 20,
        }}
      />
      {!!searchLoading ? (
        <View style={{ height: 180, width: SCREEN_WIDTH }}>
          <ActivityIndicator
            style={styles.loading}
            size={"large"}
            color={theme.darkPurple}
          />
        </View>
      ) : (
        <Carousel
          containerCustomStyle={{}}
          ref={carouselRef}
          data={searchResult}
          renderItem={_renderDestinationListItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={300}
          onBeforeSnapToItem={(i) => {
            dispatch(setPlaceIndex(i));
          }}
        />
      )}
      <View style={styles.paginationContainer}>
        {searchResult.map((_, index) => (
          <View
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  placeIndex === index ? theme.darkPurple : theme.lightGrey,
                opacity: placeIndex === index ? 1 : 0.4,
                width: placeIndex === index ? 10 : 5,
              },
            ]}
          ></View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
  },
  paginationContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paginationDot: {
    marginHorizontal: 5,
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
