import React, { useEffect, useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  HStack,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import { prettifyEmailDomain } from '~/helpers'

import { getPostWithComments } from '~services/SpotlightApi'
import { GetPostWithCommentResponse } from '~services/types'
import CommentsSection from '~components/CommentsSection'
import DeletePostAlert from '~components/DeletePostAlert'
import EditPostBody from '~components/EditPostBody'
import FollowButton from '~components/FollowButton'
import PostBody from '~components/PostBody'

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
          <Text textStyle="body2" color="neutral.700">
            <Text as="span" fontWeight="bold">
              someone
            </Text>{' '}
            from{' '}
            <Text as="span" fontWeight="bold">
              {prettifyEmailDomain(postWithComments.user.emailDomain)}
            </Text>
          </Text>
          {isEditing ? (
            <EditPostBody
              postId={postWithComments.id}
              defaultTitle={postWithComments.title}
              defaultIssue={postWithComments.issue}
              defaultActionsTaken={postWithComments.actionsTaken}
              onCancel={() => setIsEditing(false)}
              onSubmit={() => {
                setIsEditing(false)
                setToRefetch(toRefetch + 1)
              }}
            />
          ) : (
            <>
              <PostBody
                title={postWithComments.title}
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
              <CommentsSection
                postId={postWithComments.id}
                comments={comments}
                onRefresh={() => setToRefetch(toRefetch + 1)}
              />
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
