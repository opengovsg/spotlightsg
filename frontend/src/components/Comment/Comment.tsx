import React from 'react'
import { Box, Text } from '@chakra-ui/react'

import { prettifyEmail } from '~/helpers'

type CommentProps = {
  email: string
  content: string
}

const Comment: React.FC<CommentProps> = ({ email, content }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p="10px" background="white">
      <Text fontWeight="bold">{prettifyEmail(email)}</Text>
      <Box whiteSpace="pre-line" mt="5px">
        {content}
      </Box>
    </Box>
  )
}

export default Comment
