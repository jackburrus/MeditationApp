import { EvilIcons } from "@expo/vector-icons";
import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Box, Text } from "../../theme";

interface ExpoloreListItemProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
}

const styles = StyleSheet.create({
  image: {
    width: 105,
    justifyContent: "center",
    alignItems: "center",

    flex: 1,
  },
});

const ExpoloreListItem = (props: ExpoloreListItemProps) => {
  const { image, title, description, navigation } = props;

  return (
    <TouchableOpacity onPress={navigation}>
      <Box
        flexDirection="row"
        height={161}
        marginTop="s"
        paddingLeft="m"
        justifyContent="space-between"
      >
        <View style={{ position: "relative" }}>
          <ImageBackground
            source={{ uri: image }}
            style={styles.image}
            imageStyle={{ borderRadius: 11 }}
          >
            <EvilIcons name="play" size={36} color="white" />
          </ImageBackground>
        </View>

        <Box
          flex={1}
          marginTop="l"
          height={112}
          justifyContent="center"
          paddingLeft="l"
          backgroundColor="secondary"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0.5,
            },
            shadowOpacity: 0.1,
            shadowRadius: 1.41,

            elevation: 2,
          }}
        >
          <Text variant="blueHeader" color="offWhite">
            {title}
          </Text>
          <Box width={200}>
            <Text variant="greySubheader" color="offWhite">
              {description}
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
export default ExpoloreListItem;
