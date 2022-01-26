import React from 'react'
import { BiCommentDetail, BiEditAlt, BiUser } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'

import { prettifyEmailDomain } from '~/helpers'

import { POST_ROUTE } from '~constants/routes'
import FollowButton from '~components/FollowButton'
import IconText from '~components/IconText'
import VoteButton from '~components/VoteButton'

type PostCardProps = {
  id: number
  title: string
  previewText: string
  email: string
  commentsCount: number
  canManage: boolean
  isFollowing: boolean
  followsCount: number
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  previewText,
  email,
  commentsCount,
  canManage,
  isFollowing,
  followsCount,
}) => {
  const history = useHistory()
  const onClick = () => {
    history.push(`${POST_ROUTE}/${id}`)
  }
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p="24px"
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
          <Flex justify="space-between" align="start">
            <Box>
              <Text textStyle="h3">{title}</Text>
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
            <VoteButton isVotedInitial={false} voteCountInitial={0} />
          </Flex>
          <Text textStyle="subhead2" noOfLines={3}>
            {previewText}
          </Text>
        </Box>
        <Flex justify="space-between">
          <HStack textStyle="subhead2">
            {/* <Badge>tag1</Badge>
            <Badge>tag2</Badge> */}
          </HStack>
          <HStack textStyle="subhead2" spacing="8px">
            {canManage && <IconText icon={<BiEditAlt />} />}
            <IconText
              icon={<BiUser />}
              text={followsCount.toString()}
              tooltip={`${followsCount.toString()} followers`}
            />
            <IconText
              icon={<BiCommentDetail />}
              text={commentsCount.toString()}
              tooltip={`${commentsCount.toString()} comments`}
            />
            <FollowButton isFollowingInitial={isFollowing} postId={id} />
          </HStack>
        </Flex>
      </Flex>
    </Box>
  )
}

export default PostCard
