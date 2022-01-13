import React from 'react'
import { ChatIcon } from '@chakra-ui/icons'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'

const Post: React.FC = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="10px" background="white">
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

export default Post
