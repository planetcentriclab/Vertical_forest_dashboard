import React from 'react'
import {AvatarGroup, Avatar, HStack, VStack, Image, Text, Spacer, Heading, Icon} from '@chakra-ui/react'
import { BellIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

function Header() {
  return (
    <>
    <header>
        <HStack direction='row'>
          <Image boxSize='60px' objectFit='cover' src='https://lh5.googleusercontent.com/uOR-ZLRYRMfhtYh7bHBF6xzpTaxEJnDwck6_9fhnT6h8C8prc9lBpuyrKDNPiggZKBqhluoeogOHEH9x3nYF3SWbOy6ZtXOgOjfLrpo-b7gy4m3nhtejF-uWvEpZ7EDksg=w1280' alt='Logo' />
            <VStack direction='row' align='stretch'>
            <Heading fontSize='2xl' color='green'>PLANET-CENTRIC</Heading>
            <Heading fontSize='2xl' color= 'black'>VERTICAL FOREST</Heading>
            </VStack>
          <Spacer />
          <Icon as={BellIcon} boxSize={10} color='gray.500' />
          <AvatarGroup size='md' max={1}>
            <Avatar  name='Ryan Florence' src='https://bit.ly/ryan-florence' />
            <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
            <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
            <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
            <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
          </AvatarGroup>
        </HStack>
    </header>  
    </>
      
        
  )
}

export default Header
