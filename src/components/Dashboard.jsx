import React from 'react'
import { Box, Grid, GridItem, Card, CardBody, Stat, StatLabel, StatNumber, StatHelpText, Divider, Flex, Image, useColorModeValue, Icon, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import useFetchData from './useFetchData';
import dayjs from 'dayjs';
import VariableChart from './StockChartWithRangeSelector';
import useWeather from './weather';
import { BiSolidMap, BiCalendar ,BiSolidTime} from "react-icons/bi";
import { FaCloud  } from "react-icons/fa";

// Custom components
import MiniStatistics from "./card/MiniStatistics";
// import Circular from "./circular/circular"
import Power from "./power/power"
// import Table from "./tables/table"
import IconBox from "./icons/IconBox";
import {

  MdBarChart,

} from "react-icons/md";

function Dashboard() {
    const { data, averageData } = useFetchData();
    const {weather, date, formattedTime } = useWeather();
    const readLatest = {};

    // Chakra Color Mode
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    Object.keys(data).forEach(key => {
      readLatest[key] = data[key]?.[data[key].length - 1]?.value_con ?? 'Loading...';
    });
  
    const getCurrentPeriod = () => {
      const currentHour = dayjs().hour();
      if (currentHour >= 6 && currentHour < 12) return 'morning';
      if (currentHour >= 12 && currentHour < 18) return 'afternoon';
      if (currentHour >= 18 && currentHour < 24) return 'evening';
      return 'night';
    };
    const currentPeriod = getCurrentPeriod();
  
    return (
      <Box pt={{ base: "10px", md: "10px", xl: "10px" }}>
        <Grid
          h={{ base: "auto", md: "800px" }}
          // templateRows={{ base: 'repeat(3, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)', "2xl": 'repeat(3, 1fr)' }}
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
          gap='20px'
          mb='20px'
        >

          <GridItem colSpan={1}>
            <MiniStatistics
              startContent={
                <IconBox w='56px' h='56px' bg={boxBg} icon={
                    <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
                  } />
              }
              name='Temperature'
              value={readLatest.temperature}
              avg={averageData.temperature[currentPeriod]}
              unit='°C'
              growth={averageData.temperature[currentPeriod] > 0 ? readLatest.temperature - averageData.temperature[currentPeriod] : 0}
            />
          </GridItem>
            
          <GridItem colSpan={1}>
            <MiniStatistics
              startContent={
                <IconBox w='56px'  h='56px' bg={boxBg} icon={
                    <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
                  } />
              }
              name='Humidity'
              value={readLatest.humidity}
              avg={averageData.humidity[currentPeriod]}
              unit='%'
              growth={averageData.humidity[currentPeriod] > 0 ? readLatest.humidity - averageData.humidity[currentPeriod] : 0}
            />
          </GridItem>
            
          <GridItem colSpan={1}>
            <MiniStatistics
            startContent={
              <IconBox w='56px' h='56px' bg={boxBg} icon={
                  <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
                } />
            }
            name='Soil Temperature'
            value={readLatest.soilTemperature}
            avg={averageData.soilTemperature[currentPeriod]}
            unit='°C'
            growth={averageData.soilTemperature[currentPeriod] > 0 ? readLatest.soilTemperature - averageData.soilTemperature[currentPeriod] : 0}
            />
          </GridItem>
          
          <GridItem colSpan={1}>
            <MiniStatistics
              startContent={
                <IconBox w='56px' h='56px' bg={boxBg} icon={
                    <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
                  } />
              }
              name='Soil Moisture'
              value={readLatest.soilMoisture}
              avg={averageData.soilMoisture[currentPeriod]}
              unit='%'
              growth={averageData.soilMoisture[currentPeriod] > 0 ? readLatest.soilMoisture - averageData.soilMoisture[currentPeriod] : 0}
            />
          </GridItem>

          {/* <GridItem rowSpan={{ base: 1, md: 1, lg: 1 }} colSpan={{ base: 1, md: 1, lg: 2 }}> */}
            {/* <Grid 
              templateRows={{ base: 'repeat(2, 0fr)', md: 'repeat(1, 0fr)', lg: 'repeat(1, 0fr)', "2xl": 'repeat(2, 0fr)' }}
              templateColumns={{ base: 'repeat(1, 0fr)', md: 'repeat(1, 0fr)', lg: 'repeat(2, 0fr)', "3xl": 'repeat(1, 0fr)' }}
              gap="18px"> */}
            <Grid templateRows='repeat(2, 0fr)' gap="18px">
              <GridItem rowSpan={1} colSpan={1}>
                <MiniStatistics
                  startContent={
                    <Flex justifyContent="center" alignItems="center" height="100%">
                      <CircularProgress value={readLatest.light} max={65535} size='100px' thickness='12px'>
                        <CircularProgressLabel>{readLatest.light}lx</CircularProgressLabel>
                      </CircularProgress>
                    </Flex>
                  }
                  name='Light Meter'
                  value={readLatest.light}
                  avg={averageData.light[currentPeriod]}
                  unit='lx'
                  growth={averageData.light[currentPeriod] > 0 ? readLatest.light - averageData.light[currentPeriod] : 0}
                />
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Power
                  topic='Power'
                  startContent1={
                    <IconBox w='56px' h='56px' bg={boxBg} icon={<Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />} />
                  }
                  name1='Voltage'
                  value1={readLatest.voltageFlow}
                  unit1='V'
                  startContent2={
                    <IconBox w='56px' h='56px' bg={boxBg} icon={<Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />} />
                  }
                  name2='Current'
                  value2={readLatest.currentFlow}
                  unit2='A'
                />
              </GridItem>
            {/* </GridItem> */}
              
            </Grid>
          {/* </GridItem> */}
            


          <GridItem rowSpan={1} colSpan={{ base: 1, md: 2, lg: 3, "2xl": 3 }}>
            <Card size='sm'>
              <CardBody>
              <VariableChart endpoints={["temperature", "humidity", "soilTemperature", "soilMoisture"]} units={["°C", "", "°C", ""]} size = {350} />
              </CardBody>
            </Card>
          </GridItem>
          
          <GridItem rowSpan={1} colSpan={{ base: 1, md: 2, lg: 3, "2xl": 3 }}>
            <Card size='sm'>
              <CardBody>
              <VariableChart endpoints={["waterFlow1", "waterFlow2"]} units={["mL", "mL"]} size = {250}  />
              </CardBody>
            </Card>
          </GridItem>
    
          <GridItem rowSpan={1} colSpan={{ base: 1, md: 1, lg: 1, "2xl": 1 }}>
            <Card size='sm' style={{ background: '#7CA7E1', height: '275px'}}>
              <CardBody>
                {weather.loading && <p>Loading weather data...</p>}
                {weather.error && <p>Error fetching weather data.</p>}
                {weather.data.main && (
                  <>
                    <div className="cloud-icon" style={{ position: 'absolute', bottom: '20px', left: '100px', fontSize: '48px', color: '#fff', opacity: 0.5 }}>
                      <FaCloud />
                    </div>
                    <div className="cloud-icon" style={{ position: 'absolute', top: '45px', right: '20px', fontSize: '48px', color: '#fff', opacity: 0.5 }}>
                      <FaCloud />
                    </div>
                    <div className="cloud-icon" style={{ position: 'absolute', top: '25px', left: '40px', fontSize: '48px', color: '#fff', opacity: 0.5 }}>
                      <FaCloud />
                    </div>
                    <Stat>
                      <StatLabel fontSize='lg' color='gray.600'>Weather</StatLabel>
                      <Divider orientation='horizontal' />
  
                      <Flex justifyContent="center" alignItems="center" align="center">
                        <Image
                          src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                          alt={weather.data.weather[0].description}
                        />
                        <StatNumber fontSize='5xl' >{parseInt(weather.data.main.temp)} °C</StatNumber>
                      </Flex>
                      <Flex justifyContent="center" alignItems="center" align="center">
                        <StatHelpText fontSize='md'>{weather.data.weather[0].description}</StatHelpText>
                      </Flex>
                      <Flex justifyContent="center" alignItems="center" align="center">
                        <StatNumber fontSize='md'>Wind: {weather.data.wind.speed}m/s, Humidity: {weather.data.main.humidity}%</StatNumber>
                      </Flex>
                      <Flex justifyContent="center" alignItems="center" align="center">
                        <BiSolidTime style={{ marginRight: '4px' }}/>
                        <StatNumber fontSize='md'>{formattedTime } ,</StatNumber>
                        <BiCalendar style={{ marginRight: '4px' }} />
                        <StatNumber fontSize='md'>{date}</StatNumber>
                      </Flex>
                      <Flex justifyContent="center" alignItems="center" align="center">
                        <BiSolidMap style={{ marginRight: '4px' }} />
                        <StatNumber fontSize='md'>{weather.data.name}, {weather.data.sys.country}</StatNumber>
                      </Flex>
                    </Stat>
                  </>
                )}
              </CardBody>
            </Card>
          </GridItem>

          <GridItem rowSpan={1} colSpan={{ base: 1, md: 2, lg: 4, "2xl": 4 }}>
            <Card size='sm'>
              <CardBody>
              <VariableChart endpoints={["lightIntensity", "temperature", "humidity", "soilTemperature", "soilMoisture", "soilPH", "waterFlow1", "waterFlow2", "voltageFlow", "currentFlow"]} units={["lx","°C", "", "°C", "","ph","ml","ml","V","A"]} size = {350} />
              </CardBody>
            </Card>
          </GridItem>
          {/* <GridItem rowSpan={1} colSpan={{ base: 1, md: 2, lg: 4, "2xl": 4 }}>
            <Card size='sm'>
             <Table/>
            </Card>
          </GridItem> */}

        </Grid>
      </Box>
    )
  } 

export default Dashboard
