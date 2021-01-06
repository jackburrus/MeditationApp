import { createTheme } from "@shopify/restyle";

const palette = {
  appBackgroundColor: "#F6F6F6",
  black: "#0B0B0B",
  darkBlue: "#172A3F",
  lightBlue: "#79B3C2",
  mostlyGrey: "#D3D1D0",
  oceanBlue: "#3276D7",
  offWhite: "#D3D1D0",
  wakingUpDarkBlue: "#17202B",
  wakingUpGrey: "#37363B",
  wakingUpLightGrey: "#74787E",
  white: "#F0F2F3",
};

const theme = createTheme({
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  colors: {
    allWhite: palette.white,
    darkBlue: palette.darkBlue,
    lightBlue: palette.lightBlue,
    mainAccent: palette.white,
    mainBackground: palette.appBackgroundColor,
    mostlyGrey: palette.mostlyGrey,
    oceanBlue: palette.oceanBlue,
    offWhite: palette.offWhite,
    primary: palette.appBackgroundColor,
    secondary: palette.offWhite,
    secondaryLight: palette.wakingUpLightGrey,
    textPrimary: palette.darkBlue,
    wakingUpBlue: palette.wakingUpDarkBlue,
    wakingUpLightGrey: palette.wakingUpLightGrey,
  },
  spacing: {
    l: 24,
    m: 16,
    s: 8,
    xl: 40,
  },
  textVariants: {
    blueHeader: {
      color: "darkBlue",
      fontFamily: "Martel_800ExtraBold",
      fontSize: 12,
    },
    greySubheader: {
      color: "mostlyGrey",
      fontFamily: "Martel_800ExtraBold",
      fontSize: 8,
    },
    header: {
      color: "mostlyGrey",
      fontFamily: "Martel_700Bold",
      fontSize: 26,
      fontWeight: "bold",
      lineHeight: 42.5,
    },
    homeScreenHeader: {
      color: "darkBlue",
      fontFamily: "Martel_700Bold",
      fontSize: 12,
    },
    meditationHeader: {
      color: "darkBlue",
      fontFamily: "Martel_800ExtraBold",
      fontSize: 24,
    },
    link: {
      color: "oceanBlue",
      fontWeight: "bold",
    },
    MenuHeader: {
      color: "wakingUpBlue",
      fontFamily: "Lato_400Regular",
      fontSize: 26,
      letterSpacing: 1.5,
    },
    menuItem: {
      color: "wakingUpBlue",
      fontFamily: "Lato_400Regular",
      fontSize: 18,
      letterSpacing: 1.5,
    },
    subheader: {
      color: "offWhite",
      fontFamily: "Martel_400Regular",
      fontSize: 12,
      // lineHeight: 15,
      textAlign: "center",
    },
  },
});

export const dark: Theme = {
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  colors: {
    allWhite: palette.white,
    darkBlue: palette.darkBlue,
    lightBlue: palette.lightBlue,
    mainAccent: palette.white,
    mainBackground: palette.appBackgroundColor,
    mostlyGrey: palette.mostlyGrey,
    oceanBlue: palette.oceanBlue,
    offWhite: palette.offWhite,
    primary: palette.wakingUpDarkBlue,
    secondary: palette.wakingUpGrey,
    secondaryLight: palette.wakingUpLightGrey,
    textPrimary: palette.offWhite,
    wakingUpBlue: palette.wakingUpDarkBlue,
    wakingUpLightGrey: palette.wakingUpLightGrey,
  },
  spacing: {
    l: 24,
    m: 16,
    s: 8,
    xl: 40,
  },
  textVariants: {
    blueHeader: {
      color: "darkBlue",
      fontFamily: "Martel_800ExtraBold",
      fontSize: 12,
    },
    greySubheader: {
      color: "mostlyGrey",
      fontFamily: "Martel_800ExtraBold",
      fontSize: 8,
    },
    header: {
      color: "mostlyGrey",
      fontFamily: "Martel_700Bold",
      fontSize: 26,
      fontWeight: "bold",
      lineHeight: 42.5,
    },
    homeScreenHeader: {
      color: "darkBlue",
      fontFamily: "Martel_700Bold",
      fontSize: 12,
    },
    meditationHeader: {
      color: "darkBlue",
      fontFamily: "Martel_800ExtraBold",
      fontSize: 24,
    },
    link: {
      color: "oceanBlue",
      fontWeight: "bold",
    },
    MenuHeader: {
      color: "offWhite",
      fontFamily: "Lato_400Regular",
      fontSize: 26,
      letterSpacing: 1.5,
    },
    menuItem: {
      color: "offWhite",
      fontFamily: "Lato_400Regular",
      fontSize: 18,
      letterSpacing: 1.5,
    },
    subheader: {
      color: "offWhite",
      fontFamily: "Martel_400Regular",
      fontSize: 12,
      // lineHeight: 15,
      textAlign: "center",
    },
  },
};

export type Theme = typeof theme;
export default theme;
