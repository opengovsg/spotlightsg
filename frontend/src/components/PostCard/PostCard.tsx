import React from 'react'
import { BiCommentDetail, BiEditAlt, BiUser } from 'react-icons/bi'
import { useHistory } from 'react-router-dom'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import moment from 'moment'

import { prettifyEmailDomain } from '~/helpers'

import { POST_ROUTE } from '~constants/routes'
import { PostWithCommentsCount } from '~services/types'
import FollowButton from '~components/FollowButton'
import IconText from '~components/IconText'
import VoteButton from '~components/VoteButton'

type PostCardProps = {
  post: PostWithCommentsCount
}

const PostCard: React.FC<PostCardProps> = ({
  post: {
    id,
    createdAt,
    title,
    issue,
    user: { emailDomain },
    commentsCount,
    canManage,
    isFollowing,
    followsCount,
    upvoteCount,
    hasBeenUpvoted,
  },
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
            <Box mb="10px">
              <Text textStyle="h3">{title}</Text>
              <Text textStyle="body2" color="neutral.700">
                submitted by{' '}
                <Text as="span" fontWeight="bold">
                  officer
                </Text>{' '}
                from{' '}
                <Text as="span" fontWeight="bold">
                  {prettifyEmailDomain(emailDomain)}
                </Text>{' '}
                {moment(createdAt).fromNow()}
              </Text>
            </Box>
            <Box mb="10px">
              <VoteButton
                postId={id}
                isVotedInitial={hasBeenUpvoted}
                voteCountInitial={upvoteCount}
              />
            </Box>
          </Flex>
          <Text textStyle="subhead2" noOfLines={3}>
            {issue}
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
