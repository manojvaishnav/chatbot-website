import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const QAModel = ({ isOpen, onClose, getAllQA }) => {
    const initialRef = React.useRef(null)
    const toast = useToast()

    const [isLoading, setIsLoading] = useState(false)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [dataId, setDataId] = useState("")

    const handleQAUpdate = async () => {
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

            await axios.put(`/chatbot/question/${dataId}`, formdata, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            toast({
                title: 'QA updated successfull',
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
        setIsLoading(false)
        onClose()
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('qaData'))
        setQuestion(data?.utterance)
        setAnswer(data?.answer)
        setDataId(data?._id)
    }, [isOpen, onClose])


    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>QA's</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Enter Question</FormLabel>
                            <Input textTransform={'capitalize'} ref={initialRef} placeholder='Question' value={question} onChange={(e) => { setQuestion(e.target.value) }} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Enter Answer</FormLabel>
                            <Textarea
                                textTransform={'capitalize'}
                                placeholder='Answer'
                                size='sm'
                                resize='vertical'
                                value={answer}
                                onChange={(e) => { setAnswer(e.target.value) }}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        {
                            isLoading ? <Spinner /> : <>
                                <Button onClick={onClose} colorScheme='red' mr={3}>Cancel</Button>
                                <Button colorScheme='purple' onClick={handleQAUpdate}>Update</Button>
                            </>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default QAModel