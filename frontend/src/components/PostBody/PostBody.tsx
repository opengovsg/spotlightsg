import React from 'react'
import { Box, Text } from '@chakra-ui/react'

type PostBodyProps = {
  user: string
  issue: string
  actionsTaken: string
}

const PostBody: React.FC<PostBodyProps> = ({ user, issue, actionsTaken }) => (
  <Box>
    <Text fontWeight="bold">{user}</Text>
    <Text textStyle="h4" color="primary.500" mt="30px">
      Issue
    </Text>
    <Box whiteSpace="pre-line">{issue}</Box>
    <Text textStyle="h4" color="primary.500" mt="30px">
      Actions Taken
    </Text>
    <Box whiteSpace="pre-line">{actionsTaken}</Box>
  </Box>
)

export default PostBody
