import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Auth } from "aws-amplify";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import MenuIcon from "../components/MenuItem";
import { AuthContext } from "../stores/AuthContext";
import { ThemeContext } from "../stores/ThemeContext";
import { Box, Text } from "../theme";
import { Theme } from "../theme/Theme";

async function signOut() {
  try {
    const data = await Auth.signOut();
    return data;
  } catch (error) {
    console.log("error signing out: ", error);
    return error;
  }
}

interface MenuProps {}

const Menu = () => {
  const { user } = useContext(AuthContext);
  const { t, setTheme } = useContext(ThemeContext);
  const [switchOn, setIsSwitchOn] = useState(true);
  const theme = useTheme<Theme>();
  const { darkBlue, primary, offWhite, wakingUpBlue } = theme.colors;

  useEffect(() => {
    if (switchOn) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [switchOn]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Box justifyContent="center" alignItems="center" padding="l">
        <Avatar.Image
          size={64}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey",
            marginBottom: 10,
          }}
          source={() => (
            <FontAwesome5 name="user-ninja" size={36} color="black" />
          )}
        />
        <Text color="offWhite">
          {user ? user.attributes.email : "Sign Up!"}
        </Text>
      </Box> */}
      <Box
        flex={0.2}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={"row"}
        paddingLeft={"m"}
      >
        <Text variant={"MenuHeader"}>Main Menu</Text>
        <Box
          flexDirection={"row"}
          alignItems={"center"}
          marginRight={"m"}
          justifyContent={"flex-end"}
        >
          {switchOn ? (
            <Feather
              name="moon"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
          ) : (
            <Feather
              name="sun"
              size={24}
              color="#FBCB2E"
              style={{ marginRight: 10 }}
            />
          )}
          <Switch
            value={switchOn}
            color={darkBlue}
            onValueChange={() => {
              setIsSwitchOn(!switchOn);
            }}
          />
        </Box>
      </Box>
      <Box>
        <MenuIcon
          title={"My Account"}
          icon={
            <MaterialCommunityIcons
              name="account-box"
              size={36}
              color={t === "dark" ? offWhite : wakingUpBlue}
            />
          }
        />
        <MenuIcon
          title={"Stats"}
          icon={
            <Ionicons
              name="md-stats"
              size={36}
              color={t === "dark" ? offWhite : wakingUpBlue}
            />
          }
        />
        <MenuIcon
          title={"Support"}
          icon={
            <SimpleLineIcons
              name="support"
              size={28}
              color={t === "dark" ? offWhite : wakingUpBlue}
            />
          }
        />
      </Box>

      <Box alignItems="center" margin="l" flex={1}>
        <TouchableOpacity onPress={signOut}>
          <Text color="textPrimary">Sign Out</Text>
        </TouchableOpacity>
      </Box>
    </SafeAreaView>
  );
};
export default Menu;
