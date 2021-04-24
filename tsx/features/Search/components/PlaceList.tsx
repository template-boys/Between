import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useDispatch, useSelector } from "react-redux";
import { setPlaceIndex, setSearchType } from "../../Search/redux/searchActions";
import theme from "../../../themes/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import style from "../../../themes/style";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

interface Props {
  searchResult: any;
  searchLoading: boolean;
  navigation: any;
  bottomSheetRef: any;
  setMapHeight: any;
}

export default function PlaceList({
  searchResult,
  searchLoading,
  navigation,
  setMapHeight,
  bottomSheetRef,
}: Props): ReactElement {
  const dispatch = useDispatch();

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

  const searchType = useSelector((state) => state.searchReducer.searchType);
  const placeIndex = useSelector((state) => state.searchReducer.placeIndex);

  const [typeIndex, setTypeIndex] = React.useState(types.indexOf(searchType));
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
    "window"
  );

  const carouselRef = useRef<any | null>(null);
  const typeCarouselRef = useRef<any | null>(null);

  const _renderType = ({ item, index }) => {
    const borderStyle =
      typeIndex === index
        ? { borderColor: theme.darkPurple, borderWidth: 2 }
        : { borderWidth: 0 };
    const backgroundColor = typeIndex === index ? theme.darkPurple : "white";
    const isSelected = typeIndex === index;
    return searchResult.length === 0 ? null : (
      <TouchableOpacity
        onPress={() => {
          setPlaceIndex(0);
          setTypeIndex(index);
          typeCarouselRef.current?.snapToItem(index);
          carouselRef.current?.snapToItem(0);
          dispatch(setSearchType(types[index]));
        }}
        style={{
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        <View
          style={[
            styles.shadow,
            {
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              minWidth: 100,

              borderRadius: 15,

              backgroundColor: isSelected ? theme.darkPurple : "white",
            },
            borderStyle,
          ]}
        >
          <Text
            style={{
              color: isSelected ? "white" : "#a8a8a8",
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
          {
            // height: SCREEN_HEIGHT / 5,
            paddingLeft: 20,
            paddingRight: 20,
            marginRight: 10,
            marginLeft: 10,
            borderRadius: 26,
            borderWidth: 1,
            borderColor: "#e3e3e3",
            justifyContent: "space-between",
            // marginBottom: 15,
            // minHeight: 150,
            marginBottom: 20,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {!searchLoading && !!item?.image_url && (
            <Image
              source={{ uri: item?.image_url }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 13,
                marginRight: 12,
                marginTop: 15,
              }}
            />
          )}
          <View
            style={{
              flex: 1,
              marginTop: 10,
            }}
          >
            <Text
              style={[style.semiBold, { fontSize: 15, paddingTop: 2 }]}
              numberOfLines={3}
            >
              {searchLoading ? "" : item.name}
            </Text>
          </View>
        </View>

        <Text
          numberOfLines={2}
          style={[style.light, { marginTop: 5, fontSize: 13 }]}
        >
          {!searchLoading &&
            `${item?.location?.display_address[0]} ${item?.location?.display_address[1]}`}
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PlaceDetailsScreen");
          }}
          style={{ flexDirection: "row", marginBottom: 20, marginTop: 5 }}
        >
          <Text
            style={[style.regular, { color: theme.darkPurple, fontSize: 13 }]}
          >
            {!searchLoading ? "View more information" : ""}
          </Text>
          {!searchLoading && (
            <Icon
              style={{ alignSelf: "center", marginLeft: 5 }}
              name="return-up-forward-outline"
              size={20}
              color={theme.darkPurple}
            />
          )}
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
    if (searchLoading) {
      carouselRef.current?.snapToItem(0);
    }
  }, [searchLoading]);

  const shouldShowGlobalSpinner = !!searchLoading && searchResult.length === 0;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: "black",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 1,
        paddingTop: 30,
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
      }}
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        setMapHeight(SCREEN_HEIGHT - height);
      }}
    >
      {/* <BottomSheet
        ref={bottomSheetRef}
        openDuration={250}
        customStyles={{
          draggableIcon: {
            backgroundColor: "transparent",
          },
          wrapper: {
            backgroundColor: "transparent",
          },
          container: [
            {
              justifyContent: "center",
              alignItems: "center",
              height: SCREEN_HEIGHT / 2.5,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              shadowColor: "black",
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 1,
              shadowRadius: 5,
              elevation: 1,
              paddingTop: 15,
            },
          ],
        }}
      > */}
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
            itemWidth={115}
            enableSnap={false}
            scrollEnabled={!searchLoading}
            firstItem={1}
            containerCustomStyle={{ paddingBottom: 30 }}
          />
          <Carousel
            containerCustomStyle={{}}
            ref={carouselRef}
            data={searchResult}
            renderItem={_renderPlace}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={300}
            onBeforeSnapToItem={(i) => {
              dispatch(setPlaceIndex(i));
            }}
          />
          {/* <Pagination
            dotsLength={10}
            activeDotIndex={placeIndex}
            dotStyle={{
              width: 5,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: theme.darkPurple,
            }}
            inactiveDotStyle={{
              backgroundColor: theme.midGrey,
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            containerStyle={{ backgroundColor: "violet" }}
          /> */}
        </>
      )}
      {/* </BottomSheet> */}
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
