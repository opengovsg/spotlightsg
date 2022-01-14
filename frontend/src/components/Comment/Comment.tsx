import React from 'react'
import { Box, Text } from '@chakra-ui/react'

const Comment: React.FC = () => {
  return (
    <Box borderWidth="1px" borderRadius="md" p="10px" background="white">
      <Text>someone@a.gov.sg</Text>
      <Box whiteSpace="pre-line" mt="5px">
        Have you tried using Formssg? I think it fits your usecase
      </Box>
    </Box>
  )
}

export default Comment
