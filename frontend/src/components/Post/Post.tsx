import React, { useEffect, useState } from 'react'
import { Box, Spinner, Text, VStack } from '@chakra-ui/react'

import { getPostWithComments } from '~services/SpotlightApi'
import { GetPostWithCommentResponse } from '~services/types'
import Comment from '~components/Comment'
import NewComment from '~components/NewComment'
import PostBody from '~components/PostBody'

type PostProps = {
  id: number | undefined
}

const Post: React.FC<PostProps> = ({ id }) => {
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
    <Box>
      {postWithComments ? (
        <>
          <PostBody
            email={postWithComments.user.email}
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
                    email={postWithComments.user.email}
                  />
                ))
              ) : (
                <Text>No Comments Found</Text>
              )}
            </VStack>
          </Box>
        </>
      ) : (
        <Spinner />
      )}
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
  )
}

export default Post
