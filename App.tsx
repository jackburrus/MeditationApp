import {
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from "@expo-google-fonts/lato";
import {
  Martel_200ExtraLight,
  Martel_300Light,
  Martel_400Regular,
  Martel_600SemiBold,
  Martel_700Bold,
  Martel_800ExtraBold,
  Martel_900Black,
  useFonts,
} from "@expo-google-fonts/martel";
import { ThemeProvider } from "@shopify/restyle";
import Amplify from "aws-amplify";
import { AmplifyTheme, withAuthenticator } from "aws-amplify-react-native";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { LogBox } from "react-native";

import config from "./aws-exports";
import useCachedResources from "./src/hooks/useCachedResources";
import RootStackNavigator from "./src/navigation";
import ConfirmSignUp from "./src/navigation/Authentication/ConfirmSignup";
import ForgotPassword from "./src/navigation/Authentication/ForgotPassword";
import SignIn from "./src/navigation/Authentication/SignIn";
import SignUp from "./src/navigation/Authentication/SignUp";
import { AuthContextProvider } from "./src/stores/AuthContext";
import { DataContextProvider } from "./src/stores/DataContext";
import { ErrorContextProvider } from "./src/stores/ErrorContext";
import { FavoritesContextProvider } from "./src/stores/FavoritesContext";
import { ThemeContext, ThemeContextProvider } from "./src/stores/ThemeContext";
import { dark, theme } from "./src/theme";

LogBox.ignoreLogs([
  "Possible Unhandled Promise Rejection",
  "Native splash screen",
]);

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

function App() {
  const isLoadingComplete = useCachedResources();

  SplashScreen.preventAutoHideAsync()
    .then((result) =>
      console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
    )
    .catch(console.warn);

  const { t } = useContext(ThemeContext);
  const [darkTheme, setDarkTheme] = useState(true);

  const [fontsLoaded] = useFonts({
    Martel_400Regular,
    Martel_700Bold,
    Martel_800ExtraBold,
    Lato_400Regular,
  });

  useEffect(() => {
    if (!t) {
      setDarkTheme(true);
    } else {
      switch (t) {
        case "light":
          setDarkTheme(false);
          break;
        case "dark":
          setDarkTheme(true);
          break;
        default:
          setDarkTheme(true);
      }
    }
  }, [t]);

  return !isLoadingComplete || !fontsLoaded ? (
    <AppLoading />
  ) : (
    <ThemeProvider theme={darkTheme ? dark : theme}>
      <RootStackNavigator />
      <StatusBar style={t === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

const Root = () => {
  return (
    <ErrorContextProvider>
      <AuthContextProvider>
        <FavoritesContextProvider>
          <DataContextProvider>
            <ThemeContextProvider>
              <App />
            </ThemeContextProvider>
          </DataContextProvider>
        </FavoritesContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  );
};

// SafeAreaViewAdded to withAuthenticator.
// See https://github.com/aws-amplify/amplify-js/issues/2951
const CustomAmplifyAuthTheme = Object.assign({}, AmplifyTheme, {
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: -20,
    width: "100%",
    backgroundColor: "#17202B",
  },
});

export default withAuthenticator(
  Root,
  false,
  [<SignIn />, <SignUp />, <ForgotPassword />, <ConfirmSignUp />],
  null,
  CustomAmplifyAuthTheme
);
