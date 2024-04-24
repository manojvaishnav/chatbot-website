'use client'

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <Box w={'100%'}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        ml={10}
        mr={10}
        align={'center'}
      >

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link to={'/'}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
              Chat-Bot Creator
            </Text>
          </Link>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button fontSize={'sm'} color={'white'}
            bg={'purple.400'}
            _hover={{
              bg: 'purple.500',
            }} fontWeight={600} onClick={() => navigate('/login')}>
            Sign In
          </Button>
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'purple.400'}
            _hover={{
              bg: 'purple.500',
            }}
            onClick={() => navigate('/register')}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}