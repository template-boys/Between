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
import Button from "../../components/Button";
import Logo from "../../components/Logo.svg";
import GoogleLogo from "../../components/GoogleLogo.svg";
import AppleLogo from "../../components/AppleLogo.svg";
import { StyleSheet } from "react-native";
import style from "../../themes/style";
import CustomInput from "../../components/CustomInput";
import theme from "../../themes/theme";
import { appleLogin, googleLogin, emailLogin } from "./loginUtils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CONTAINER_WIDTH = SCREEN_WIDTH - 50;

export function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>("");

  const passwordInputRef = React.useRef<any | null>(null);

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
          <View style={styles.signUpContainer}>
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
          <CustomInput
            placeholder={"Email Address"}
            autoCompleteType={"email"}
            iconName={"mail-outline"}
            hasError={!!error}
            keyboardType="email-address"
            inputContainerStyle={{ marginTop: 15 }}
            onChangeText={(value) => {
              setError(null);
              setEmail(value);
            }}
            onSubmitEditing={() => {
              if (!!email && !password) {
                passwordInputRef?.current?.focus();
              }
              if (!!email && !!password && !error) {
                emailLogin(email, password, setError);
              }
            }}
          />
          <CustomInput
            inputRef={passwordInputRef}
            placeholder={"Password"}
            autoCompleteType={"password"}
            iconName={"lock-closed-outline"}
            returnKeyType={"go"}
            secureTextEntry={true}
            hasError={!!error}
            inputContainerStyle={{ marginTop: 15 }}
            onChangeText={(value) => {
              setError(null);
              setPassword(value);
            }}
            onSubmitEditing={() => {
              if (!!email && !!password && !error) {
                emailLogin(email, password, setError);
              }
            }}
          />
          <Text style={[style.regular, styles.errorMessage]}>
            {!!error && error}
          </Text>
        </View>

        {/* Login Container */}
        <View style={styles.loginContainer}>
          <Button
            type="primary"
            title="Log In"
            disabled={!email || !password || !!error}
            onPress={() => {
              emailLogin(email, password, setError);
            }}
            buttonStyle={styles.loginButton}
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
          <View style={styles.signInWithContainer}>
            <Text style={[style.regular, styles.dividerText]}>
              Sign In with
            </Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.thirdPartyButtonContainer}>
            <TouchableOpacity
              style={styles.thirdPartyLoginSquare}
              onPress={() => googleLogin()}
            >
              <GoogleLogo height={30} width={30} />
              <Text style={[style.regular, styles.thirdPartyLoginText]}>
                Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.thirdPartyLoginSquare}
              onPress={() => appleLogin()}
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
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 20,
  },
  formContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: CONTAINER_WIDTH,
    flex: 2,
    paddingTop: 20,
    paddingBottom: 20,
    zIndex: 100,
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loginButton: {
    width: CONTAINER_WIDTH,
    height: 50,
    borderRadius: 10,
  },
  thirdPartyContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    paddingBottom: 10,
  },
  signInWithContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  errorMessage: {
    margin: 5,
    color: theme.errorRed,
    fontSize: 11,
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
