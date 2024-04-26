import React, { useEffect, useState } from 'react'
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  VStack,
  Center,
  Box,
  Text,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios'
import WebDataCard from '../Table/WebDataCard';


const WebsiteScraping = () => {

  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [website, setWebsite] = useState("");
  const [webData, setWebData] = useState([]);

  const handleWebsiteSubmit = async () => {
    if (!website) {
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
      const user = JSON.parse(localStorage.getItem('user'))

      const formdata = new FormData()
      formdata.append('url', website)

      const { data } = await axios.post('https://chatbot-website.onrender.com/api/v1/website', formdata, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      toast({
        title: data.message,
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      getWebsiteData()
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
  }

  const getWebsiteData = async () => {
    setIsLoading(true)
    try {
      const user = JSON.parse(localStorage.getItem('user'))

      const { data } = await axios.get('https://chatbot-website.onrender.com/api/v1/website', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (data.data) {
        setWebsite(data.data.website)
        setWebData(data.data.websiteData)
      }
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
  }

  const handleDelete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))

      await axios.delete(`https://chatbot-website.onrender.com/api/v1/website/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      toast({
        title: 'Data deleted successfully',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      getWebsiteData()
    } catch (error) {
      toast({
        title: error.response.data.error,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    }
  }

  const handleWebsiteDelete = async () => {
    setIsLoading(true)
    try {
      const user = JSON.parse(localStorage.getItem('user'))

      await axios.delete(`https://chatbot-website.onrender.com/api/v1/website/`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      toast({
        title: 'Website deleted successfully',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      getWebsiteData()
      setWebsite("")
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
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      getWebsiteData()
    }
  }, [])

  return (
    <>
      <Center>
        {
          isLoading ? <Spinner /> : <VStack>
            <VStack>
              <Box w={'full'} >
                <Container maxW="7xl" p={{ base: 5, md: 10 }}>
                  <Center>
                    <VStack>
                      <Text maxW={'800px'} fontSize={['sm', 'md']} textAlign={'center'} mb={2}>Submit the form below to automatically scan and extract text from your website. This will assist in training your AI chatbot. Ensure your information is accurate, as this procedure may take some time and can only be executed for one website. Afterward, you can view and selectively delete the extracted texts on this page.
                      </Text>
                      <Stack spacing={4}>
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
                            <FormControl id="website">
                              <FormLabel>URL to scan</FormLabel>
                              <Input rounded="md" type="text" value={website} onChange={(e) => { setWebsite(e.target.value) }} />
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
                              onClick={handleWebsiteSubmit}
                            >
                              Submit Scan Request
                            </Button>
                            {
                              webData !== null ? <>
                                <Button
                                  bg="red.400"
                                  color="white"
                                  _hover={{
                                    bg: 'red.500'
                                  }}
                                  rounded="md"
                                  w="100%"
                                  onClick={handleWebsiteDelete}
                                >
                                  Delete Website
                                </Button>
                              </> : ""
                            }
                          </VStack>
                        </VStack>
                      </Stack>
                    </VStack>
                  </Center>
                </Container>
              </Box>
            </VStack >
            <VStack>
              <WebDataCard handleDelete={handleDelete} dataArray={webData} />
            </VStack>
          </VStack>
        }

      </Center>
    </>
  )
}

export default WebsiteScraping