import React from 'react'
import { NavLink } from "react-router-dom"
import {
    HStack, VStack, Image, Spacer, Heading, Icon, Drawer, DrawerBody,
    Input, DrawerFooter, DrawerCloseButton, DrawerHeader, DrawerOverlay,
    DrawerContent, useDisclosure, IconButton, Button
  } from '@chakra-ui/react';
import { BellIcon, HamburgerIcon} from '@chakra-ui/icons';
import logo from "./planet-centric-logo.png";

function Navigation() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

  return (
    <>
      <div>
        <HStack width="100%" padding="4" alignItems="center">
          <Image boxSize='60px' objectFit='cover' src={logo} alt='Logo' />
          <VStack align='start'>
            <Heading fontSize='2xl' color='green'>PLANET-CENTRIC</Heading>
            <Heading fontSize='2xl' color='black'>VERTICAL FOREST</Heading>
          </VStack>
          <Spacer />
          <IconButton
            icon={<HamburgerIcon />}
            variant='outline'
            aria-label='Open Menu'
            onClick={onOpen}
          />
          <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Create your account</DrawerHeader>
              <DrawerBody>
                <Input placeholder='Type here...' />
              </DrawerBody>
              <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>Cancel</Button>
                <Button colorScheme='blue'>Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <Icon as={BellIcon} boxSize={10} color='gray.500' />
        </HStack>
      </div>
    </>
  )
}

export default Navigation
