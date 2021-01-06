import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";

import { ErrorContext } from "../stores/ErrorContext";

import { ErrorStackNavigator } from "./ErrorNavigator";
import WakingUpDrawerNavigator from "./WakingUpNavigator/WakingUpDrawerNavigator";

const getNavigator = (error) => {
  if (error) {
    return <ErrorStackNavigator />;
  } else {
    return <WakingUpDrawerNavigator />;
  }
};

const RootStackNavigator = () => {
  const { error } = useContext(ErrorContext);

  return <NavigationContainer>{getNavigator(error)}</NavigationContainer>;
};
export default RootStackNavigator;
