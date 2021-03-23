import React, { ReactElement, useEffect, useRef } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Badge } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import { Icon } from "react-native-vector-icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import { setSearchType } from "../../../../testActions";
import theme from "../../../themes/theme";

interface Props {}

export default function PlaceList({}: Props): ReactElement {
  const dispatch = useDispatch();
  const { searchResult, searchLoading } = useSelector((state: any) => {
    // console.log(JSON.stringify(state.testReducer.searchResult?.results));
    return state.testReducer;
  });

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
    "window"
  );

  const types = [
    "Coffee",
    "Pizza",
    "Mexican",
    "Italian",
    "Chinese",
    "Bar",
    "Fast Food",
  ];

  const carouselRef = useRef<any | null>(null);

  useEffect(() => {
    if (!searchLoading) {
      carouselRef.current?.snapToItem(0);
    }
  }, [searchLoading]);

  const _renderType = ({ item, index }) => {
    return (
      <View
        style={[
          styles.shadow,
          {
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            minWidth: 70,
            padding: 5,
            marginRight: 10,
            marginLeft: 10,
            borderRadius: 20,
            backgroundColor: "white",
          },
        ]}
      >
        <Text style={{ color: theme.charcoalGrey, fontWeight: "500" }}>
          {item}
        </Text>
      </View>
    );
  };

  const _renderPlace = ({ item, index }) => {
    return (
      <View
        style={[
          styles.shadow,
          {
            height: SCREEN_HEIGHT / 5,
            padding: 30,
            marginRight: 10,
            marginLeft: 10,
            borderRadius: 60,
            backgroundColor: "white",
          },
        ]}
      >
        <Badge
          value={index + 1}
          containerStyle={{ position: "absolute", top: 17, left: 7 }}
          badgeStyle={{
            backgroundColor: theme.purple,
            height: 20,
            width: 20,
          }}
        />
        <Text style={{ color: theme.charcoalGrey, fontWeight: "500" }}>
          {searchLoading ? "Loading" : item.name}
        </Text>
        <Text style={{ color: theme.charcoalGrey, fontWeight: "200" }}>
          {!searchLoading && item.formatted_address}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 0.35 }}>
      {searchResult && (
        <>
          <Carousel
            data={types}
            renderItem={_renderType}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH / 5}
            onSnapToItem={(index) => {
              dispatch(setSearchType(types[index]));
            }}
          />
          <Carousel
            ref={carouselRef}
            data={searchResult}
            renderItem={_renderPlace}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH - 60}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: theme.lightGrey,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
  },
});
