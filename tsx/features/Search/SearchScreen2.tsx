import React, { ReactElement, useState } from "react";
import { Text, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { useSelector } from "react-redux";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default function SearchScreen2({}: Props): ReactElement {
  const searchResult = useSelector((state) => state.testReducer.searchResult);

  return (
    <View>
      {!!searchResult &&
        searchResult.results.map((item, i) => (
          <View key={i}>
            <Text>{item.name}</Text>
          </View>
        ))}
    </View>
  );
}
