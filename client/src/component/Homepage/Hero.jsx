import React from 'react'
import {
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: useBreakpointValue({ base: '20%', md: '30%' }),
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'purple.400',
                                zIndex: -1,
                            }}>
                            BOOST YOUR BUSINESS WITH
                        </Text>
                        <br />{' '}
                        <Text color={'purple.400'} as={'span'}>
                            AI-POWERED SUPPORT
                        </Text>{' '}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        Join the thousands of businesses who have increased sales and elevated customer support with our live chat service, now enhanced with AI chatbots.
                    </Text>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                        <Button
                            rounded={'full'}
                            bg={'purple.400'}
                            color={'white'}
                            _hover={{
                                bg: 'purple.500',
                            }}
                            onClick={() => navigate('/register')}
                        >
                            Sign up
                        </Button>
                        <Button rounded={'full'} onClick={() => navigate('/login')}>Sign In</Button>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <video autoPlay muted loop>
                    <source src='./static/video.mp4' type="video/mp4" />
                </video>
            </Flex>
        </Stack>
    )
}

export default Hero
