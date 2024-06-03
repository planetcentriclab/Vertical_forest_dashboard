// Chakra imports
import {
    // Card,
    Flex,
    Stat,
    StatLabel,
    useColorModeValue,
    Card,
    CardBody,
    Divider,
    StatNumber,
    // CircularProgress,
    // CircularProgressLabel,
    // Text,
  } from "@chakra-ui/react";
  
  // Custom icons
  import React from "react";
  
  export default function Default(props) {
    const { startContent1 ,startContent2, topic, name1, name2, value1, unit1, value2, unit2 } = props;
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "secondaryGray.600";
  
  return (
    <Card size="sm">
      <Flex
      my='auto'
      h='100%'
      align={{ base: "center", xl: "start" }}
      justify={{ base: "center", xl: "center" }}>
        <CardBody>
          <Stat my="auto">
            <StatLabel
              lineHeight="100%"
              color={textColor}
              fontSize={{ base: "lg" }}
            >
              {topic}
            </StatLabel>
          </Stat>
          <Divider orientation="horizontal" />
          
          <Flex align="start" mt="4px" mb="0px">
            {startContent1}
            <Stat my="auto" ms={startContent1 ? "18px" : "0px"}>
              <StatLabel
                lineHeight="100%"
                color={textColorSecondary}
                fontSize={{ base: "lg" }}
              >
                {name1}
              </StatLabel>
              <Flex align='center'>
                <StatNumber fontSize="4xl">
                  {value1}{unit1}
                </StatNumber>
              </Flex>
            </Stat>
          </Flex>
          
          <Flex align="center" mt="4px" mb="0px">
            {startContent2}
            <Stat my="auto" ms={startContent1 ? "18px" : "0px"}>
              <StatLabel
                lineHeight="100%"
                color={textColorSecondary}
                fontSize={{ base: "lg" }}
              >
                {name2}
              </StatLabel>
              <Flex align='center'>
                <StatNumber fontSize="4xl">
                  {value2}{unit2}
                </StatNumber>
              </Flex>
            </Stat>
          </Flex>
        </CardBody>
      </Flex>
    </Card>
  );
}
  //   return (
  //     <Card size ='sm'>
  //       <CardBody>
  //         <Stat my='auto' >
  //           <StatLabel
  //           lineHeight='100%'
  //           color={textColor}
  //           fontSize={{
  //             base: "lg",
  //           }}>
  //             {topic}
  //           </StatLabel>
  //         </Stat>
  //         <Divider orientation='horizontal' />

          // <Flex
          // my='auto'
          // h='100%'
          // align={{ base: "center", xl: "start" }}
          // justify={{ base: "center", xl: "center" }}>

  //         </Flex>
  //             {startContent1}
  //             <Stat my='auto' ms={startContent1 ? "18px" : "0px"}>
  //               <StatLabel
  //               lineHeight='100%'
  //               color={textColorSecondary}
  //               fontSize={{
  //                 base: "lg",
  //               }}>
  //                 {name1}
  //               </StatLabel>
  //                 <Flex justifyContent="center" alignItems="center" height="100%">
  //                     <StatNumber fontSize='4xl'>{value1}{unit1}</StatNumber>
  //                 </Flex>
  //             </Stat>
  //             {startContent2}
  //             <Stat my='auto' ms={startContent2 ? "18px" : "0px"}>
  //               <StatLabel
  //               lineHeight='100%'
  //               color={textColorSecondary}
  //               fontSize={{
  //                 base: "lg",
  //               }}>
  //                 {name2}
  //               </StatLabel>
  //                 <Flex justifyContent="center" alignItems="center" height="100%">
  //                     <StatNumber fontSize='4xl'>{value2}{unit2}</StatNumber>
  //                 </Flex>
  //             </Stat>
          
  //       </CardBody>
  //     </Card>
  //   );
  // }
