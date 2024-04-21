import React, {useState, useEffect} from 'react'
import { Grid, GridItem, Avatar, AvatarBadge, AvatarGroup,Stat ,StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Card, CardBody} from '@chakra-ui/react'
import axios from 'axios'

function Content() {
    const [Light, setLight] = useState([]);
    const [Temperature, setTemperature] = useState([]);
    const [Humidity, setHumidity] = useState([]);
    const [SoilTemperature, setSoilTemperature] = useState([]);
    const [SoilMoisture, setSoilMoisture] = useState([]);
    const [SoilPH, setSoilPH] = useState([]);
    const [WaterFlow, setWaterFlow] = useState([]);
    const [VoltageFlow, setVoltageFlow] = useState([]);
    const [CurrentFlow, setCurrentFlow] = useState([]);

  useEffect(()=> {
    axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/verticalForest/lightIntensity')
    .then(res => setLight(res.data))
    .catch(err => console.log(err));
  },[])

  useEffect(()=> {
    axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/verticalForest/temperature')
    .then(res => setTemperature(res.data))
    .catch(err => console.log(err));
  },[])

  useEffect(()=> {
    axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/verticalForest/humidity')
    .then(res => setHumidity(res.data))
    .catch(err => console.log(err));
  },[])

  useEffect(()=> {
    axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/verticalForest/soilTemperature')
    .then(res => setSoilTemperature(res.data))
    .catch(err => console.log(err));
  },[])

  useEffect(()=> {
    axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/verticalForest/soilMoisture')
    .then(res => setSoilMoisture(res.data))
    .catch(err => console.log(err));
  },[])

  useEffect(()=> {
    axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/verticalForest/soilPH')
    .then(res => setSoilPH(res.data))
    .catch(err => console.log(err));
  },[])

  useEffect(()=> {
    axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/verticalForest/waterFlow')
    .then(res => setWaterFlow(res.data))
    .catch(err => console.log(err));
  },[])

  useEffect(()=> {
    axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/verticalForest/voltageFlow')
    .then(res => setVoltageFlow(res.data))
    .catch(err => console.log(err));
  },[])

  useEffect(()=> {
    axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/verticalForest/currentFlow')
    .then(res => setCurrentFlow(res.data))
    .catch(err => console.log(err));
  },[])


//   console.log(Light);
  const readLight = Light[Light.length - 1] ;
  const readTemperature = Temperature[Temperature.length - 1] ;
  const readHumidity = Humidity[Humidity.length - 1] ;
  const readSoilTemperature = SoilTemperature[SoilTemperature.length - 1] ;
  const readSoilMoisture = SoilMoisture[SoilMoisture.length - 1] ;
  const readSoilPH = SoilPH[SoilPH.length - 1] ;
  const readWaterFlow = WaterFlow[WaterFlow.length - 1] ;
  const readVoltageFlow = VoltageFlow[VoltageFlow.length - 1] ;
  const readCurrentFlow = CurrentFlow[CurrentFlow.length - 1] ;

//   console.log("Light",readLight);
//   console.log("Temperature",readTemperature);

  return (
    <main>
        <Grid templateColumns='repeat(4, 1fr)' gap={5}>
            <Card>
            <CardBody>
                <Stat>
                    <StatLabel fontSize= 'lg'color= 'gray.600'>Temperature</StatLabel>
                    <StatNumber fontSize= '5xl'>40.21°C</StatNumber>
                    <StatHelpText fontSize= 'md'>
                    <StatArrow type='decrease' />
                    1.23°C
                    Since last week.
                    </StatHelpText>
                </Stat>
            </CardBody>
            </Card>
            <Card>
            <CardBody>
                <Stat>
                    <StatLabel fontSize= 'lg'color= 'gray.600'>Humidity</StatLabel>
                    <StatNumber fontSize= '5xl'>60.55%</StatNumber>
                    <StatHelpText fontSize= 'md'>
                    <StatArrow type='increase' />
                    23.36%
                    Since last week.
                    </StatHelpText>
                </Stat>
            </CardBody>
            </Card>
            <Card>
            <CardBody>
                <Stat>
                    <StatLabel fontSize= 'lg'color= 'gray.600'>Soil Temperature</StatLabel>
                    <StatNumber fontSize= '5xl'>28.38°C</StatNumber>
                    <StatHelpText fontSize= 'md'>
                    <StatArrow type='increase' />
                    3.84°C
                    Since last week.
                    </StatHelpText>
                </Stat>
            </CardBody>
            </Card>
            <Card>
            <CardBody>
                <Stat>
                    <StatLabel fontSize= 'lg'color= 'gray.600'>Soil Humidity</StatLabel>
                    <StatNumber fontSize= '5xl'>76.57%</StatNumber>
                    <StatHelpText fontSize= 'md'>
                    <StatArrow type='increase' />
                    1.23%
                    Since last week.
                    </StatHelpText>
                </Stat>
            </CardBody>
            </Card>
        </Grid>
    </main>
    
  )
}

export default Content
