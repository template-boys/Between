import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import style from "../../themes/style";

export default function FavoritesScreen() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const users = [];

        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ padding: 25 }}>
      <Text style={style.semiBold}>Users</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View
            style={{
              height: 50,
              flex: 1,
            }}
          >
            <Text style={style.regular}>ID- {item?.id}</Text>
            <Text style={style.light}>Name- {item?.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
