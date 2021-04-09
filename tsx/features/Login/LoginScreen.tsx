import "react-native-gesture-handler";
import * as React from "react";
import { Text, SafeAreaView, View, Dimensions, Touchable } from "react-native";
// import BottomSheet from "reanimated-bottom-sheet";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../components/Logo.svg";
import GoogleLogo from "../../components/GoogleLogo.svg";
import FacebookLogo from "../../components/FacebookLogo.svg";
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
      <View style={{ marginTop: 60 }}>
        <Logo width={60} height={60} />
      </View>
      <Text
        style={[
          style.title2,
          {
            fontSize: 20,
            marginTop: 10,
          },
        ]}
      >
        Between
      </Text>
      <Text
        style={[
          style.title1,
          {
            marginLeft: 25,
            fontSize: 25,
            marginTop: 60,
            alignSelf: "flex-start",
          },
        ]}
      >
        Sign In
      </Text>
      <Text
        style={{
          marginLeft: 25,
          fontSize: 15,
          color: "#a8a8a8",
          fontFamily: "Poppins-Regular",
          fontWeight: "400",
          marginTop: 10,
          alignSelf: "flex-start",
        }}
      >
        Don't have an account?{" "}
        <Text style={{ color: theme.darkPurple, fontWeight: "500" }}>
          Sign Up
        </Text>
      </Text>
      <Input
        placeholder="Email Address"
        onChangeText={(value) => {
          setError("");
          setEmail(value);
        }}
        containerStyle={{ marginTop: 30, marginBottom: 0 }}
        email
      />
      <Input
        placeholder="Password"
        onChangeText={(value) => {
          setError("");
          setPassword(value);
        }}
        secureTextEntry
        errorMessage={error}
      />

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
        buttonStyle={{
          marginTop: 40,
          width: Dimensions.get("window").width - 50,
          height: 65,
          borderRadius: 10,
        }}
        containerViewStyle={{
          width: Dimensions.get("window").width,
        }}
      />
      <Text
        style={[
          style.title1,
          {
            fontSize: 15,
            color: "#a8a8a8",
            fontFamily: "Poppins-Regular",
            fontWeight: "400",
            marginTop: 15,
          },
        ]}
      >
        Forgot your password?{" "}
      </Text>
      <Text
        style={[
          style.title1,
          {
            fontSize: 15,
            color: theme.darkPurple,
            fontFamily: "Poppins-Regular",
            fontWeight: "500",
            marginTop: 10,
          },
        ]}
      >
        Reset Now
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 35,
        }}
      >
        <Text
          style={{
            marginLeft: 25,
            fontSize: 12,
            color: "#a8a8a8",
            fontFamily: "Poppins-Regular",
            fontWeight: "400",
            marginTop: 7,
            alignSelf: "flex-start",
          }}
        >
          Sign Up with
        </Text>
        <View
          style={{
            borderColor: "#ededed",
            borderWidth: 1,
            height: 1,
            flex: 1,
            marginLeft: 8,
            marginRight: 25,
            marginTop: 6,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: Dimensions.get("window").width - 50,
          marginTop: 20,
        }}
      >
        <View style={styles.thirdPartyLoginSquare}>
          <GoogleLogo height={21} width={21} />
          <Text style={styles.thirdPartyLoginText}>Google Login</Text>
        </View>
        <View style={styles.thirdPartyLoginSquare}>
          <FacebookLogo height={21} width={21} />
          <Text style={styles.thirdPartyLoginText}>Facebook Login</Text>
        </View>
      </View>
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
  thirdPartyLoginSquare: {
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    height: 60,
    borderWidth: 2,
    borderColor: "#ededed",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  thirdPartyLoginText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    marginLeft: 10,
  },
});
