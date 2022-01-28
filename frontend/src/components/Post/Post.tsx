import React, { useEffect, useState } from 'react'
import { Box, Divider, Spinner, Text } from '@chakra-ui/react'
import moment from 'moment'

import { prettifyEmailDomain } from '~/helpers'

import { getPostWithComments } from '~services/SpotlightApi'
import { GetPostWithCommentResponse } from '~services/types'
import CommentsSection from '~components/CommentsSection'
import EditPostBody from '~components/EditPostBody'
import PostBody from '~components/PostBody'

type PostProps = {
  id: number | undefined
}

const Post: React.FC<PostProps> = ({ id }) => {
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
              officer
            </Text>{' '}
            from{' '}
            <Text as="span" fontWeight="bold">
              {prettifyEmailDomain(postWithComments.user.emailDomain)}
            </Text>{' '}
            {moment(postWithComments.createdAt).fromNow()}
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
                post={postWithComments}
                onEditClick={() => setIsEditing(true)}
              />
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
