'use client'

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiMenu,
  FiLogOut
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, href: '/dashboard' },
  { name: 'AI Chatbot', icon: FiTrendingUp, href: '/chatbot' },
  { name: 'Installation Code', icon: FiCompass, href: '/code' },
]

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        Bot Creator
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems?.map((link, i) => (
        <Link key={i} to={link?.href} style={{ width: "100%", height: '100%' }} onClick={() => { onClose() }}>
          <NavItem key={link?.name} icon={link?.icon}>
            {link?.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'purple.500',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen, handlelogout, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Bot Creator
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Button colorScheme='red' onClick={handlelogout} rightIcon={<FiLogOut />}>
          Logout
        </Button>
      </HStack>
    </Flex>
  )
}

const Sidebar = ({ content }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()

  const handlelogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <Box h="100vh" bg={useColorModeValue('gray.100', 'gray.900')} >
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} handlelogout={handlelogout} />
      <Box ml={{ base: 0, md: 60 }} p="4" backgroundColor={'gray.100'}>
        <div> {content}</div>
      </Box>
    </Box>
  )
}

export default Sidebar