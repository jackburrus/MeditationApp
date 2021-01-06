import {
  Spectral_300Light,
  Spectral_600SemiBold,
  Spectral_600SemiBold_Italic,
  useFonts,
} from "@expo-google-fonts/spectral";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { device } from "../../constants";
import { quotes } from "../../constants/dummyData";

interface QuotesProps {}

const Quotes = () => {
  const [loading, setLoading] = useState(true);
  const [quoteNumber, setQuoteNumber] = useState(null);
  const [fontsLoaded] = useFonts({
    Spectral_600SemiBold,
    Spectral_600SemiBold_Italic,
    Spectral_300Light,
  });
  useEffect(() => {
    setQuoteNumber(Math.floor(Math.random() * quotes.length));
    setLoading(false);
  }, []);

  if (loading || !fontsLoaded) {
    return null;
  } else {
    return (
      <View
        style={{
          width: device.width - 100,
          height: 350,

          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            fontFamily: "Spectral_600SemiBold_Italic",
            color: "white",
            fontSize: 30,
            opacity: 0.8,
          }}
        >
          {quotes[quoteNumber].Quote}
        </Text>
        <Text
          style={{
            marginTop: 30,
            color: "white",
            fontFamily: "Spectral_300Light",
            opacity: 0.5,
          }}
        >
          {quotes[quoteNumber].Author}
        </Text>
      </View>
    );
  }
};
export default Quotes;
