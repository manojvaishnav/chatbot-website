import { Box, Card, CardBody, Center, Stack, StackDivider, Text, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CopyCard from '../../component/CopyCard'
import { useNavigate } from 'react-router-dom'

const CodePage = () => {

  const [chatId, setChatId] = useState("")
  const navigate = useNavigate()

  const data = [
    {
      'heading': "Chat Id",
      'text': chatId
    },
    {
      'heading': "Paste in the Head tag before '</head>'",
      'text': `<link rel="stylesheet" href="https://chatbot-cdn.netlify.app/style.css"></link>`
    },
    {
      'heading': "Paste in the Body tag before '</body>'",
      'text': `<script src="https://chatbot-cdn.netlify.app/script.js?chatId=${chatId}"></script>`
    },
    {
      'heading': "Direct Link",
      'text': `https://chatbot-cdn.netlify.app?id=${chatId}`
    },
  ]

  useEffect(() => {
    const isLogin = localStorage.getItem('isLoginVerified')

    if (isLogin === 'false' || isLogin == null) {
      navigate('/login')
    }

    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setChatId(user.chatbotId)
    }

  }, [])

  return (
    <>
      <Center >
        <Box>
          <Card>
            <CardBody backgroundColor={'purple.500'} color={'white'}>
              <Text textAlign={'center'}>
                To install the chat window on your website, you have to insert the 'Installation Code', in every html page, just before the closing tag of head and body
              </Text>
            </CardBody>
          </Card>
          <Card w={'full'} mt={4}>
            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                {
                  data?.map((data, i) => <CopyCard key={i} data={data} />)
                }
              </Stack>
            </CardBody>
          </Card >
        </Box>
      </Center>
    </>
  )
}

export default CodePage
