import React from 'react'
import { Box, Text } from '@chakra-ui/react'

type PostBodyProps = {
  issue: string
  actionsTaken: string
}

const PostBody: React.FC<PostBodyProps> = ({ issue, actionsTaken }) => (
  <Box>
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
