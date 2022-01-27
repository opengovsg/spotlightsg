import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import moment from 'moment'

import { prettifyEmailDomain } from '~/helpers'

type CommentProps = {
  email: string
  content: string
  createdAt: string
}

const Comment: React.FC<CommentProps> = ({ email, content, createdAt }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p="10px" background="white">
      <Text textStyle="body2" color="neutral.700">
        <Text as="span" fontWeight="bold">
          officer
        </Text>{' '}
        from{' '}
        <Text as="span" fontWeight="bold">
          {prettifyEmailDomain(email)}
        </Text>{' '}
        {moment(createdAt).fromNow()}
      </Text>
      <Box whiteSpace="pre-line" mt="5px">
        {content}
      </Box>
    </Box>
  )
}

export default Comment
