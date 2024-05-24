// Content.jsx file
import React from 'react';
import { Grid, GridItem, Card, CardBody, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Divider , CircularProgress, CircularProgressLabel, Flex, Image } from '@chakra-ui/react';
import useFetchData from './useFetchData';
import dayjs from 'dayjs';
import VariableChart from './StockChartWithRangeSelector';
import useWeather from './weather';
import { BiSolidMap, BiCalendar ,BiSolidTime} from "react-icons/bi";
import { FaCloud  } from "react-icons/fa";

function Content() {
  const { data, averageData } = useFetchData();
  const {weather, date, formattedTime } = useWeather();
  const readLatest = {};
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
    <main>
      <Grid
        h='800px'
        templateRows='repeat(3, 1fr)'
        templateColumns='repeat(4, 1fr)'
        gap={4}
      >
        {/* <GridItem rowSpan={4} colSpan={1} bg='tomato' /> */}
        <GridItem colSpan={1}>
          <Card size='sm'>
            <CardBody>
              <Stat>
                <StatLabel fontSize='lg' color='gray.600'>Temperature</StatLabel>
                <StatNumber fontSize='5xl'>{readLatest.temperature} °C</StatNumber>
                <StatHelpText fontSize='md'>
                  <StatArrow type={averageData.temperature[currentPeriod] >= readLatest.temperature ? 'increase' : 'decrease'} />
                  {averageData.temperature[currentPeriod] > 0 ? readLatest.temperature - averageData.temperature[currentPeriod] : 0}°C Since last week.
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem colSpan={1}>
          <Card size='sm'>
            <CardBody>
              <Stat>
                <StatLabel fontSize='lg' color='gray.600'>Humidity</StatLabel>
                <StatNumber fontSize='5xl'>{readLatest.humidity} %</StatNumber>
                <StatHelpText fontSize='md'>
                  <StatArrow type={averageData.humidity[currentPeriod] >= readLatest.humidity ? 'increase' : 'decrease'} />
                  {averageData.humidity[currentPeriod] > 0 ? readLatest.humidity - averageData.humidity[currentPeriod] : 0}% Since last week.
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem colSpan={1}>
          <Card size='sm'>
            <CardBody>
              <Stat>
                <StatLabel fontSize='lg' color='gray.600'>Soil Temperature</StatLabel>
                <StatNumber fontSize='5xl'>{readLatest.soilTemperature} °C</StatNumber>
                <StatHelpText fontSize='md'>
                  <StatArrow type={averageData.soilTemperature[currentPeriod] >= readLatest.soilTemperature ? 'increase' : 'decrease'} />
                  {averageData.soilTemperature[currentPeriod] > 0 ? readLatest.soilTemperature - averageData.soilTemperature[currentPeriod] : 0}°C Since last week.
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem colSpan={1}>
          <Card size='sm'>
            <CardBody>
              <Stat>
                <StatLabel fontSize='lg' color='gray.600'>Soil Moisture</StatLabel>
                <StatNumber fontSize='5xl'>{readLatest.soilMoisture} %</StatNumber>
                <StatHelpText fontSize='md'>
                  <StatArrow type={averageData.soilMoisture[currentPeriod] >= readLatest.soilMoisture ? 'increase' : 'decrease'} />
                  {averageData.soilMoisture[currentPeriod] > 0 ? readLatest.soilMoisture - averageData.soilMoisture[currentPeriod] : 0}% Since last week.
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <Grid templateRows='repeat(2, 0fr)' gap={2}>
          {/* <GridItem colSpan={1}>
          <Card size='sm'>
           <CardBody>
             <Stat>
               <StatLabel fontSize='lg' color='gray.600'>Light Meter</StatLabel>
               <StatNumber fontSize='5xl'>{readLatest.light} lx</StatNumber>
               <StatHelpText fontSize='md'>
                 <StatArrow type={averageData.light[currentPeriod] >= readLatest.light ? 'increase' : 'decrease'} />
                 {averageData.light[currentPeriod] > 0 ? readLatest.light - averageData.light[currentPeriod] : 0}% Since last week.
               </StatHelpText>
             </Stat>
           </CardBody>
          </Card>
          </GridItem> */}
        <GridItem rowSpanS={1}>
          <Card size='sm'>
            <CardBody>
            <Stat>
            <StatLabel fontSize='lg' color='gray.600'>Light Meter</StatLabel>
            <Flex justifyContent="center" alignItems="center" height="100%">
              <CircularProgress value={readLatest.light} max={65535} size='100px' thickness='12px'>
                <CircularProgressLabel>{readLatest.light} lx</CircularProgressLabel>
              </CircularProgress>
            </Flex>
              {/* <StatHelpText fontSize='md' mt={4}>
                <StatArrow type={averageData.light[currentPeriod] >= readLatest.light ? 'increase' : 'decrease'} />
                {averageData.light[currentPeriod] > 0 ? readLatest.light - averageData.light[currentPeriod] : 0}% Since last week.
              </StatHelpText> */}
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
          <GridItem rowSpanS={1}>
            <Card size='sm'>
            <CardBody>
              <Stat>
                <StatLabel fontSize='lg' color='gray.600'>Power</StatLabel>
                <Divider orientation='horizontal' />
                <StatLabel fontSize='lg' color='gray.600'>Voltage</StatLabel>
                <Flex justifyContent="center" alignItems="center" height="100%">
                  <StatNumber fontSize='5xl'>{readLatest.voltageFlow} V</StatNumber>
                </Flex>
              </Stat>
              <Stat>
                <StatLabel fontSize='lg' color='gray.600'>Current</StatLabel>
                <Flex justifyContent="center" alignItems="center" height="100%">
                  <StatNumber fontSize='5xl'>{readLatest.currentFlow} A</StatNumber>
                </Flex>
              </Stat>
            </CardBody>
          </Card>
          </GridItem>
        </Grid>

        <GridItem rowSpan={2} colSpan={3}>
          <Card size='lg'>
            <CardBody>
            <VariableChart endpoints={["temperature", "humidity", "soilTemperature", "soilMoisture"]} units={["°C", "", "°C", ""]} size = {350} />
            </CardBody>
          </Card>
        </GridItem>
        
        <GridItem rowSpan={1} colSpan={3}>
          <Card size='lg'>
            <CardBody>
            <VariableChart endpoints={["waterFlow1", "waterFlow2"]} units={["mL", "mL"]} size = {250}  />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem colSpan={1}>
          <Card size='lg' style={{ background: '#7CA7E1', height: '305px'}}>
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
                      <StatNumber fontSize='6xl' >{parseInt(weather.data.main.temp)} °C</StatNumber>
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

      </Grid>
    </main>
  );
} 

export default Content;
