import React, { useState } from 'react'
import {
    Box,
    Divider,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Th,
    Tr,
    Td,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import QAModel from '../Modal/QAModel';

const QaTable = ({ handleDelete, getAllQA, qaArray }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = qaArray.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(qaArray.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDataRowClick = (data) => {
        onOpen()
        localStorage.setItem('qaData', JSON.stringify(data))
    }

    return (
        <>
            <Box overflow="hidden" py={10}>
                <Divider />
                <TableContainer overflowY={'auto'}>
                    <Table size="md" variant={'unstyled'} colorScheme='purple'>
                        <Thead>
                            <Tr fontWeight="900">
                                <Th>#</Th>
                                <Th>Question</Th>
                                <Th>Answer</Th>
                                <Th>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentItems?.map((data, index) => (
                                <>
                                    <Tr key={index} cursor={'pointer'} _hover={{ backgroundColor: 'gray.300' }}>
                                        <Td fontSize="sm">{indexOfFirstItem + index + 1}</Td>
                                        <Td onClick={() => {
                                            handleDataRowClick(data)
                                        }} fontSize="sm" textTransform={'capitalize'}>{data?.utterance.substring(0, 25)}</Td>
                                        <Td onClick={() => {
                                            handleDataRowClick(data)
                                        }} fontSize="sm" textTransform={'capitalize'}>{data?.answer.substring(0, 50)}</Td>
                                        <Td><Button colorScheme='red' onClick={() => handleDelete(data?._id)}><DeleteIcon /></Button></Td>
                                    </Tr>
                                </>
                            ))}
                        </Tbody>
                    </Table>
                    {
                        itemsPerPage < qaArray.length ? <Box overflowY={'hidden'} mt={2} p={2}>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <Button colorScheme='purple' mr={2} key={index} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </Button>
                            ))}
                        </Box> : ""
                    }
                </TableContainer>
            </Box>
            <QAModel onClose={onClose} isOpen={isOpen} getAllQA={getAllQA} />
        </>
    )
}

export default QaTable