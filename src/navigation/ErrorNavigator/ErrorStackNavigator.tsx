import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import GenericError from "../../screens/Errors/GenericError";
import { Theme } from "../../theme/Theme";

const ErrorStack = createStackNavigator();

const ErrorStackNavigator = () => {
  const theme = useTheme<Theme>();
  const { primary, offWhite, textPrimary } = theme.colors;
  return (
    <ErrorStack.Navigator>
      <ErrorStack.Screen
        name="Error"
        component={GenericError}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: primary,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          cardStyle: { backgroundColor: "#000" },
          headerTitleStyle: { color: textPrimary },
        })}
      />
    </ErrorStack.Navigator>
  );
};

export { ErrorStackNavigator };
