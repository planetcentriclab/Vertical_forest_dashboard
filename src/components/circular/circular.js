// Chakra imports
import {
    // Card,
    Flex,
    Stat,
    StatLabel,
    // useColorModeValue,
    Card,
    CardBody,
    CircularProgress,
    CircularProgressLabel,
    // Text,
  } from "@chakra-ui/react";
  
  // Custom icons
  import React from "react";
  
  export default function Default(props) {
    const { startContent, name, value, unit } = props;
    // const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "secondaryGray.600";
  
    return (
      <Card size ='sm'>
        <Flex
          my='auto'
          h='100%'
          align={{ base: "center", xl: "start" }}
          justify={{ base: "center", xl: "center" }}>
          {startContent}
          <CardBody>
            <Stat my='auto' ms={startContent ? "18px" : "0px"}>
              <StatLabel
              lineHeight='100%'
              color={textColorSecondary}
              fontSize={{
                base: "lg",
              }}>
                {name}
              </StatLabel>
                <Flex justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress value={value} max={65535} size='100px' thickness='12px'>
                        <CircularProgressLabel>{value}{unit}</CircularProgressLabel>
                    </CircularProgress>
                </Flex>
            </Stat>
          </CardBody>
        </Flex>
      </Card>
    );
  }
  