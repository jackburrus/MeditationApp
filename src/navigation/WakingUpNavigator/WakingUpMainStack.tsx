import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@shopify/restyle";
import React from "react";
import { TouchableOpacity } from "react-native";

import CategoriesScreen from "../../screens/CategoriesScreen";
import JourneysScreen from "../../screens/JourneysScreen";
import PracticeScreen from "../../screens/PracticeScreen";
import Timer from "../../screens/Timer";
import ViewAll from "../../screens/ViewAll";
import { Theme } from "../../theme/Theme";

const WakingUpMainStack = createStackNavigator();

const WakingUpTimerStackNavigator = (props) => {
  const theme = useTheme<Theme>();
  const { primary, offWhite, textPrimary } = theme.colors;
  return (
    <WakingUpMainStack.Navigator>
      <WakingUpMainStack.Screen
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Ionicons name="ios-menu" size={24} color={textPrimary} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: primary,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          cardStyle: { backgroundColor: "#000" },
          headerTitleStyle: { color: textPrimary },
        })}
        component={Timer}
        name="Timer"
      />
    </WakingUpMainStack.Navigator>
  );
};

const WakingUpTheoryStackNavigator = (props) => {
  const theme = useTheme<Theme>();
  const { primary, offWhite, textPrimary } = theme.colors;
  return (
    <WakingUpMainStack.Navigator>
      <WakingUpMainStack.Screen
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Ionicons name="ios-menu" size={24} color={textPrimary} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: primary,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: { color: textPrimary },
        })}
        component={CategoriesScreen}
        name="Categories"
      />
    </WakingUpMainStack.Navigator>
  );
};

const WakingUpPracticeStackNavigator = (props) => {
  const theme = useTheme<Theme>();
  const { primary, offWhite, textPrimary } = theme.colors;
  return (
    <WakingUpMainStack.Navigator>
      <WakingUpMainStack.Screen
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Ionicons name="ios-menu" size={24} color={textPrimary} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: primary,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: { color: textPrimary },
        })}
        component={PracticeScreen}
        name="Practice"
      />
    </WakingUpMainStack.Navigator>
  );
};

const WakingUpMainStackNavigator = (props) => {
  const theme = useTheme<Theme>();
  const { primary, offWhite, textPrimary } = theme.colors;
  return (
    <WakingUpMainStack.Navigator>
      <WakingUpMainStack.Screen
        name="Home"
        component={JourneysScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Ionicons name="ios-menu" size={24} color={textPrimary} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: primary,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: { color: textPrimary },
        })}
      />
      <WakingUpMainStack.Screen
        name="ViewAll"
        component={ViewAll}
        options={({ navigation }) => ({
          title: "View All",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Ionicons name="ios-menu" size={24} color={textPrimary} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: primary,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: { color: textPrimary },
        })}
      />
    </WakingUpMainStack.Navigator>
  );
};

export {
  WakingUpMainStackNavigator,
  WakingUpTheoryStackNavigator,
  WakingUpPracticeStackNavigator,
  WakingUpTimerStackNavigator,
};
