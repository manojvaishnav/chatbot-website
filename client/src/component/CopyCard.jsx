import { Box, Button, Flex, Heading, Input, useClipboard } from '@chakra-ui/react';
import React from 'react'
import { IoCopy, IoCopyOutline } from "react-icons/io5";

const CopyCard = ({ data }) => {
    const placeholder = "text to be copied...";
    const { onCopy, setValue, hasCopied } = useClipboard(data.text);

    return (
        <>
            <Box>
                <Heading size='xs' mb={2}>
                    {data.heading}
                </Heading>
                <Flex mb={2}>
                    <Input
                        placeholder={placeholder}
                        value={data.text}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        disabled
                        mr={2}
                    />
                    <Button onClick={() => { onCopy(data.text) }}>{hasCopied ? <IoCopy /> : <IoCopyOutline />}</Button>
                </Flex>
            </Box>
        </>
    )
}

export default CopyCard