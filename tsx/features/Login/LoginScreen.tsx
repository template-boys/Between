import "react-native-gesture-handler";
import * as React from "react";
import { Text, SafeAreaView, View, Dimensions } from "react-native";
// import BottomSheet from "reanimated-bottom-sheet";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import theme from "../../themes/theme";
import FirebaseAuth from "@react-native-firebase/auth";
import { StyleSheet } from "react-native";
import style from "../../themes/style";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const sheetRef = React.useRef<any | null>(null);
  const dispatch = useDispatch();

  const renderContent = () => (
    <View
      style={{
        backgroundColor: theme.purple,
        height: SCREEN_HEIGHT,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 150,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          sheetRef.current?.snapTo(0);
        }}
      >
        <Icon name="close" size={50} color={"white"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.bottomAngle]} />
      <View style={styles.whiteOnTopOfAngle} />
      <Text style={[style.title1, { marginTop: 50, color: theme.darkPurple }]}>
        between
      </Text>
      <Input
        placeholder="yourname@example.com"
        onChangeText={(value) => {
          setError("");
          setEmail(value);
        }}
        containerStyle={{ marginTop: 70 }}
        email
      />
      <Input
        placeholder="password"
        onChangeText={(value) => {
          setError("");
          setPassword(value);
        }}
        secureTextEntry
        errorMessage={error}
      />
      <View style={{ marginLeft: "auto" }}>
        <Text style={{ marginRight: 18 }}>Forgot Password?</Text>
      </View>
      <Button
        type="primary"
        title="Log In"
        disabled={!email || !password || error !== ""}
        onPress={() => {
          FirebaseAuth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
              console.log("Logged in.");
            })
            .catch((error) => {
              if (
                error.code === "auth/invalid-email" ||
                error.code === "auth/wrong-password"
              ) {
                console.log("Invalid username or password");
                setError("Invalid username or password");
              }
            });
        }}
        buttonStyle={{ width: 180, marginTop: 80 }}
      />
      <Button
        type="secondary"
        title="Sign Up"
        buttonStyle={{ width: 180, marginTop: 30 }}
        onPress={
          () => sheetRef.current?.open()
          // FirebaseAuth()
          //   .createUserWithEmailAndPassword(email, password)
          //   .then((user) => {
          //     console.log("User account created & signed in!");
          //   })
          //   .catch((error) => {
          //     if (error.code === "auth/email-already-in-use") {
          //       console.log("That email address is already in use!");
          //     }

          //     if (error.code === "auth/invalid-email") {
          //       console.log("That email address is invalid!");
          //     }
          //     console.error(error);
          //   })
        }
      />
      <RBSheet
        ref={sheetRef}
        height={SCREEN_HEIGHT}
        closeOnDragDown={true}
        closeOnPressMask={true}
        showTopBar={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
            height: SCREEN_HEIGHT,
            bottom: 25,
          },
          draggableIcon: {
            backgroundColor: "transparent",
          },
        }}
      >
        <View
          style={{
            backgroundColor: theme.purple,
            height: SCREEN_HEIGHT,
            paddingLeft: 25,
            paddingRight: 25,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              sheetRef.current?.close();
            }}
            style={{ marginTop: 70 }}
          >
            <Icon name="close" size={50} color={"white"} />
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    width: SCREEN_WIDTH,
  },
  bottomAngle: {
    backgroundColor: theme.purple,
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  whiteOnTopOfAngle: {
    borderRadius: SCREEN_WIDTH,
    width: SCREEN_WIDTH * 2,
    height: SCREEN_WIDTH * 2,
    position: "absolute",
    backgroundColor: "white",
    top: -50,
  },
});
