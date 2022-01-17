import React from 'react'
import { Box, Text } from '@chakra-ui/react'

type CommentProps = {
  content: string
}

const Comment: React.FC<CommentProps> = ({ content }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p="10px" background="white">
      <Text>someone@a.gov.sg</Text>
      <Box whiteSpace="pre-line" mt="5px">
        {content}
      </Box>
    </Box>
  )
}

export default Comment
