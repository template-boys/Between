import { useNavigation } from "@react-navigation/core";
import React, { ReactElement } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import style from "../../../themes/style";
import theme from "../../../themes/theme";
import { YelpBusiness } from "../redux/searchReducerTypes";
// import betweenIcon from "../../../../assets/static/betweenIcon.png";
const betweenIcon = require("../../../../assets/static/betweenIcon.png");

interface Props {
  destinationItem: YelpBusiness;
}

export default function DestinationListItem({
  destinationItem,
}: Props): ReactElement {
  const navigation = useNavigation();
  const address = `${destinationItem?.location?.display_address[0] ?? ""} ${
    destinationItem?.location?.display_address[1] ?? ""
  }`;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("DestinationDetailsScreen");
      }}
      delayPressIn={50}
      activeOpacity={0.5}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={
            !!destinationItem?.image_url
              ? { uri: destinationItem?.image_url }
              : betweenIcon
          }
          style={styles.image}
        />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={[style.semiBold, { fontSize: 15, color: "white" }]}
            numberOfLines={3}
          >
            {destinationItem.name}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Icon
          name="location-sharp"
          size={18}
          color={theme.darkPurple}
          style={{ paddingRight: 5 }}
        />
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text
            numberOfLines={2}
            style={[
              style.light,
              {
                fontSize: 13,
                color: theme.lightGrey,
              },
            ]}
          >
            {address}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DestinationDetailsScreen");
        }}
        style={{
          flexDirection: "row",
          marginTop: 5,
        }}
      >
        <Text style={[style.medium, { fontSize: 13, marginTop: 2 }]}>
          View more information
        </Text>
        {
          <Icon
            style={{ alignSelf: "center", marginLeft: 5 }}
            name="arrow-forward-circle-outline"
            size={20}
            color={theme.darkPurple}
          />
        }
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: "#e3e3e3",
    justifyContent: "space-between",
    height: 180,
    backgroundColor: theme.darkestGrey,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 13,
    marginRight: 12,
  },
});
