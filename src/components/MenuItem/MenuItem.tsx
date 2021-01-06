import { Auth } from "aws-amplify";
import React, { ReactElement } from "react";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Box, Text } from "../../theme";

interface MenuItemProps {
  icon: ReactElement;
  title: string;
}

const MenuItem = (props: MenuItemProps) => {
  const { icon, title } = props;

  const handlePress = async () => {
    const user = await Auth.currentUserInfo();

    Alert.alert(` Hi ${user.username}. Fill this with your own content.`);
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Box flexDirection={"row"} margin={"s"} alignItems={"center"}>
        <Box flex={1} alignItems={"center"}>
          {icon}
        </Box>
        <Box flex={3}>
          <Text padding={"s"} variant={"menuItem"}>
            {title}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
export default MenuItem;
