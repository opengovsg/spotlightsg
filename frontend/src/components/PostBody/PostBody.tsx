import React from 'react'
import { Box, Flex, Text, VStack } from '@chakra-ui/react'

import VoteButton from '~components/VoteButton'

type PostBodyProps = {
  title: string
  issue: string
  actionsTaken: string
}

const PostBody: React.FC<PostBodyProps> = ({ title, issue, actionsTaken }) => (
  <VStack spacing="10px" align="stretch">
    <Flex justify="space-between">
      <Box>
        <Text textStyle="h2" color="primary.600">
          {title}
        </Text>
      </Box>
      <VoteButton isVotedInitial={false} voteCountInitial={0} />
    </Flex>
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
