import "react-native-gesture-handler";
import * as React from "react";
import {
  Text,
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../components/Logo.svg";
import GoogleLogo from "../../components/GoogleLogo.svg";
import FacebookLogo from "../../components/FacebookLogo.svg";
import FirebaseAuth from "@react-native-firebase/auth";
import { StyleSheet } from "react-native";
import style from "../../themes/style";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONTAINER_WIDTH = SCREEN_WIDTH - 50;

export function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const inputRef = React.useRef<any | null>(null);

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <View style={styles.container}>
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                style.regular,
                {
                  textAlign: "center",
                },
              ]}
            >
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity>
              <Text style={[style.medium]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <Input
            placeholder="Email Address"
            onChangeText={(value) => {
              setError("");
              setEmail(value);
            }}
            containerStyle={{ marginTop: 30, marginBottom: 0 }}
            email
            errorMessage={!!error ? " " : undefined}
            onSubmitEditing={() => {
              if (!!email && !password) {
                inputRef?.current?.focus();
              }
              !!email &&
                !!password &&
                !error &&
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
          />
          <Input
            placeholder="Password"
            onChangeText={(value) => {
              setError("");
              setPassword(value);
            }}
            secureTextEntry
            errorMessage={error}
            onSubmitEditing={() => {
              !!email &&
                !!password &&
                !error &&
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
            inputRef={inputRef}
          />
        </View>

        {/* Login Container */}
        <View style={styles.loginContainer}>
          <Button
            type="primary"
            title="Log In"
            disabled={!email || !password || error !== ""}
            onPress={() => {
              Keyboard.dismiss();
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
          <TouchableOpacity>
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
          </TouchableOpacity>
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
            <TouchableOpacity style={styles.thirdPartyLoginSquare}>
              <GoogleLogo height={21} width={21} />
              <Text style={[style.regular, styles.thirdPartyLoginText]}>
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.thirdPartyLoginSquare}>
              <FacebookLogo height={21} width={21} />
              <Text style={[style.regular, styles.thirdPartyLoginText]}>
                Facebook
              </Text>
            </TouchableOpacity>
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
    paddingTop: 20,
    // backgroundColor: "violet",
  },
  formContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: CONTAINER_WIDTH,
    flex: 2,
    paddingTop: 20,
    paddingBottom: 20,
    // backgroundColor: "skyblue",
    zIndex: 100,
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // backgroundColor: "aqua",
  },
  thirdPartyContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    // backgroundColor: "blue",
    paddingBottom: 10,
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
    borderWidth: 1.5,
    borderColor: "#e3e3e3",
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
    borderColor: "#e3e3e3",
    borderWidth: 1,
    height: 1,
    flex: 1,
    marginLeft: 8,
  },
});
