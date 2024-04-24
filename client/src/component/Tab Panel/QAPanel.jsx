import { Box, Center, Flex, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AddQA from '../Modal/AddQA'
import QaTable from '../Table/QaTable'
import ExcelQA from '../Modal/ExcelQA'
import axios from 'axios'

const QAPanel = () => {

  const toast = useToast()
  const [qaArray, setQaArray] = useState([])

  const getAllQA = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const { data } = await axios.get('/chatbot/question', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      setQaArray(data.qaArray)
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

  const handleDelete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const formdata = new FormData()
      formdata.append('id', id)

      await axios.post('/chatbot/question', formdata, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      toast({
        title: 'QA deleted successfully',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      getAllQA()
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

  useEffect(() => {
    getAllQA()
  }, [])

  return (
    <>
      <Center>
        <VStack>
          <Text fontSize={['sm', 'md']} textAlign={'center'}>Please provide some question-answer pairs (QAs) to start using your AI chatbot</Text>
          <Text fontSize={['sm', 'md']} textAlign={'center'}>To optimize your AI chatbot's performance, we recommend adding several hundred QAs or simple texts</Text>
          <VStack w={'full'} mt={4}>
            <Flex w={'full'} justifyContent={'space-between'}>
              <AddQA getAllQA={getAllQA} />
              <ExcelQA getAllQA={getAllQA} />
            </Flex>
            <Box w={['280px', '400px','500px', '750px']}>
              <QaTable handleDelete={handleDelete} getAllQA={getAllQA} qaArray={qaArray} />
            </Box>
          </VStack>
        </VStack>
      </Center>
    </>
  )
}

export default QAPanel