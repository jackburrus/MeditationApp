import React from "react";

import { Box, Text } from "../../theme";

interface GenericErrorProps {}

const GenericError = () => {
  return (
    <Box
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"primary"}
    >
      <Text color={"textPrimary"}>An Error Occurred</Text>
    </Box>
  );
};
export default GenericError;
