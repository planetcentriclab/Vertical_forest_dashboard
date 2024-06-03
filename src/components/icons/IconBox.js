import React from "react";
import { Flex, Box } from "@chakra-ui/react";

export default function IconBox(props) {
  const { icon, ...rest } = props;

  return (
    <Box p="4">
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"50%"}
        {...rest}>
        {icon}
      </Flex>
    </Box>
  );
}
