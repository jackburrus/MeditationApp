import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  ImageBackgroundProps,
  TouchableOpacity,
} from "react-native";
import CachedImage from "react-native-expo-cached-image";

import { device } from "../../constants";
import { Box, Text } from "../../theme";
interface MeditationItemProps {
  title: string;
  description: string;
  duration: number;
  imageUri: ImageBackgroundProps["source"];
  awsId: number;
  featured: boolean;
}

const MeditationItem: React.FC<MeditationItemProps> = (props) => {
  const { title, description, imageUri, handlePress } = props;

  return (
    <TouchableOpacity onPress={handlePress}>
      <Box flex={1} width={device.width * 0.33} marginRight={"m"}>
        <ImageBackground
          source={imageUri}
          imageStyle={{ borderRadius: 7 }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 90,
          }}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,.9)"]}
            start={{ x: 0.5, y: 0.1 }}
            style={{
              width: device.width * 0.33,
              height: 90,
              borderRadius: 7,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text variant={"subheader"}>{title}</Text>
          </LinearGradient>
        </ImageBackground>
      </Box>
    </TouchableOpacity>
  );
};
export default MeditationItem;
