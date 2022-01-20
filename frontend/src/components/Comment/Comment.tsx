import React from 'react'
import { Box, Text } from '@chakra-ui/react'

import { prettifyEmailDomain } from '~/helpers'

type CommentProps = {
  email: string
  content: string
}

const Comment: React.FC<CommentProps> = ({ email, content }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p="10px" background="white">
      <Text fontWeight="bold">{prettifyEmailDomain(email)}</Text>
      <Box whiteSpace="pre-line" mt="5px">
        {content}
      </Box>
    </Box>
  )
}

export default Comment
