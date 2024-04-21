import React from 'react'
import { Grid, GridItem, Avatar, AvatarBadge, AvatarGroup,Stat ,StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Card, CardBody} from '@chakra-ui/react'

function Content() {
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
