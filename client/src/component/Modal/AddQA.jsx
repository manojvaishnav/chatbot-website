import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'

const AddQA = ({ getAllQA }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const toast = useToast()
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleQASave = async () => {
        if (!question || !answer) {
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
            formdata.append('question', question)
            formdata.append('answer', answer)

            await axios.post(`https://chatbot-website.onrender.com/api/v1/chatbot/upload/question`, formdata, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            toast({
                title: 'QA added successfull',
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
        setQuestion("")
        setAnswer("")
        getAllQA()
        onClose()
    }

    return (
        <>
            <Button colorScheme='purple' onClick={onOpen} mr={2}>+ Add QA</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New QA</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Enter Question</FormLabel>
                            <Input ref={initialRef} placeholder='Question' onChange={(e) => { setQuestion(e.target.value) }} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Enter Answer</FormLabel>
                            <Textarea
                                placeholder='Answer'
                                size='sm'
                                resize='vertical'
                                onChange={(e) => { setAnswer(e.target.value) }}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        {
                            isLoading ? <Spinner /> : <>
                                <Button onClick={onClose} colorScheme='red' mr={3}>Cancel</Button>
                                <Button colorScheme='purple' onClick={handleQASave}>Save</Button>
                            </>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddQA