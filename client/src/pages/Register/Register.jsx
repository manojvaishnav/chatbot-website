import React, { useState } from 'react'
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  Text,
  Box,
  useToast,
  Spinner
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import axios from 'axios';

const Register = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast()
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      return toast({
        title: 'All field are required',
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    }
    setIsLoading(true)
    try {
      const formdata = new FormData()
      formdata.append('email', email)
      formdata.append('password', password)

      const { data } = await axios.post(`https://chatbot-website.onrender.com/api/v1/auth/register`, formdata)

      toast({
        title: 'Login successfull',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })

      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('isLoginVerified', true)

      navigate('/dashboard')

    } catch (error) {
      toast({
        title: error.response.data.error,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    }
    setIsLoading(false)
    setEmail("")
    setPassword("")
  }

  return (
    <VStack h={'100vh'}>
      <Navbar />
      <Box h={'full'} w={'full'} >
        <Container maxW="7xl" h={'90vh'} p={{ base: 5, md: 10 }}>
          <Center>
            {
              isLoading ? <Spinner /> : <Stack spacing={4}>
                <Stack align="center">
                  <Heading fontSize="2xl">Sign up to enjoy our service</Heading>
                </Stack>
                <VStack
                  as="form"
                  boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                  h="max-content !important"
                  bg={'white'}
                  rounded="lg"
                  boxShadow="lg"
                  p={{ base: 5, sm: 10 }}
                  spacing={8}
                >
                  <VStack spacing={4} w="100%">
                    <FormControl id="email">
                      <FormLabel>Email</FormLabel>
                      <Input rounded="md" type="email" onChange={(e) => { setEmail(e.target.value) }} />
                    </FormControl>
                    <FormControl id="password">
                      <FormLabel>Password</FormLabel>
                      <InputGroup size="md">
                        <Input rounded="md" type={show ? 'text' : 'password'} onChange={(e) => { setPassword(e.target.value) }} />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            rounded="md"
                            bg={'gray.300'}
                            _hover={{
                              bg: 'gray.400'
                            }}
                            onClick={handleClick}
                          >
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </VStack>
                  <VStack w="100%">
                    <Button
                      bg="purple.400"
                      color="white"
                      _hover={{
                        bg: 'purple.500'
                      }}
                      rounded="md"
                      w="100%"
                      onClick={handleRegister}
                    >
                      Sign up
                    </Button>
                    <Stack direction="row" justifyContent="space-between" w="100%">
                      <Link to={'/login'}>
                        <Text fontSize={{ base: 'md', sm: 'md' }} cursor={'pointer'}>Already a member?</Text>
                      </Link>
                    </Stack>
                  </VStack>
                </VStack>
              </Stack>
            }
          </Center>
        </Container>
      </Box>
      <Footer />
    </VStack>
  )
}

export default Register