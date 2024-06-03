// Chakra imports
import {
  // Card,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  Card,
  CardBody,
  // Text,
} from "@chakra-ui/react";
// Custom components
// import Card from "./Card.js";
// Custom icons
import React from "react";

export default function Default(props) {
  const { startContent, endContent, name, growth, value, avg, unit } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  return (
    <Card size='sm'>
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
            <StatNumber
            color={textColor}
            fontSize={{
              base: "4xl",
            }}>
            {value}{unit}
            </StatNumber>
            
            <Flex align='center'>
              <StatHelpText fontSize='md'>
                <StatArrow type={avg >= value ? 'increase' : 'decrease'} />
                {growth}{unit} Since last week.
              </StatHelpText>
            </Flex>
          </Stat>
        </CardBody>
          <Flex ms='auto' w='max-content'>
            {endContent}
          </Flex>
      </Flex>
    </Card>
  );
}
