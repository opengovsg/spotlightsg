import React from 'react'
import { useHistory } from 'react-router-dom'
import { ChatIcon } from '@chakra-ui/icons'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'

type PostCardProps = {
  id: string
  route: string
}

const PostCard: React.FC<PostCardProps> = ({ id, route }) => {
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
      <VStack align="start">
        <Text textStyle="subhead2">someone@open.gov.sg</Text>
        <Text textStyle="subhead2" noOfLines={3}>
          The current grants
          application-assessment-approval-disbursement-tracking systems is not
          standardized and across many different platforms eg. application is on
          Our SG Grants portal / assessment is conducted offline at meetings
          using Microsoft Excel files / approval is on our agency's filing
          system (Kris) / disbursement is by our finance via ACE / tracking is
          via agency's shared point
        </Text>
        <HStack textStyle="subhead2">
          <Text>5 comments</Text>
          <ChatIcon />
        </HStack>
      </VStack>
    </Box>
  )
}

export default PostCard
