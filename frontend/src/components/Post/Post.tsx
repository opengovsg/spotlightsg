import React, { useEffect, useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  HStack,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

import { useAuth } from '~/auth'
import { prettifyEmailDomain } from '~/helpers'

import { getPostWithComments } from '~services/SpotlightApi'
import { GetPostWithCommentResponse } from '~services/types'
import Comment from '~components/Comment'
import DeletePostAlert from '~components/DeletePostAlert'
import EditPostBody from '~components/EditPostBody'
import FollowButton from '~components/FollowButton'
import NewComment from '~components/NewComment'
import PostBody from '~components/PostBody'

type PostProps = {
  id: number | undefined
}

const Post: React.FC<PostProps> = ({ id }) => {
  const { auth } = useAuth()
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
              <Text textStyle="h3">{postWithComments.title}</Text>
              <Text textStyle="body2" color="neutral.700">
                submitted by{' '}
                <Text as="span" fontWeight="bold">
                  someone
                </Text>{' '}
                from{' '}
                <Text as="span" fontWeight="bold">
                  {prettifyEmailDomain(postWithComments.user.emailDomain)}
                </Text>
              </Text>
            </Box>
            <FollowButton isFollowing={false} />
          </Flex>
          {auth?.user.email === postWithComments.user.emailDomain && (
            <>
              <HStack pt="20px">
                <Button
                  leftIcon={<EditIcon />}
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  disabled={isEditing}
                >
                  Edit
                </Button>
                <Button
                  leftIcon={<DeleteIcon />}
                  size="sm"
                  onClick={deleteOnOpen}
                >
                  Delete
                </Button>
              </HStack>
              <DeletePostAlert
                onClose={deleteOnClose}
                isOpen={deleteIsOpen}
                onDelete={() => console.log('delete post button clicked')}
              />
            </>
          )}
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
              <Box mt="30px">
                <Text textStyle="h4" color="primary.500">
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
                <Box mt="30px">
                  <Text textStyle="h4" color="primary.500">
                    Add your reply
                  </Text>
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
