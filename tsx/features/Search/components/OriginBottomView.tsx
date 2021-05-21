import React, { ReactElement } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../../rootReducer";
import style from "../../../themes/style";
import theme from "../../../themes/theme";
import { removeOriginLocation, setOriginIndex } from "../redux/searchActions";
import { selectedOrigin } from "../redux/searchSelector";
import BottomView from "./BottomView";

interface Props {}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function DestinationBottomView({}: Props): ReactElement {
  const dispatch = useDispatch();
  const selectedOriginIndex = useSelector(
    (state: State) => state.searchReducer.selectedOriginIndex
  );

  const origin = useSelector((state: State) => selectedOrigin(state));

  return (
    <BottomView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => {
            console.log("PRSSED");

            dispatch(setOriginIndex(-1));
          }}
        >
          <Icon name="close-outline" color={theme.secondary} size={30} />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <Text
            numberOfLines={3}
            style={[
              style.semiBold,
              {
                alignSelf: "center",
                textAlign: "center",
              },
            ]}
          >
            {origin?.poi?.name ?? origin?.address?.freeformAddress ?? ""}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                dispatch(setOriginIndex(-1));
                dispatch(removeOriginLocation(selectedOriginIndex));
              }}
            >
              <Text style={styles.buttonText}>Remove</Text>
              <Icon name="close-outline" color={theme.secondary} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                dispatch(setOriginIndex(-1));
                dispatch(removeOriginLocation(selectedOriginIndex));
              }}
            >
              <Text style={styles.buttonText}>Edit</Text>
              <Icon name="create-outline" color={theme.secondary} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                dispatch(setOriginIndex(-1));
                dispatch(removeOriginLocation(selectedOriginIndex));
              }}
            >
              <Text style={styles.buttonText}>Favorite</Text>
              <Icon name="heart-outline" color={theme.secondary} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH - 25,
    marginVertical: 5,
    borderRadius: 25,
    padding: 10,
    borderColor: theme.lightGrey,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    bottom: 25,
  },
  backIcon: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    zIndex: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 15,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    minWidth: 80,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: "#F2F2F2",
    borderWidth: 2,
    marginHorizontal: 5,
    flexDirection: "row",
    textAlign: "center",
  },
  buttonText: {
    ...style.light,
    marginRight: 4,
  },
});
