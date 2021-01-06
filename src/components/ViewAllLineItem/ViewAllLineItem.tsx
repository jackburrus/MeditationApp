import React from "react";
import { Image, ImageProps } from "react-native";

import { Box, Text } from "../../theme";

interface ViewAllLineItemProps {
  title: string;
  image: ImageProps["source"];
}

const ViewAllLineItem = (props: ViewAllLineItemProps) => {
  const { title, image } = props;

  return (
    <Box
      borderBottomWidth={1}
      borderBottomColor={"offWhite"}
      flexDirection={"row"}
      justifyContent={"space-around"}
      paddingTop={"l"}
      paddingBottom={"l"}
      marginLeft={"l"}
    >
      <Box flex={1}>
        <Image
          source={{ uri: image }}
          style={{ width: 73, height: 51, borderRadius: 3 }}
        />
      </Box>
      <Box justifyContent={"center"} alignItems={"flex-start"} flex={3}>
        <Text color={"mostlyGrey"}>{title}</Text>
      </Box>
    </Box>
  );
};
export default ViewAllLineItem;
