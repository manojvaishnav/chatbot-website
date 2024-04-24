import React from 'react'
import { Stack, Text, Button } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

const WebDataCard = ({ handleDelete, dataArray }) => {

    return (
        <>
            {
                dataArray?.map((data, i) => {
                    return <Stack w={'100%'} p="4" boxShadow="md" m="4" borderRadius="sm" key={i}>
                        <Stack direction="row" alignItems="center">
                            <Text fontWeight="semibold">#{i + 1}</Text>
                        </Stack>
                        <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
                            <Text fontSize={{ base: 'sm' }} textAlign={'left'} >
                                {data}
                            </Text>
                            <Stack direction={{ base: 'column', md: 'row' }}>
                                <Button colorScheme="red" onClick={() => handleDelete(i)}><DeleteIcon /></Button>
                            </Stack>
                        </Stack>
                    </Stack>
                })
            }
        </>
    )
}

export default WebDataCard