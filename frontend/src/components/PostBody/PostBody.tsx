import React from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'

type PostBodyProps = {
  issue: string
  actionsTaken: string
}

const PostBody: React.FC<PostBodyProps> = ({ issue, actionsTaken }) => (
  <VStack spacing="10px" align="start" mt="20px">
    <Box>
      <Text textStyle="h4" color="primary.600">
        Issue
      </Text>
      <Box whiteSpace="pre-line">{issue}</Box>
    </Box>
    <Box>
      <Text textStyle="h4" color="primary.600">
        Actions Taken
      </Text>
      <Box whiteSpace="pre-line">{actionsTaken}</Box>
    </Box>
  </VStack>
)

export default PostBody
