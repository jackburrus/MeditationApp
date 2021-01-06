import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "@shopify/restyle";
import Constants from "expo-constants";
import React from "react";

import { device } from "../../constants";
import MenuScreen from "../../screens/MenuScreen";
import { Theme } from "../../theme";

import WakingUpBottomTabNavigator from "./WakingUpTabNavigator";

const WakingUpDrawer = createDrawerNavigator();
const WakingUpDrawerNavigator = () => {
  const theme = useTheme<Theme>();
  const { primary } = theme.colors;
  return (
    <WakingUpDrawer.Navigator
      openByDefault={false}
      drawerContent={() => <MenuScreen />}
      drawerPosition="right"
      drawerStyle={{
        width: device.width / 1.2,
        marginTop: Constants.statusBarHeight,
        backgroundColor: primary,
      }}
    >
      <WakingUpDrawer.Screen
        name="Home"
        component={WakingUpBottomTabNavigator}
      />
    </WakingUpDrawer.Navigator>
  );
};

export default WakingUpDrawerNavigator;
