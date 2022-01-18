import React from 'react'
import { useHistory } from 'react-router-dom'
import { ChatIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'

import { prettifyEmail } from '~/helpers'

type PostCardProps = {
  route: string
  previewText: string
  email: string
}

const PostCard: React.FC<PostCardProps> = ({ route, previewText, email }) => {
  const history = useHistory()
  const onClick = () => {
    history.push(route)
  }
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="10px"
      background="white"
      onClick={onClick}
      cursor="pointer"
    >
      <Flex
        align="start"
        flexDir="column"
        justify="space-between"
        height="100%"
      >
        <Box>
          <Text textStyle="subhead2" fontWeight="bold">
            {prettifyEmail(email)}
          </Text>
          <Text textStyle="subhead2" noOfLines={3}>
            {previewText}
          </Text>
        </Box>
        <HStack textStyle="subhead2">
          <Text>5 comments</Text>
          <ChatIcon />
        </HStack>
      </Flex>
    </Box>
  )
}

export default PostCard
