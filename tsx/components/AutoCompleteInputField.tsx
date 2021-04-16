import React, { useState } from "react";
import theme from "../themes/theme";
import { tomTomAutoComplete } from "../api/thirdPartyApis";
import Input from "./Input";
import { debounce } from "lodash";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
interface Props {
  setLocation: (any) => void;
}

function AutoCompleteInputField(props: Props) {
  const [autoCompleteValues, setAutoCompleteValues] = useState([]);

  const getAutoCompleteResults = debounce(async (query) => {
    if (query.length === 0) {
      setAutoCompleteValues([]);
      return;
    }
    const result = await tomTomAutoComplete(query);
    setAutoCompleteValues(result?.data?.results ?? []);
  }, 1000);

  return (
    <View style={styles.container}>
      <Input
        onChangeText={(q) => getAutoCompleteResults(q)}
        placeholder="Search city, address, or place"
        inputContainerStyle={{ borderRadius: 35, backgroundColor: "white" }}
        isMapSearch
      />
      <FlatList
        data={autoCompleteValues}
        style={styles.flatListContainer}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              props.setLocation(item);
            }}
          >
            <Text
              style={{ color: theme.purple, fontFamily: "Poppins-Regular" }}
              numberOfLines={1}
            >
              {item?.address?.freeformAddress}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  flatListContainer: {
    position: "absolute",
    //paddingTop: 30,
    //top: 30,
    zIndex: -100,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "white",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: theme.purple,
    padding: 20,
  },
});

export default AutoCompleteInputField;
