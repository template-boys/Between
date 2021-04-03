import React, { useState } from "react";
import theme from "../themes/theme";
import { tomTomAutoComplete } from "../api/thirdPartyApis";
import Input from "./Input";
import { debounce } from "lodash";
import { FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
    <View style={{ marginBottom: 15 }}>
      <Input
        onChangeText={(q) => getAutoCompleteResults(q)}
        placeholder="Search city, address, or place"
      />
      <FlatList
        data={autoCompleteValues}
        style={{ height: 150 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginLeft: 35,
              marginRight: 15,
              paddingTop: 14,
              borderBottomWidth: 1,
              borderBottomColor: theme.purple,
              paddingBottom: 14,
            }}
            onPress={() => {
              props.setLocation(item);
            }}
          >
            <Text style={{ color: theme.purple }} numberOfLines={1}>
              {item?.address?.freeformAddress}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default AutoCompleteInputField;
