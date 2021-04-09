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
import AutoCompleteInputField from "../../components/AutoCompleteInputField";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CONTAINER_WIDTH = SCREEN_WIDTH - 50;

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
    <SafeAreaView style={{ alignItems: "center" }}>
      <View style={styles.container}>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Logo width={60} height={60} />
          <Text
            style={[
              style.semiBold,
              {
                marginTop: 10,
              },
            ]}
          >
            Between
          </Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <Text style={style.bold}>Sign In</Text>
          <Text
            style={[
              style.regular,
              {
                marginTop: 10,
              },
            ]}
          >
            Don't have an account? <Text style={style.medium}>Sign Up</Text>
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
        </View>

        {/* Login Container */}
        <View style={styles.loginContainer}>
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
              width: CONTAINER_WIDTH,
              height: 50,
              borderRadius: 10,
            }}
          />
          <Text
            style={[
              style.regular,
              {
                marginTop: 15,
              },
            ]}
          >
            Forgot your password?{" "}
          </Text>
          <Text
            style={[
              style.medium,
              {
                marginTop: 10,
              },
            ]}
          >
            Reset Now
          </Text>
        </View>

        {/* ThirdParty Container */}
        <View style={styles.thirdPartyContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={[style.regular, styles.dividerText]}>
              Sign Up with
            </Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.thirdPartyButtonContainer}>
            <View style={styles.thirdPartyLoginSquare}>
              <GoogleLogo height={21} width={21} />
              <Text style={[style.regular, styles.thirdPartyLoginText]}>
                Google
              </Text>
            </View>
            <View style={styles.thirdPartyLoginSquare}>
              <FacebookLogo height={21} width={21} />
              <Text style={[style.regular, styles.thirdPartyLoginText]}>
                Facebook
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: CONTAINER_WIDTH,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexShrink: 10,
  },
  formContainer: {
    alignItems: "flex-start",
    width: CONTAINER_WIDTH,
    flex: 1.5,
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexShrink: 10,
  },
  thirdPartyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
  },
  thirdPartyButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: CONTAINER_WIDTH,
    marginTop: 15,
  },
  thirdPartyLoginSquare: {
    padding: 20,
    height: 60,
    minWidth: CONTAINER_WIDTH / 2 - 20,
    borderWidth: 2,
    borderColor: "#ededed",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  thirdPartyLoginText: {
    marginLeft: 10,
    fontSize: 12,
    color: "#132335",
  },
  dividerText: {
    fontSize: 12,
  },
  divider: {
    borderColor: "#ededed",
    borderWidth: 1,
    height: 1,
    flex: 1,
    marginLeft: 8,
  },
});
