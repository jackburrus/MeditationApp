import { API, Auth, graphqlOperation } from "aws-amplify";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ConfirmSignUp = (props) => {
  const [code, setCode] = useState("");

  const handleSubmitCode = async () => {
    try {
      await Auth.confirmSignUp(props.authData.username, code).then((res) => {
        addUserToDB();

        alert("Confirmation successful! Please log in");
        setCode("");

        props.onStateChange("signIn");
      });
    } catch (error) {
      console.log("error confirming sign up", error.message);
      alert(error.message);
    }
  };

  const addUserToDB = async () => {
    const userDetails = {
      name: props.authData.name,
      username: props.authData.username,
      image: "",
    };

    try {
      const newUser = await API.graphql(
        graphqlOperation(createUser, { input: userDetails })
      );

      console.log(newUser);
    } catch (err) {
      console.log("Error in adding user to DB:", err.message);
    }
  };

  if (props.authState === "confirmSignUp") {
    return (
      <SafeAreaView stlye={styles.container}>
        <View style={styles.imageContainer}>
          <Text style={styles.confirmText}>Confirm Signup</Text>
        </View>
        <View style={styles.codeContainer}>
          <Text style={{ color: "#D3D1D0" }}>
            Enter code recieved in E-mail
          </Text>
          <TextInput
            value={code}
            style={styles.input}
            placeholder={"Enter code"}
            placeholderTextColor={"#939393"}
            onChange={(e) => setCode(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={(e) => handleSubmitCode()}>
            <View style={styles.submit}>
              <Text style={styles.submitText}>SEND</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => props.onStateChange("signUp")}>
            <View style={styles.footerText}>
              <Text style={{ color: "#D3D1D0", opacity: 0.3 }}>
                Go back to{" "}
              </Text>
              <Text style={styles.signup}>Sign up.</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return <></>;
  }
};

export default ConfirmSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  confirmText: {
    fontSize: 25,
    color: "#D3D1D0",
  },
  imageContainer: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  codeContainer: {
    alignItems: "center",
    justifyContent: "center",
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
  submit: {
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
  submitText: {
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
  },
  signup: {
    fontWeight: "bold",
    color: "#D3D1D0",
    opacity: 0.3,
  },
});
