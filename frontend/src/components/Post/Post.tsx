import React, { useEffect, useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import { prettifyEmailDomain } from '~/helpers'

import { getPostWithComments } from '~services/SpotlightApi'
import { GetPostWithCommentResponse } from '~services/types'
import Comment from '~components/Comment'
import DeletePostAlert from '~components/DeletePostAlert'
import EditPostBody from '~components/EditPostBody'
import FollowButton from '~components/FollowButton'
import NewComment from '~components/NewComment'
import PostBody from '~components/PostBody'
import VoteButton from '~components/VoteButton'

type PostProps = {
  id: number | undefined
}

const Post: React.FC<PostProps> = ({ id }) => {
  const {
    isOpen: deleteIsOpen,
    onClose: deleteOnClose,
    onOpen: deleteOnOpen,
  } = useDisclosure()
  const [isEditing, setIsEditing] = useState(false)

  // hack: change this variable to trigger a refetch
  const [toRefetch, setToRefetch] = useState(0)

  const [postWithComments, setPostWithComments] = useState<
    GetPostWithCommentResponse | undefined
  >()

  const refreshPost = async (id: number | undefined) => {
    if (!id) {
      return
    }
    setPostWithComments(undefined)
    const postWithComments = await getPostWithComments({ id })
    setPostWithComments(postWithComments)
  }
  useEffect(() => {
    refreshPost(id)
  }, [id, toRefetch])

  const comments = postWithComments?.comments || []
  return (
    <Box position="relative">
      {postWithComments ? (
        <>
          <Flex justify="space-between">
            <Box>
              <Text textStyle="body2" color="neutral.700">
                <Text as="span" fontWeight="bold">
                  someone
                </Text>{' '}
                from{' '}
                <Text as="span" fontWeight="bold">
                  {prettifyEmailDomain(postWithComments.user.emailDomain)}
                </Text>
              </Text>
              <Text textStyle="h2" color="primary.600">
                {postWithComments.title}
              </Text>
            </Box>
            <VoteButton isVotedInitial={false} voteCountInitial={0} />
          </Flex>
          {isEditing ? (
            <EditPostBody
              defaultIssue={postWithComments.issue}
              defaultActionsTaken={postWithComments.actionsTaken}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <PostBody
                issue={postWithComments.issue}
                actionsTaken={postWithComments.actionsTaken}
              />
              <HStack spacing="10px">
                <Spacer />
                {postWithComments.canManage && (
                  <Button
                    leftIcon={<EditIcon />}
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    disabled={isEditing}
                    variant="outline"
                  >
                    Edit
                  </Button>
                )}
                {postWithComments.canManage && (
                  <Button
                    leftIcon={<DeleteIcon />}
                    size="sm"
                    onClick={deleteOnOpen}
                    variant="outline"
                  >
                    <DeletePostAlert
                      onClose={deleteOnClose}
                      isOpen={deleteIsOpen}
                      onDelete={() => console.log('delete post button clicked')}
                    />
                    Delete
                  </Button>
                )}
                <FollowButton
                  isFollowingInitial={postWithComments.isFollowing}
                  postId={postWithComments.id}
                />
              </HStack>
              <Divider my="30px" />
              <Box mt="30px">
                <Text textStyle="h4" color="primary.600">
                  Comments
                </Text>
                <VStack spacing="10px" align="stretch">
                  {comments.length ? (
                    comments.map((comment) => (
                      <Comment
                        key={comment.id}
                        content={comment.content}
                        email={postWithComments.user.emailDomain}
                      />
                    ))
                  ) : (
                    <Text>No Comments Found</Text>
                  )}
                </VStack>
                <Box mt="20px">
                  <NewComment
                    postId={id}
                    commentAddedCallback={() => setToRefetch(toRefetch + 1)}
                  />
                </Box>
              </Box>
            </>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </Box>
  )
}

export default Post
