import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  Keyboard,
  Animated,
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  destinations: Array<YelpBusiness>;
  destinationSearchLoading: boolean;
  navigation: any;
  bottomSheetRef: any;
  setMapHeight: any;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CONTENT_HEIGHT = 310;
const NAVBAR_HEIGHT = 49;

export default function DestinationList({
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
  const [animatedBottom, setAnimatedBottom] = useState(new Animated.Value(0));
  const [typeIndex, setTypeIndex] = useState<number>(
    types.indexOf(destinationType) === -1 ? 0 : types.indexOf(destinationType)
  );

  //refs
  const carouselRef = useRef<any | null>(null);
  const typeCarouselRef = useRef<any | null>(null);
  const destinationTypeInputRef = useRef<any | null>(null);
  const searchTypeInputRef = useRef<any | null>(null);
  const { bottom: BOTTOM_INSETS } = useSafeAreaInsets();

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
    setMapHeight(SCREEN_HEIGHT - CONTENT_HEIGHT);
    Keyboard.addListener("keyboardWillShow", keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", keyboardWillHide);

    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", keyboardWillHide);
    };
  }, []);

  const keyboardWillShow = (e: any) => {
    Animated.timing(animatedBottom, {
      toValue: BOTTOM_INSETS - e.endCoordinates.height + NAVBAR_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (
        SCREEN_HEIGHT - CONTENT_HEIGHT - e.endCoordinates.height + 40 >
        SCREEN_HEIGHT / 3
      ) {
        setMapHeight(
          SCREEN_HEIGHT - CONTENT_HEIGHT - e.endCoordinates.height + 40
        );
      }
    });
  };

  const keyboardWillHide = () => {
    setTimeout(() => {
      setMapHeight(SCREEN_HEIGHT - CONTENT_HEIGHT);
    }, 100);

    Animated.timing(animatedBottom, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {});
  };

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

  const transformStyle = {
    transform: [
      {
        translateY: animatedBottom,
      },
    ],
  };

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
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer, transformStyle]}>
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
            ref={carouselRef}
            data={destinations}
            renderItem={({ item }) => (
              <DestinationListItem destinationItem={item} />
            )}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={300}
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
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    bottom: 0,
    flex: 1,
  },
  animatedContainer: {
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
    height: CONTENT_HEIGHT,
    bottom: 0,
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
