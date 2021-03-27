import React, { ReactElement, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Badge } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import { useDispatch, useSelector } from "react-redux";
import { setPlaceIndex, setSearchType } from "../../Search/redux/searchActions";
import theme from "../../../themes/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  searchResult: any;
  searchLoading: boolean;
  navigation: any;
}

export default function PlaceList({
  searchResult,
  searchLoading,
  navigation,
}: Props): ReactElement {
  const dispatch = useDispatch();

  const [typeIndex, setTypeIndex] = React.useState(1);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
    "window"
  );

  const types = [
    <Icon
      style={{ alignSelf: "center" }}
      name="search-outline"
      size={30}
      color={theme.purple}
    />,
    "Coffee",
    "Pizza",
    "Mexican",
    "Italian",
    "Chinese",
    "Bar",
    "Fast Food",
  ];

  const carouselRef = useRef<any | null>(null);
  const typeCarouselRef = useRef<any | null>(null);

  const _renderType = ({ item, index }) => {
    const borderStyle =
      typeIndex === index
        ? { borderColor: theme.darkPurple, borderWidth: 2 }
        : {};
    return searchResult.length === 0 ? null : (
      <TouchableOpacity
        onPress={() => {
          typeCarouselRef.current?.snapToItem(index);
          setTypeIndex(index);
        }}
      >
        <View
          style={[
            styles.shadow,
            {
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              minWidth: SCREEN_WIDTH / 4.5,
              padding: 5,
              marginRight: 10,
              marginLeft: 10,
              borderRadius: 15,
              backgroundColor: "white",
            },
            borderStyle,
          ]}
        >
          <Text
            style={{
              color: theme.charcoalGrey,
              fontWeight: "500",
              justifyContent: "center",
            }}
          >
            {item}
          </Text>
        </View>
      </TouchableOpacity>
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
            borderRadius: 26,
            backgroundColor: "white",
          },
        ]}
      >
        <Badge
          value={index + 1}
          containerStyle={{ position: "absolute", top: 1, left: 1 }}
          badgeStyle={{
            backgroundColor: theme.blue,
            height: 20,
            width: 20,
          }}
        />
        <Text style={{ color: theme.charcoalGrey, fontWeight: "500" }}>
          {searchLoading ? "" : item.name}
        </Text>
        <Text style={{ color: theme.charcoalGrey, fontWeight: "200" }}>
          {!searchLoading && item.formatted_address}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PlaceDetailsScreen");
          }}
        >
          <Text style={{ color: theme.purple, marginTop: 15 }}>
            {!searchLoading ? "View more information" : ""}
          </Text>
        </TouchableOpacity>
        {searchLoading && (
          <ActivityIndicator
            style={styles.loading}
            size={"large"}
            color={theme.darkPurple}
          />
        )}
      </View>
    );
  };

  useEffect(() => {
    if (!searchLoading) {
      carouselRef.current?.snapToItem(0);
    }
  }, [searchLoading]);

  const shouldShowGlobalSpinner = !!searchLoading && searchResult.length === 0;

  return (
    <View style={{ flex: 0.35 }}>
      {shouldShowGlobalSpinner ? (
        <ActivityIndicator
          style={styles.loading}
          size={"large"}
          color={theme.darkPurple}
        />
      ) : (
        <>
          <Carousel
            ref={typeCarouselRef}
            data={types}
            renderItem={_renderType}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH / 4.5}
            onSnapToItem={(index) => {
              dispatch(setSearchType(types[index]));
            }}
            enableSnap={false}
            scrollEnabled={!searchLoading}
            firstItem={1}
          />
          <Carousel
            ref={carouselRef}
            data={searchResult}
            renderItem={_renderPlace}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH - 100}
            onSnapToItem={(i) => {
              dispatch(setPlaceIndex(i));
            }}
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
