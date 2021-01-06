import { Auth } from "aws-amplify";
import React, { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { AuthContext } from "../../stores/AuthContext";

const SignIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);

  const login = async () => {
    try {
      if (username && password) {
        const user = await Auth.signIn(username, password);
        setUser(user);
      } else {
        alert("Please fill in all the fields");
      }
    } catch (error) {
      console.log("error signing in", error.message);
      alert(error.message);
    }
  };

  if (props.authState === "signIn") {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../../assets/App_store_1024_1x.png")}
            style={{ width: 120, height: 120, marginLeft: 5, marginTop: 30 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Text
              style={{
                fontSize: 48,
                color: "#F6F6F6",
                fontWeight: "bold",
                marginLeft: 40,
              }}
            >
              Welcome
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#F6F6F6",
                fontWeight: "bold",
                marginLeft: 40,
              }}
            >
              Sign in to Continue
            </Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.infoContainer}>
          <TextInput
            value={username}
            style={styles.input}
            autoCapitalize="none"
            placeholder={"Username"}
            placeholderTextColor={"#D3D1D0"}
            onChange={(e) => setUsername(e.nativeEvent.text)}
          />
          <TextInput
            value={password}
            secureTextEntry={true}
            style={styles.input}
            placeholder={"Password"}
            placeholderTextColor={"#D3D1D0"}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={(e) => login()}>
            <View style={styles.login}>
              <Text style={styles.loginText}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.onStateChange("forgotPassword")}
          >
            <Text style={{ color: "#D3D1D0" }}>Forgot password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => props.onStateChange("signUp")}>
            <View style={styles.footerText}>
              <Text style={{ color: "#D3D1D0", opacity: 0.3 }}>
                Don't have an account?{" "}
              </Text>
              <Text style={styles.signup}>Sign up.</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return <></>;
  }
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#17202B",
  },
  imageContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 300,
    width: 300,
  },
  clone: {
    marginTop: -70,
    marginBottom: -50,
    fontSize: 30,
    alignSelf: "center",
  },
  infoContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
  },
  input: {
    margin: 10,
    borderWidth: 1,
    marginLeft: 20,
    width: 280,
    borderRadius: 5,
    borderColor: "lightgray",
    textAlign: "left",
    height: 60,
    paddingLeft: 20,
    color: "#D3D1D0",
  },
  login: {
    margin: 10,
    borderWidth: 1,
    marginLeft: 20,
    width: 280,
    borderRadius: 5,
    height: 60,
    backgroundColor: "#79B3C2",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "white",
    fontSize: 18,
  },
  footer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,

    maxHeight: 40,
  },
  footerText: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    color: "#D3D1D0",
    opacity: 0.3,
  },
  signup: {
    fontWeight: "bold",
    color: "#D3D1D0",
    opacity: 0.3,
  },
});
