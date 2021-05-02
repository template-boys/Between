import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useDispatch, useSelector } from "react-redux";
import { setPlaceIndex, setSearchType } from "../../Search/redux/searchActions";
import theme from "../../../themes/theme";
import DestinationListItem from "./DestinationListItem";
import { types } from "../constants/searchConstants";
import DestinationTypeListItem from "./DestinationTypeListItem";
import { State } from "../../../../rootReducer";
import CustomInput from "../../../components/CustomInput";

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
  setMapHeight,
}: Props): ReactElement {
  const dispatch = useDispatch();

  const searchType = useSelector(
    (state: State) => state.searchReducer.searchType
  );
  const placeIndex = useSelector(
    (state: State) => state.searchReducer.placeIndex
  );

  const [typeIndex, setTypeIndex] = useState<number>(
    types.indexOf(searchType) === -1 ? 0 : types.indexOf(searchType)
  );

  const [searchQuery, setSearchQuery] = useState("");

  const [bottom, setBottom] = useState(0);

  const carouselRef = useRef<any | null>(null);
  const typeCarouselRef = useRef<any | null>(null);
  const searchTypeInputRef = useRef<any | null>(null);

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

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", keyboardWillHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", keyboardWillHide);
    };
  }, []);

  const keyboardWillShow = (e: any) => {
    setBottom(e.endCoordinates.height - 80);
  };

  const keyboardWillHide = () => {
    setBottom(0);
  };

  useEffect(() => {
    if (typeIndex === 0) {
      searchTypeInputRef?.current?.focus();
    }
  }, [typeIndex]);

  console.log(typeIndex);

  return (
    <View
      style={[styles.container, { bottom }]}
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        if (SCREEN_HEIGHT - height - bottom > SCREEN_HEIGHT / 3) {
          setMapHeight(SCREEN_HEIGHT - height - bottom - 40);
        } else {
          setMapHeight(SCREEN_HEIGHT - height - 40);
        }
      }}
    >
      {typeIndex === 0 ? (
        <CustomInput
          inputRef={searchTypeInputRef}
          onSubmitEditing={(q) => {
            if (!!q.nativeEvent.text) {
              dispatch(setSearchType(q.nativeEvent.text));
              dispatch(setPlaceIndex(0));
            }
          }}
          onChangeText={(q) => {
            setSearchQuery(q);
          }}
          placeholder="What are you looking for?"
          returnKeyType="search"
          containerStyle={styles.typeContainerStyle}
          inputContainerStyle={{
            paddingVertical: 10,
            height: 45,
            borderRadius: 20,
            backgroundColor: "white",
            borderColor: "#F2F2F2",
            borderWidth: 2,
          }}
          rightIconName={!!searchQuery ? "close" : undefined}
          iconName={"chevron-back-outline"}
          rightIconSize={20}
          leftIconSize={20}
          onRightIconPress={() => {
            searchTypeInputRef?.current?.clear();
            setSearchQuery("");
          }}
          onLeftIconPress={() => {
            setTypeIndex(1);
            dispatch(setSearchType("coffee"));
            dispatch(setPlaceIndex(0));
            setSearchQuery("");
          }}
        />
      ) : (
        <FlatList
          horizontal
          ref={typeCarouselRef}
          data={types}
          renderItem={_renderType}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={!searchLoading}
          contentContainerStyle={styles.typeContainerStyle}
        />
      )}
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
    backgroundColor: "white",
    height: 310,
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
  typeContainerStyle: {
    alignItems: "center",
    height: 80,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
});
