import { useTheme } from "@shopify/restyle";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, ImageSourcePropType, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { device } from "../../constants";
import { Box, Text } from "../../theme";
import { Theme } from "../../theme/Theme";

interface FeaturedItemProps {
  title: string;
  description: string;
  image: ImageSourcePropType;
  containerStyle: StyleSheet.Styles;
  imageStyle: StyleSheet.Styles;
  gradientStyle: StyleSheet.Styles;
}

const styles = StyleSheet.create({
  featuredItemContainer: {
    width: device.width,
    height: 206,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});

const FeaturedItem = (props: FeaturedItemProps) => {
  const {
    title,
    description,
    image,
    handlePress,
    containerStyle,
    imageStyle,
    gradientStyle,
  } = props;

  const theme = useTheme<Theme>();

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={[
        styles.featuredItemContainer,
        { width: device.width - theme.spacing.xl },
        containerStyle,
      ]}
    >
      <ImageBackground
        source={image}
        style={[
          styles.image,
          { width: device.width - theme.spacing.xl },
          imageStyle,
        ]}
        imageStyle={{ borderRadius: 8 }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          start={{ x: 0.5, y: 0.09 }}
          style={[
            {
              width: device.width - theme.spacing.xl,
              height: 206,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            },
            gradientStyle,
          ]}
        >
          <Text variant="header">{title}</Text>
          <Box
            marginLeft="l"
            marginRight="l"
            justifyContent="center"
            alignItems="center"
          >
            <Text variant="subheader" paddingTop="s">
              {description}
            </Text>
          </Box>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default FeaturedItem;
