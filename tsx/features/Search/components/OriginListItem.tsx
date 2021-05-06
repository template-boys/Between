import React, { ReactElement } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import style from "../../../themes/style";
import theme from "../../../themes/theme";
import { getHeader, getSubText } from "../../../utils/originUtil";
import { TomTomOriginResult } from "../redux/searchReducerTypes";

interface OriginListItemProps extends TouchableOpacityProps {
  origin: TomTomOriginResult;
}

export default function OriginListItem({
  origin,
  ...props
}: OriginListItemProps): ReactElement {
  return (
    <View style={styles.container}>
      <View style={styles.originContainer}>
        <Icon
          name={"location-sharp"}
          size={30}
          color={theme.secondary}
          style={{ alignSelf: "flex-start" }}
        />
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={[style.medium, styles.header]} numberOfLines={2}>
            {getHeader(origin)}
          </Text>
          <Text style={[style.light, styles.subHeader]} numberOfLines={2}>
            {getSubText(origin)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 1,
    backgroundColor: "white",
    borderRadius: 20,
    width: 300,
    justifyContent: "center",
    padding: 15,
  },
  originContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: { color: theme.darkestGrey, fontSize: 15, marginBottom: 6 },
  subHeader: { fontSize: 13 },
});
