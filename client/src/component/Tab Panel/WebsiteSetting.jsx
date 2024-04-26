import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Container,
  Box,
  Stack,
  Button,
  useColorModeValue,
  Textarea,
  useToast,
  Spinner
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const WebsiteSetting = () => {

  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isData, setIsData] = useState(false)

  const [compName, setCompName] = useState("")
  const [desc, setDesc] = useState("")
  const [cmpId, setCmpId] = useState("")
  const [website, setWebsite] = useState("")


  const handleSubmitButton = async () => {
    if (!compName || !desc) {
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
      formdata.append('name', compName)
      formdata.append('description', desc)
      formdata.append('website', website)

      await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/company`, formdata, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      toast({
        title: 'Detail added successfully',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })

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

  const getCompanyDetail = async () => {
    setIsLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      try {

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/company`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        if (data.data) {
          setCompName(data.data.name)
          setDesc(data.data.description)
          setWebsite(data.data.website)
          setCmpId(data.data._id)
          setIsData(true)
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
    }
    setIsLoading(false)
  }

  const handleUpdateData = async (id) => {
    if (!compName || !desc) {
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
      formdata.append('name', compName)
      formdata.append('description', desc)
      formdata.append('website', website)

      await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/company/${id}`, formdata, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      toast({
        title: 'Detail updated successfully',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })

      getCompanyDetail()

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
    getCompanyDetail()
  }, [])

  return (
    <>
      <Center>
        <VStack>
          <Text textAlign={'center'}>To start using your AI chatbot, please input the following details for your website</Text>
          <Container maxW="5xl" p={{ base: 5, md: 10 }}>
            <Stack spacing={4} maxW={{ base: '25rem', sm: '30rem' }} margin="0 auto">
              <Stack align="center" spacing={2}>
              </Stack>
              <Box pos="relative">
                <Box
                  pos="absolute"
                  top="-7px"
                  right="-7px"
                  bottom="-7px"
                  left="-7px"
                  rounded="lg"
                ></Box>
                <VStack
                  as="form"
                  pos="relative"
                  spacing={8}
                  p={6}
                  bg={useColorModeValue('white', 'gray.700')}
                  rounded="lg"
                  boxShadow="lg"
                >
                  <FormControl id="cmp">
                    <FormLabel>Company Name</FormLabel>
                    <Input type="text" rounded="md"
                      value={compName}
                      onChange={(e) => {
                        setCompName(e.target.value)
                      }} />
                  </FormControl>
                  <FormControl id="desc">
                    <FormLabel>Brief Description</FormLabel>
                    <Textarea
                      value={desc}
                      onChange={(e) => {
                        setDesc(e.target.value)
                      }}
                      size='sm'
                    />
                  </FormControl>
                  <FormControl id="web">
                    <FormLabel>Website URL</FormLabel>
                    <Input type="text" rounded="md" value={website} onChange={(e) => {
                      setWebsite(e.target.value)
                    }} />
                  </FormControl>
                  {
                    isLoading ? <Spinner /> : <Button
                      bg="purple.400"
                      color="white" d
                      _hover={{
                        bg: 'purple.500'
                      }}
                      rounded="md"
                      w="100%"
                      onClick={isData ? () => { handleUpdateData(cmpId) } : handleSubmitButton}
                    >
                      Save
                    </Button>
                  }
                </VStack>
              </Box>
            </Stack>
          </Container>
        </VStack>
      </Center>
    </>
  )
}

export default WebsiteSetting

