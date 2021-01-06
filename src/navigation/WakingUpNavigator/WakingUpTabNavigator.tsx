import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@shopify/restyle";
import React from "react";

import { Theme } from "../../theme";

import {
  WakingUpMainStackNavigator,
  WakingUpPracticeStackNavigator,
  WakingUpTheoryStackNavigator,
  WakingUpTimerStackNavigator,
} from "./WakingUpMainStack";

const WakingUpTabNavigator = createBottomTabNavigator();

const WakingUpBottomTabNavigator = () => {
  const theme = useTheme<Theme>();
  const {
    primary,
    offWhite,
    mostlyGrey,
    white,
    secondary,

    wakingUpLightGrey,
    textPrimary,
  } = theme.colors;

  return (
    <WakingUpTabNavigator.Navigator
      tabBarOptions={{
        style: {
          height: 90,
          backgroundColor: primary,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 1,
          borderTopColor: secondary,
        },
        tabStyle: {
          paddingBottom: 8,
          paddingTop: 8,
        },
        labelPosition: "below-icon",
        activeTintColor: textPrimary,
        inactiveTintColor: wakingUpLightGrey,
      }}
    >
      <WakingUpTabNavigator.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, tintColor }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={24}
              color={focused ? textPrimary : wakingUpLightGrey}
            />
          ),
        }}
        component={WakingUpMainStackNavigator}
      />
      <WakingUpTabNavigator.Screen
        name="Categories"
        options={{
          tabBarIcon: ({ focused, tintColor }) => (
            <Feather
              name="book-open"
              size={24}
              color={focused ? textPrimary : wakingUpLightGrey}
            />
          ),
        }}
        component={WakingUpTheoryStackNavigator}
      />
      <WakingUpTabNavigator.Screen
        name="Practice"
        options={{
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons
              name="ios-flower"
              size={24}
              color={focused ? textPrimary : wakingUpLightGrey}
            />
          ),
        }}
        component={WakingUpPracticeStackNavigator}
      />
      <WakingUpTabNavigator.Screen
        name="Timer"
        options={{
          tabBarIcon: ({ focused, tintColor }) => (
            <Ionicons
              name="ios-timer"
              size={24}
              color={focused ? textPrimary : wakingUpLightGrey}
            />
          ),
        }}
        component={WakingUpTimerStackNavigator}
      />
    </WakingUpTabNavigator.Navigator>
  );
};

export default WakingUpBottomTabNavigator;
