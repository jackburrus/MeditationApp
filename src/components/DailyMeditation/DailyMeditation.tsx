import { useTheme } from "@shopify/restyle";
import React from "react";
import { GestureResponderEvent, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { device } from "../../constants";
import { Box, Text } from "../../theme";
import { Theme } from "../../theme/Theme";

interface DailyMeditationProps {
  title: string;
  date: string;
  played: boolean;
  handlePress: (event: GestureResponderEvent) => void;
}

const DailyMeditation = (props: DailyMeditationProps) => {
  const { title, date, handlePress } = props;
  const theme = useTheme<Theme>();

  return (
    <TouchableOpacity onPress={handlePress}>
      <Box
        justifyContent={"center"}
        alignItems={"flex-start"}
        flexDirection={"row"}
        borderRadius={8}
        paddingLeft={"m"}
        width={device.width - theme.spacing.xl}
        marginRight={"l"}
        marginLeft={"l"}
        marginTop="m"
        height={90}
        backgroundColor={"lightBlue"}
      >
        <Box
          justifyContent={"center"}
          alignItems={"flex-start"}
          height={90}
          flex={1}
        >
          <Text variant={"header"}>{title}</Text>
          <Box flexDirection={"row"} alignItems={"center"}>
            <Text paddingLeft={"l"} variant={"subheader"}>
              {date}
            </Text>
          </Box>
        </Box>

        <Box
          height={90}
          marginRight={"m"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            source={require("../../../assets/MeditationIcon.png")}
            style={{ width: 50, height: 50 }}
            resizeMode={"contain"}
          />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
export default DailyMeditation;
