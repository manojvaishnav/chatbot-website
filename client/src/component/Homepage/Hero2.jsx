import * as React from 'react';
import {
    chakra,
    Container,
    Stack,
    HStack,
    Text,
    useColorModeValue,
    Image,
    Skeleton,
    Box,
    Link,
    Icon
} from '@chakra-ui/react';
import { GoChevronRight } from 'react-icons/go';

const Hero2 = () => {
    return (
        <Container maxW="80vw" px={{ base: 6, md: 3 }} py={24}>
            <Stack direction={{ base: 'column', md: 'row' }} justifyContent="center" >
                <Stack direction="column" spacing={6} justifyContent="center" >
                    <HStack
                        as={Link}
                        p={1}
                        rounded="full"
                        fontSize="sm"
                        w="max-content"
                        bg={useColorModeValue('gray.300', 'gray.700')}
                    >
                        <Box
                            py={1}
                            px={2}
                            lineHeight={1}
                            rounded="full"
                            color="white"
                            bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                        >
                            100% Free
                        </Box>
                        <HStack spacing={1} alignItems="center" justifyContent="center">
                            <Text lineHeight={1}>Open Source</Text>
                            <Icon as={GoChevronRight} w={4} h={4} />
                        </HStack>
                    </HStack>
                    <chakra.h1 fontSize="5xl" lineHeight={1} fontWeight="bold" textAlign="left">
                        Next-Level Support with our  <br />
                        <chakra.span color="purple.500">AI Chatbot!</chakra.span>
                    </chakra.h1>
                    <Box>
                        <Text
                            fontSize="1.4rem"
                            textAlign="left"
                            lineHeight="1.375"
                            fontWeight="400"
                            color="gray.700"

                        >
                            AI-Powered
                        </Text>
                        <Text
                            fontSize="1.2rem"
                            textAlign="left"
                            lineHeight="1.375"
                            fontWeight="400"
                            color="gray.500"
                        >
                            No pre-made responses. Trained on your data to deliver accurate, human-like answers!
                        </Text>
                    </Box>
                    <Box>
                        <Text
                            fontSize="1.4rem"
                            textAlign="left"
                            lineHeight="1.375"
                            fontWeight="400"
                            color="gray.700"

                        >
                            24/7 Availability
                        </Text>
                        <Text
                            fontSize="1.2rem"
                            textAlign="left"
                            lineHeight="1.375"
                            fontWeight="400"
                            color="gray.500"
                        >
                            AI chatbots are always on, offering support day and night.
                        </Text>
                    </Box>
                    <Box>
                        <Text
                            fontSize="1.4rem"
                            textAlign="left"
                            lineHeight="1.375"
                            fontWeight="400"
                            color="gray.700"

                        >
                            Instant Replies
                        </Text>
                        <Text
                            fontSize="1.2rem"
                            textAlign="left"
                            lineHeight="1.375"
                            fontWeight="400"
                            color="gray.500"
                        >
                            Handle multiple chats instantly, even during high traffic.
                        </Text>
                    </Box>
                </Stack>
                <Box ml={{ base: 0, md: 5 }} pos="relative">
                    <DottedBox />
                    <Image
                        w="250px"
                        maxH="100%"
                        minW={{ base: 'auto', md: '30rem' }}
                        objectFit="cover"
                        src={`./static/image.webp`}
                        rounded="md"
                        fallback={<Skeleton />}
                    />
                </Box>
            </Stack>
        </Container>
    );
};

function DottedBox() {
    return (
        <Box position="absolute" left="-45px" top="-30px" height="full" maxW="700px" zIndex={-1}>
            <svg
                color={useColorModeValue('rgba(55,65,81, 0.1)', 'rgba(55,65,81, 0.7)')}
                width="350"
                height="420"
                fill="none"
            >
                <defs>
                    <pattern
                        id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
                    </pattern>
                </defs>
                <rect width="404" height="404" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
            </svg>
        </Box>
    );
}

export default Hero2;