import React from 'react'
import { BiCommentDetail, BiEditAlt, BiUser } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import { Badge, Box, Button, Flex, HStack, Text } from '@chakra-ui/react'

import { prettifyEmailDomain } from '~/helpers'

import IconText from '~components/IconText'

type PostCardProps = {
  route: string
  previewText: string
  email: string
  commentsCount: number
  canManage: boolean
}

const PostCard: React.FC<PostCardProps> = ({
  route,
  previewText,
  email,
  commentsCount,
  canManage,
}) => {
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
        align="stretch"
        flexDir="column"
        justify="space-between"
        height="100%"
      >
        <Box>
          <Flex justify="space-between">
            <Box>
              <Text textStyle="h3">Title goes here</Text>
              <Text textStyle="body2" color="neutral.700">
                submitted by{' '}
                <Text as="span" fontWeight="bold">
                  someone
                </Text>{' '}
                from{' '}
                <Text as="span" fontWeight="bold">
                  {prettifyEmailDomain(email)}
                </Text>
              </Text>
            </Box>
            <Button colorScheme="primary" size="sm">
              Follow
            </Button>
          </Flex>
          <Text textStyle="subhead2" noOfLines={3}>
            {previewText}
          </Text>
        </Box>
        <Flex justify="space-between">
          <HStack textStyle="subhead2">
            <Badge>tag1</Badge>
            <Badge>tag2</Badge>
          </HStack>
          <HStack textStyle="subhead2" spacing="8px">
            {canManage && <IconText icon={<BiEditAlt />} />}
            <IconText icon={<BiUser />} text="0" tooltip="0 followers" />
            <IconText
              icon={<BiCommentDetail />}
              text={commentsCount.toString()}
              tooltip={`${commentsCount.toString()} comments`}
            />
          </HStack>
        </Flex>
      </Flex>
    </Box>
  )
}

export default PostCard
