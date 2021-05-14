import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestinationIndex,
  setDestinationType,
} from "../redux/searchActions";
import theme from "../../../themes/theme";
import DestinationListItem from "./DestinationListItem";
import { types } from "../constants/searchConstants";
import DestinationType from "./DestinationType";
import { State } from "../../../../rootReducer";
import CustomInput from "../../../components/CustomInput";
import { YelpBusiness } from "../redux/searchReducerTypes";
import BottomView from "./BottomView";

interface Props {
  destinations: Array<YelpBusiness>;
  destinationSearchLoading: boolean;
  navigation: any;
  bottomSheetRef: any;
  setMapHeight: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function DestinationBottomView({
  destinations,
  destinationSearchLoading,
  setMapHeight,
}: Props): ReactElement {
  const dispatch = useDispatch();

  //selectors
  const destinationType: string = useSelector(
    (state: State) => state.searchReducer.destinationType
  );
  const destinationIndex: number = useSelector(
    (state: State) => state.searchReducer.destinationIndex
  );

  //component state
  const [searchQuery, setSearchQuery] = useState("");
  const [hideInput, setHideInput] = useState(false);

  const [typeIndex, setTypeIndex] = useState<number>(
    types.indexOf(destinationType) === -1 ? 0 : types.indexOf(destinationType)
  );

  //refs
  const carouselRef = useRef<any | null>(null);
  const typeCarouselRef = useRef<any | null>(null);
  const destinationTypeInputRef = useRef<any | null>(null);
  const searchTypeInputRef = useRef<any | null>(null);

  const _renderType: React.FC<{ item: string; index: number }> = ({
    item,
    index,
  }) => {
    const isSelected = typeIndex === index;
    return destinations.length === 0 ? null : (
      <DestinationType
        setCurrentTypeIndex={setTypeIndex}
        isSelected={isSelected}
        destinationItem={item}
        index={index}
        carouselRef={carouselRef}
        typeCarouselRef={typeCarouselRef}
        onIconPress={() => {
          setTypeIndex(0);
          setHideInput(false);
        }}
      />
    );
  };

  useEffect(() => {
    carouselRef.current?.snapToItem(0);
  }, [destinationSearchLoading]);

  useEffect(() => {
    if (typeIndex === 0) {
      destinationTypeInputRef?.current?.focus();
    }
  }, [typeIndex]);

  useEffect(() => {
    if (!hideInput && types.indexOf(destinationType) === -1) {
      searchTypeInputRef?.current?.focus();
      searchTypeInputRef?.current?.setNativeProps({ text: destinationType });
    }
  }, [hideInput]);

  const getPaginationDotStyle = (placeIndex: number, index: number) => {
    const isCurrentIndex = placeIndex === index;
    return [
      styles.paginationDot,
      {
        backgroundColor: isCurrentIndex ? theme.darkPurple : theme.lightGrey,
        opacity: isCurrentIndex ? 1 : 0.4,
        width: isCurrentIndex ? 10 : 5,
      },
    ];
  };

  return (
    <BottomView setMapHeight={setMapHeight}>
      {typeIndex === 0 && !hideInput ? (
        <CustomInput
          inputRef={searchTypeInputRef}
          onSubmitEditing={(q) => {
            if (!!q.nativeEvent.text) {
              dispatch(setDestinationType(q.nativeEvent.text));
              dispatch(setDestinationIndex(0));
            }
          }}
          onChangeText={(q) => {
            setSearchQuery(q);
          }}
          placeholder="What are you looking for?"
          returnKeyType="search"
          containerStyle={styles.typeContainerStyle}
          inputContainerStyle={styles.inputContainer}
          rightIconName={!!searchQuery ? "close" : undefined}
          iconName={"chevron-back-outline"}
          rightIconSize={20}
          leftIconSize={20}
          onRightIconPress={() => {
            searchTypeInputRef?.current?.clear();
            setSearchQuery("");
          }}
          onLeftIconPress={() => {
            setHideInput(true);
            setSearchQuery("");
            if (!searchQuery) {
              setTypeIndex(1);
              dispatch(setDestinationType("Coffee"));
            }
          }}
        />
      ) : (
        <FlatList
          horizontal
          ref={typeCarouselRef}
          data={types}
          renderItem={_renderType}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={!destinationSearchLoading}
          contentContainerStyle={styles.typeContainerStyle}
        />
      )}
      {!!destinationSearchLoading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
            style={styles.loading}
            size={"large"}
            color={theme.darkPurple}
          />
        </View>
      ) : (
        <Carousel
          removeClippedSubviews={false}
          ref={carouselRef}
          data={destinations}
          renderItem={({ item }) => (
            <DestinationListItem destinationItem={item} />
          )}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={320}
          removeClippedSubviews={false}
          onBeforeSnapToItem={(i) => {
            dispatch(setDestinationIndex(i));
          }}
        />
      )}
      <View style={styles.paginationContainer}>
        {destinations.map((_, index: number) => (
          <View style={getPaginationDotStyle(destinationIndex, index)} />
        ))}
      </View>
    </BottomView>
  );
}

const styles = StyleSheet.create({
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
  inputContainer: {
    paddingVertical: 10,
    height: 45,
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: "#F2F2F2",
    borderWidth: 2,
  },
  indicatorContainer: {
    height: 180,
    width: SCREEN_WIDTH,
  },
});
