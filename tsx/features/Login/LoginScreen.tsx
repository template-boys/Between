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
import AppleLogo from "../../components/AppleLogo.svg";
import FirebaseAuth from "@react-native-firebase/auth";
import { StyleSheet } from "react-native";
import style from "../../themes/style";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { appleAuth } from "@invertase/react-native-apple-authentication";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONTAINER_WIDTH = SCREEN_WIDTH - 50;

const onGoogleButtonPress = async () => {
  try {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.log(error);
  }
};

const onAppleButtonPress = async () => {
  try {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw "Apple Sign-In failed - no identify token returned";
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  } catch (error) {
    console.warn(error);
  }
};

export function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const inputRef = React.useRef<any | null>(null);

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
      >
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
            <TouchableOpacity
              onPress={(e) => {
                Keyboard.dismiss();
              }}
            >
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
            onPress={(e) => {
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
          <TouchableOpacity
            onPress={(ev) => {
              Keyboard.dismiss();
            }}
          >
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
              Sign In with
            </Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.thirdPartyButtonContainer}>
            <TouchableOpacity
              style={styles.thirdPartyLoginSquare}
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  console.log("Signed in with Google!")
                )
              }
            >
              <GoogleLogo height={30} width={30} />
              <Text style={[style.regular, styles.thirdPartyLoginText]}>
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.thirdPartyLoginSquare}
              onPress={() =>
                onAppleButtonPress().then(() =>
                  console.log("Apple sign-in complete!")
                )
              }
            >
              <AppleLogo height={30} width={30} />
              <Text style={[style.regular, styles.thirdPartyLoginText]}>
                Apple
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
