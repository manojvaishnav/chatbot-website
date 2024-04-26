import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import { FaDownload } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios'

const ExcelQA = ({ getAllQA }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const toast = useToast()

    const [file, setFile] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const downloadFile = () => {
        const Url = "./static/sample.xlsx";
        const link = document.createElement("a");
        link.href = Url;
        link.download = "sample.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleQASave = async () => {
        if (!file) {
            return toast({
                title: 'Please upload file first',
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
            })
        }
        setIsLoading(true)
        try {
            const formdata = new FormData()
            formdata.append('file', file[0])
            const user = JSON.parse(localStorage.getItem('user'))

            await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/chatbot/upload/file`, formdata, {
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
            console.log(error)
            toast({
                title: error.response.data.error,
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
            })
        }
        setIsLoading(false)
        setFile("")
        getAllQA()
        onClose()
    }

    return (
        <>
            <Button colorScheme='purple' onClick={onOpen}><FaCloudUploadAlt style={{ marginRight: '7px' }} /> Upload QA's</Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Download And Upload Excel File</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Download Sample File</FormLabel>
                            <Button colorScheme='purple' onClick={downloadFile}>
                                <FaDownload style={{ marginRight: '7px' }} /> Download
                            </Button>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Upload File</FormLabel>
                            <label for="images" className="drop-container" id="dropcontainer">
                                <span className="drop-title">Drop file here</span>
                                or
                                <input type="file" id="images" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" required onChange={(e) => { setFile(e.target.files) }} />
                            </label>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        {
                            isLoading ? <Spinner /> : <>
                                <Button onClick={onClose} colorScheme='red' mr={3}>Cancel</Button>
                                <Button colorScheme='purple' onClick={handleQASave}>Upload</Button>
                            </>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ExcelQA