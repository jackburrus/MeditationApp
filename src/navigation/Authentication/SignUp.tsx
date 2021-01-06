import { Auth } from "aws-amplify";
import React, { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { device } from "../../constants";
import { AuthContext } from "../../stores/AuthContext";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { user, setUser } = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      if (username && password && email) {
        const { userInfo } = await Auth.signUp({
          username,
          password,
          attributes: { email },
        });

        props.onStateChange("confirmSignUp", { username, name });
      } else {
        alert("Please fill in all the fields");
      }
    } catch (error) {
      console.log("error signing up:", error.message);
      alert(error.message);
    }
  };

  if (props.authState === "signUp") {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
          style={styles.imageContainer}
          onPress={Keyboard.dismiss}
        >
          <Image
            style={{ width: device.width / 2, height: 100 }}
            source={require("../../../assets/App_store_1024_1x.png")}
          />
        </TouchableWithoutFeedback>

        <KeyboardAwareScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          style={styles.infoContainer}
        >
          <View>
            <TextInput
              value={name}
              autoCapitalize="none"
              style={styles.input}
              placeholder={"Name"}
              placeholderTextColor={"#939393"}
              onChange={(e) => setName(e.nativeEvent.text)}
            />
            <TextInput
              value={username}
              autoCapitalize="none"
              style={styles.input}
              placeholder={"Username"}
              placeholderTextColor={"#939393"}
              onChange={(e) => setUsername(e.nativeEvent.text)}
            />
            <TextInput
              value={password}
              autoCapitalize="none"
              secureTextEntry={true}
              style={styles.input}
              placeholder={"Password"}
              placeholderTextColor={"#939393"}
              onChange={(e) => setPassword(e.nativeEvent.text)}
            />
            <TextInput
              value={email}
              autoCapitalize="none"
              style={styles.input}
              placeholder={"Email"}
              placeholderTextColor={"#939393"}
              onChange={(e) => setEmail(e.nativeEvent.text)}
            />

            <TouchableOpacity onPress={(e) => handleSignup()}>
              <View style={styles.login}>
                <Text style={styles.loginText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => props.onStateChange("signIn")}>
            <View style={styles.footerText}>
              <Text style={{ color: "#D3D1D0", opacity: 0.3 }}>
                Already have an account?{" "}
              </Text>
              <Text style={styles.signIn}>Sign In.</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return <></>;
  }
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 50,
    marginTop: 50,
  },
  userIcon: {
    color: "#343434",
    alignSelf: "flex-end",
  },
  infoContainer: {
    flex: 0.6,

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
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",

    maxHeight: 40,
  },
  footerText: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    color: "#D3D1D0",
    opacity: 0.3,
  },
  signIn: {
    fontWeight: "bold",
    color: "#D3D1D0",
    opacity: 0.3,
  },
});
