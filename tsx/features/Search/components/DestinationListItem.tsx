import { useNavigation } from "@react-navigation/core";
import React, { ReactElement } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import style from "../../../themes/style";
import theme from "../../../themes/theme";

interface Props {
  destinationItem: any;
}

export default function DestinationListItem({
  destinationItem,
}: Props): ReactElement {
  const navigation = useNavigation();
  const address = `${destinationItem?.location?.display_address[0]} ${destinationItem?.location?.display_address[1]}`;
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
        {!!destinationItem?.image_url && (
          <Image
            source={{ uri: destinationItem?.image_url }}
            style={styles.image}
          />
        )}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text style={[style.semiBold, { fontSize: 15 }]} numberOfLines={3}>
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
          name="location-outline"
          size={18}
          color={theme.secondary}
          style={{ paddingRight: 5 }}
        />
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text
            numberOfLines={2}
            style={[
              style.light,
              {
                fontSize: 13,
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
        style={{ flexDirection: "row", marginTop: 5 }}
      >
        <Text style={[style.medium, { fontSize: 13 }]}>
          View more information
        </Text>
        {
          <Icon
            style={{ alignSelf: "center", marginLeft: 5 }}
            name="return-up-forward-outline"
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
    borderWidth: 1,
    borderColor: "#e3e3e3",
    justifyContent: "space-between",
    height: 180,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 13,
    marginRight: 12,
  },
});
