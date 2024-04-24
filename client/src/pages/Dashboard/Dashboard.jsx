import React from 'react'
import { Link, Stack, Box, Button, useColorModeValue, Text } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { BsDiscord } from 'react-icons/bs';

const Dashboard = () => {
    return (
        <>
            <Box pb={8}>
                <Stack
                    pos="relative"
                    bgGradient={`linear(to-l, purple.500, purple.400 , purple.300)`}
                    height="250px"
                    w="100%"
                ></Stack>
                <Box maxW="3xl" p={4} isolation="isolate" zIndex={3} mt="-10rem" marginInline="auto">
                    <Box
                        boxShadow={useColorModeValue(
                            '0 4px 6px rgba(160, 174, 192, 0.6)',
                            '0 4px 6px rgba(9, 17, 28, 0.9)'
                        )}
                        bg={useColorModeValue('white', 'gray.800')}
                        p={{ base: 4, sm: 8 }}
                        overflow="hidden"
                        rounded="2xl"
                    >
                        <Stack pos="relative" zIndex={1} direction="column" spacing={5} textAlign="left">
                            <Text fontSize="4xl" lineHeight={1.2} fontWeight="bold">
                                Explore Bot-Creator
                            </Text>
                            <Text color="gray.400" fontSize="xl" maxW="600px" lineHeight={1.2} textAlign={'center'}>
                                BotCreator is platform that provide new way to your business, organization etc. by building AI intigrated chatbot.
                            </Text>

                            <Stack direction={{ base: 'column', md: 'row' }} justifyContent={'center'} spacing={3}>
                                <Button
                                    leftIcon={<FaLinkedin />}
                                    as={Link}
                                    href="https://www.linkedin.com/in/manoj-vaishnav/"
                                    rounded="md"
                                    color="white"
                                    variant="solid"
                                    colorScheme="purple"
                                    target='_blank'
                                    _hover={{ bg: 'purple.600' }}
                                >
                                    LinkedIn
                                </Button>
                                <Button
                                    leftIcon={<FaGithub />}
                                    as={Link}
                                    href="https://github.com/manojvaishnav"
                                    rounded="md"
                                    colorScheme="gray"
                                    variant="solid"
                                    target='_blank'
                                >
                                    Source Code
                                </Button>
                                <Button
                                    leftIcon={<BsDiscord />}
                                    as={Link}
                                    href="https://mkvaishnav.netlify.app/"
                                    rounded="md"
                                    color="white"
                                    variant="solid"
                                    colorScheme="purple"
                                    target='_blank'
                                    _hover={{ bg: 'purple.600' }}
                                >
                                    Portfolio
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Dashboard
